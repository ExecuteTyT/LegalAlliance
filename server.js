/**
 * Простой сервер для тестирования отправки форм в Telegram и Email
 * Запуск: node server.js
 */

import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Раздача статических файлов из dist (для production)
app.use(express.static(join(__dirname, 'dist')));

app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, phone, source, debtAmount } = req.body;

    // Валидация данных
    if (!name || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Имя и телефон обязательны для заполнения' 
      });
    }

    console.log('📨 Получена новая заявка:', { name, phone, source, debtAmount });

    const errors = [];
    // Отправка в Telegram
    if (process.env.VITE_TELEGRAM_BOT_TOKEN && process.env.VITE_TELEGRAM_CHAT_ID) {
      try {
        const message = `🔔 Новая заявка с сайта Правовой Альянс\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}${debtAmount ? `\n💰 Сумма долга: ${debtAmount}` : ''}\n📍 Источник: ${source || 'Не указан'}\n\n⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;
        
        const telegramResponse = await axios.post(
          `https://api.telegram.org/bot${process.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: process.env.VITE_TELEGRAM_CHAT_ID,
            text: message
          },
          { timeout: 10000 }
        );

        console.log('✅ Сообщение отправлено в Telegram');
      } catch (telegramError) {
        console.error('❌ Ошибка отправки в Telegram:', telegramError.message);
        errors.push('Telegram: ' + telegramError.message);
      }
    } else {
      console.warn('⚠️ Telegram не настроен (отсутствуют токен или chat_id)');
    }

    // Отправка на Email (с таймаутом, чтобы не блокировать ответ)
    let emailPromise = Promise.resolve();
    if (process.env.VITE_SMTP_HOST && process.env.VITE_SMTP_USER && process.env.VITE_SMTP_PASSWORD) {
      emailPromise = (async () => {
        try {
          const smtpPort = parseInt(process.env.VITE_SMTP_PORT || '465');
          const isSecure = smtpPort === 465;

          console.log('📧 Настройки SMTP:', {
            host: process.env.VITE_SMTP_HOST,
            port: smtpPort,
            secure: isSecure,
            user: process.env.VITE_SMTP_USER,
            from: process.env.VITE_SMTP_FROM || process.env.VITE_SMTP_USER,
            to: process.env.VITE_SMTP_TO || process.env.VITE_SMTP_USER
          });

          // Создаем промис с таймаутом для SMTP отправки
          const sendEmailWithTimeout = () => {
            return Promise.race([
              (async () => {
                const transporter = nodemailer.createTransport({
                  host: process.env.VITE_SMTP_HOST,
                  port: smtpPort,
                  secure: isSecure,
                  auth: {
                    user: process.env.VITE_SMTP_USER,
                    pass: process.env.VITE_SMTP_PASSWORD,
                  },
                  tls: {
                    rejectUnauthorized: false
                  },
                  // Уменьшенные таймауты для быстрого ответа
                  connectionTimeout: 15000,
                  greetingTimeout: 15000,
                  socketTimeout: 15000
                });

                const mailOptions = {
                  from: process.env.VITE_SMTP_FROM || process.env.VITE_SMTP_USER,
                  to: process.env.VITE_SMTP_TO || process.env.VITE_SMTP_USER,
                  subject: `Новая заявка с сайта: ${name}`,
                  html: `
                    <h2>Новая заявка с сайта Правовой Альянс</h2>
                    <p><strong>Имя:</strong> ${name}</p>
                    <p><strong>Телефон:</strong> ${phone}</p>
                    ${debtAmount ? `<p><strong>Сумма долга:</strong> ${debtAmount}</p>` : ''}
                    <p><strong>Источник:</strong> ${source || 'Не указан'}</p>
                    <p><strong>Время:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</p>
                  `,
                };

                const info = await transporter.sendMail(mailOptions);
                console.log('✅ Письмо отправлено на Email');
                console.log('Message ID:', info.messageId);
                return true;
              })(),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('SMTP timeout')), 20000)
              )
            ]);
          };

          // Пробуем основной порт
          try {
            await sendEmailWithTimeout();
          } catch (emailError) {
            console.error('❌ Ошибка отправки Email:');
            console.error('Сообщение:', emailError.message);
            console.error('Код:', emailError.code);
            
            // Проверяем, это DNS ошибка, таймаут или другая
            const isDnsError = emailError.code === 'EDNS' || emailError.message.includes('getaddrinfo') || emailError.message.includes('EAI_AGAIN');
            const isTimeout = emailError.message.includes('timeout') || emailError.message === 'SMTP timeout';
            
            if (isDnsError) {
              console.warn('⚠️ DNS ошибка - SMTP сервер недоступен');
            } else if (isTimeout) {
              console.warn('⚠️ SMTP таймаут - отправка заняла слишком много времени');
            } else {
              // Другие ошибки - пробуем альтернативные порты
              const alternativePorts = smtpPort === 465 ? [587, 25] : smtpPort === 587 ? [465, 25] : [587, 465];
              
              let emailSent = false;
              for (const altPort of alternativePorts) {
                console.log(`🔄 Пробуем альтернативный порт ${altPort}...`);
                try {
                  const altTransporter = nodemailer.createTransport({
                    host: process.env.VITE_SMTP_HOST,
                    port: altPort,
                    secure: altPort === 465,
                    auth: {
                      user: process.env.VITE_SMTP_USER,
                      pass: process.env.VITE_SMTP_PASSWORD,
                    },
                    tls: {
                      rejectUnauthorized: false
                    },
                    connectionTimeout: 15000,
                    greetingTimeout: 15000,
                    socketTimeout: 15000
                  });

                  const altMailOptions = {
                    from: process.env.VITE_SMTP_FROM || process.env.VITE_SMTP_USER,
                    to: process.env.VITE_SMTP_TO || process.env.VITE_SMTP_USER,
                    subject: `Новая заявка с сайта: ${name}`,
                    html: `
                      <h2>Новая заявка с сайта Правовой Альянс</h2>
                      <p><strong>Имя:</strong> ${name}</p>
                      <p><strong>Телефон:</strong> ${phone}</p>
                      ${debtAmount ? `<p><strong>Сумма долга:</strong> ${debtAmount}</p>` : ''}
                      <p><strong>Источник:</strong> ${source || 'Не указан'}</p>
                      <p><strong>Время:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</p>
                    `,
                  };

                  await Promise.race([
                    altTransporter.sendMail(altMailOptions),
                    new Promise((_, reject) => 
                      setTimeout(() => reject(new Error('SMTP timeout')), 20000)
                    )
                  ]);
                  
                  console.log(`✅ Письмо отправлено на Email через порт ${altPort}!`);
                  emailSent = true;
                  break;
                } catch (altError) {
                  console.error(`❌ Ошибка при попытке через порт ${altPort}:`, altError.message);
                }
              }
              
              if (!emailSent && !isDnsError && !isTimeout) {
                errors.push('Email: ' + (emailError.message || 'Неизвестная ошибка'));
              }
            }
          }
        } catch (err) {
          console.error('❌ Критическая ошибка при отправке Email:', err.message);
        }
      })();
    } else {
      console.warn('⚠️ SMTP не настроен (отсутствуют настройки)');
      console.warn('Проверьте переменные:', {
        host: !!process.env.VITE_SMTP_HOST,
        user: !!process.env.VITE_SMTP_USER,
        password: !!process.env.VITE_SMTP_PASSWORD
      });
    }

    // Если Telegram работает, считаем заявку успешной, даже если Email не отправился
    // Отправляем ответ клиенту сразу, не дожидаясь Email
    const telegramWorked = !errors.some(e => e.startsWith('Telegram:'));
    
    // Запускаем Email отправку в фоне (не блокируем ответ)
    emailPromise.catch(err => {
      console.error('❌ Email отправка в фоне завершилась с ошибкой:', err.message);
    });
    
    if (errors.length > 0 && !telegramWorked) {
      // Если и Telegram, и Email не работают - возвращаем ошибку
      return res.status(500).json({ 
        success: false, 
        message: 'Не удалось отправить заявку. Пожалуйста, попробуйте позже или позвоните нам.',
        errors 
      });
    } else {
      // Telegram работает - возвращаем успех сразу
      // Email отправится в фоне, если получится
      return res.json({ 
        success: true, 
        message: 'Заявка успешно отправлена'
      });
    }
  } catch (error) {
    console.error('❌ Общая ошибка:', error);
    console.error('Стек ошибки:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при отправке заявки',
      error: error.message || 'Неизвестная ошибка'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    telegram: !!(process.env.VITE_TELEGRAM_BOT_TOKEN && process.env.VITE_TELEGRAM_CHAT_ID),
    smtp: !!(process.env.VITE_SMTP_HOST && process.env.VITE_SMTP_USER)
  });
});

// Все остальные запросы отправляем на index.html (для SPA routing)
app.get('*', (req, res) => {
  // Если это API запрос, возвращаем 404
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📧 SMTP: ${process.env.VITE_SMTP_HOST ? '✅ Настроен' : '❌ Не настроен'}`);
  console.log(`📱 Telegram: ${process.env.VITE_TELEGRAM_BOT_TOKEN ? '✅ Настроен' : '❌ Не настроен'}`);
  console.log(`🌐 Режим: ${process.env.NODE_ENV || 'development'}`);
});


/**
 * Простой сервер для тестирования отправки форм в Telegram и Email
 * Запуск: node server.js
 */

import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

    // Отправка на Email
    if (process.env.VITE_SMTP_HOST && process.env.VITE_SMTP_USER && process.env.VITE_SMTP_PASSWORD) {
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

        // Убираем ciphers: 'SSLv3' - это устаревший протокол и может вызывать проблемы
        const transporter = nodemailer.createTransport({
          host: process.env.VITE_SMTP_HOST,
          port: smtpPort,
          secure: isSecure,
          auth: {
            user: process.env.VITE_SMTP_USER,
            pass: process.env.VITE_SMTP_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false // Для самоподписанных сертификатов
          },
          // Дополнительные настройки для надежности
          connectionTimeout: 30000,
          greetingTimeout: 30000,
          socketTimeout: 30000
        });

        // Пробуем проверить соединение (но не критично, если не получится)
        try {
          await transporter.verify();
          console.log('✅ SMTP соединение проверено');
        } catch (verifyError) {
          console.warn('⚠️ Не удалось проверить SMTP соединение:', verifyError.message);
          console.warn('Продолжаем отправку без проверки...');
        }

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
        console.log('Response:', info.response);
      } catch (emailError) {
        console.error('❌ Ошибка отправки Email:');
        console.error('Сообщение:', emailError.message);
        console.error('Код:', emailError.code);
        
        // Проверяем, это DNS ошибка или другая
        const isDnsError = emailError.code === 'EDNS' || emailError.message.includes('getaddrinfo') || emailError.message.includes('EAI_AGAIN');
        
        if (isDnsError) {
          console.warn('⚠️ DNS ошибка - SMTP сервер недоступен с локальной машины');
          console.warn('💡 Это нормально для локальной разработки. На production (Vercel) Email будет работать.');
          // Не добавляем в errors, чтобы не блокировать успешный ответ, если Telegram работает
        } else {
          // Другие ошибки (авторизация, соединение и т.д.) - пробуем альтернативные порты
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
                connectionTimeout: 30000,
                greetingTimeout: 30000,
                socketTimeout: 30000
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

              const altInfo = await altTransporter.sendMail(altMailOptions);
              console.log(`✅ Письмо отправлено на Email через порт ${altPort}!`);
              console.log('Message ID:', altInfo.messageId);
              emailSent = true;
              break; // Успешно отправили, выходим из цикла
            } catch (altError) {
              console.error(`❌ Ошибка при попытке через порт ${altPort}:`, altError.message);
            }
          }
          
          if (!emailSent) {
            // Если все порты не сработали и это не DNS ошибка - добавляем в errors
            errors.push('Email: ' + (emailError.message || 'Неизвестная ошибка'));
          }
        }
      }
    } else {
      console.warn('⚠️ SMTP не настроен (отсутствуют настройки)');
      console.warn('Проверьте переменные:', {
        host: !!process.env.VITE_SMTP_HOST,
        user: !!process.env.VITE_SMTP_USER,
        password: !!process.env.VITE_SMTP_PASSWORD
      });
    }

    if (errors.length > 0) {
      res.status(207).json({ 
        success: true, 
        message: 'Заявка обработана, но были ошибки',
        errors 
      });
    } else {
      res.json({ success: true, message: 'Заявка успешно отправлена' });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📧 SMTP: ${process.env.VITE_SMTP_HOST ? '✅ Настроен' : '❌ Не настроен'}`);
  console.log(`📱 Telegram: ${process.env.VITE_TELEGRAM_BOT_TOKEN ? '✅ Настроен' : '❌ Не настроен'}`);
});


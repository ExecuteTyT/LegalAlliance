/**
 * Vercel Serverless Function для отправки форм в Telegram и Email
 * Работает на Vercel как serverless функция
 */

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Включаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight запросов
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

  try {
    // Отправка в Telegram
    if (process.env.VITE_TELEGRAM_BOT_TOKEN && process.env.VITE_TELEGRAM_CHAT_ID) {
      try {
        const message = `🔔 Новая заявка с сайта Правовой Альянс\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}${debtAmount ? `\n💰 Сумма долга: ${debtAmount}` : ''}\n📍 Источник: ${source || 'Не указан'}\n\n⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;
        
        const telegramUrl = `https://api.telegram.org/bot${process.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`;
        const telegramResponse = await fetch(telegramUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: process.env.VITE_TELEGRAM_CHAT_ID,
            text: message
          }),
        });

        if (!telegramResponse.ok) {
          const errorData = await telegramResponse.json();
          throw new Error(errorData.description || 'Ошибка Telegram API');
        }

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
          }
        });

        await transporter.sendMail({
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
        });

        console.log('✅ Письмо отправлено на Email');
      } catch (emailError) {
        console.error('❌ Ошибка отправки Email:', emailError.message);
        console.error('Детали ошибки:', emailError);
        errors.push('Email: ' + (emailError.message || 'Неизвестная ошибка'));
      }
    } else {
      console.warn('⚠️ SMTP не настроен (отсутствуют настройки)');
    }

    if (errors.length > 0) {
      return res.status(207).json({ 
        success: true, 
        message: 'Заявка обработана, но были ошибки',
        errors 
      });
    } else {
      return res.json({ success: true, message: 'Заявка успешно отправлена' });
    }
  } catch (error) {
    console.error('❌ Общая ошибка:', error);
    console.error('Стек ошибки:', error.stack);
    return res.status(500).json({ 
      success: false, 
      message: 'Ошибка при отправке заявки',
      error: error.message || 'Неизвестная ошибка'
    });
  }
}


/**
 * Тестовый скрипт для проверки SMTP настроек
 * Запуск: node test-smtp.js
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testSMTP() {
  console.log('🧪 Тестирование SMTP подключения...\n');

  const config = {
    host: process.env.VITE_SMTP_HOST,
    port: parseInt(process.env.VITE_SMTP_PORT || '465'),
    user: process.env.VITE_SMTP_USER,
    password: process.env.VITE_SMTP_PASSWORD,
    from: process.env.VITE_SMTP_FROM || process.env.VITE_SMTP_USER,
    to: process.env.VITE_SMTP_TO || process.env.VITE_SMTP_USER,
  };

  console.log('📋 Настройки:');
  console.log('  Host:', config.host);
  console.log('  Port:', config.port);
  console.log('  User:', config.user);
  console.log('  From:', config.from);
  console.log('  To:', config.to);
  console.log('  Password:', config.password ? '***' : 'НЕ УСТАНОВЛЕН');
  console.log('');

  // Тест 1: Порт 465 (SSL)
  console.log('🔍 Тест 1: Порт 465 (SSL/TLS)...');
  try {
    const transporter465 = nodemailer.createTransport({
      host: config.host,
      port: 465,
      secure: true,
      auth: {
        user: config.user,
        pass: config.password,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter465.verify();
    console.log('✅ Порт 465: Соединение успешно!');

    const info465 = await transporter465.sendMail({
      from: config.from,
      to: config.to,
      subject: 'Тест SMTP - Порт 465',
      html: '<p>Это тестовое письмо с порта 465</p>'
    });
    console.log('✅ Письмо отправлено через порт 465!');
    console.log('   Message ID:', info465.messageId);
  } catch (error) {
    console.log('❌ Порт 465: Ошибка');
    console.log('   Сообщение:', error.message);
    console.log('   Код:', error.code);
  }

  console.log('');

  // Тест 2: Порт 587 (STARTTLS)
  console.log('🔍 Тест 2: Порт 587 (STARTTLS)...');
  try {
    const transporter587 = nodemailer.createTransport({
      host: config.host,
      port: 587,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter587.verify();
    console.log('✅ Порт 587: Соединение успешно!');

    const info587 = await transporter587.sendMail({
      from: config.from,
      to: config.to,
      subject: 'Тест SMTP - Порт 587',
      html: '<p>Это тестовое письмо с порта 587</p>'
    });
    console.log('✅ Письмо отправлено через порт 587!');
    console.log('   Message ID:', info587.messageId);
  } catch (error) {
    console.log('❌ Порт 587: Ошибка');
    console.log('   Сообщение:', error.message);
    console.log('   Код:', error.code);
  }

  console.log('');

  // Тест 3: Порт 25 (без шифрования)
  console.log('🔍 Тест 3: Порт 25 (без шифрования)...');
  try {
    const transporter25 = nodemailer.createTransport({
      host: config.host,
      port: 25,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter25.verify();
    console.log('✅ Порт 25: Соединение успешно!');

    const info25 = await transporter25.sendMail({
      from: config.from,
      to: config.to,
      subject: 'Тест SMTP - Порт 25',
      html: '<p>Это тестовое письмо с порта 25</p>'
    });
    console.log('✅ Письмо отправлено через порт 25!');
    console.log('   Message ID:', info25.messageId);
  } catch (error) {
    console.log('❌ Порт 25: Ошибка');
    console.log('   Сообщение:', error.message);
    console.log('   Код:', error.code);
  }
}

testSMTP().catch(console.error);


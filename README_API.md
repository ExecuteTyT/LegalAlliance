# Инструкция по настройке отправки форм в Telegram и Email

## Настройка переменных окружения

1. Скопируйте файл `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Заполните переменные в `.env`:

### Telegram Bot
- `VITE_TELEGRAM_BOT_TOKEN` - токен вашего Telegram бота (получить у @BotFather)
- `VITE_TELEGRAM_CHAT_ID` - ID чата, куда отправлять сообщения (можно узнать у @userinfobot)

### SMTP (Email)
- `VITE_SMTP_HOST` - адрес SMTP сервера (например, smtp.gmail.com)
- `VITE_SMTP_PORT` - порт SMTP (обычно 587 для TLS или 465 для SSL)
- `VITE_SMTP_USER` - ваш email для авторизации
- `VITE_SMTP_PASSWORD` - пароль от email или пароль приложения
- `VITE_SMTP_FROM` - email отправителя
- `VITE_SMTP_TO` - email получателя (куда будут приходить заявки)

### API Endpoint
- `VITE_API_URL` - URL вашего backend API (по умолчанию `/api/submit-form`)

## Создание Telegram бота

1. Откройте Telegram и найдите @BotFather
2. Отправьте команду `/newbot`
3. Следуйте инструкциям и получите токен бота
4. Для получения Chat ID:
   - Напишите вашему боту любое сообщение
   - Откройте в браузере: `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`
   - Найдите `chat.id` в ответе

## Настройка Backend

Вам нужно создать backend endpoint, который будет обрабатывать запросы от форм.

### Вариант 1: Node.js + Express

1. Установите зависимости:
```bash
npm install express nodemailer axios
npm install -D @types/node @types/express
```

2. Создайте файл `server.js`:
```javascript
import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/submit-form', async (req, res) => {
  const { name, phone, source, debtAmount } = req.body;

  try {
    // Отправка в Telegram
    if (process.env.VITE_TELEGRAM_BOT_TOKEN && process.env.VITE_TELEGRAM_CHAT_ID) {
      const message = `🔔 Новая заявка с сайта Правовой Альянс\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}${debtAmount ? `\n💰 Сумма долга: ${debtAmount}` : ''}\n📍 Источник: ${source || 'Не указан'}\n\n⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;
      
      await axios.post(`https://api.telegram.org/bot${process.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.VITE_TELEGRAM_CHAT_ID,
        text: message
      });
    }

    // Отправка на Email
    if (process.env.VITE_SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.VITE_SMTP_HOST,
        port: parseInt(process.env.VITE_SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.VITE_SMTP_USER,
          pass: process.env.VITE_SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.VITE_SMTP_FROM,
        to: process.env.VITE_SMTP_TO,
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
    }

    res.json({ success: true, message: 'Заявка успешно отправлена' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Ошибка при отправке заявки' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

3. Запустите сервер:
```bash
node server.js
```

### Вариант 2: PHP

Создайте файл `api/submit-form.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'] ?? '';
$phone = $data['phone'] ?? '';
$source = $data['source'] ?? 'Не указан';
$debtAmount = $data['debtAmount'] ?? '';

// Telegram
$telegramToken = getenv('VITE_TELEGRAM_BOT_TOKEN');
$telegramChatId = getenv('VITE_TELEGRAM_CHAT_ID');

if ($telegramToken && $telegramChatId) {
    $message = "🔔 Новая заявка с сайта Правовой Альянс\n\n👤 Имя: {$name}\n📞 Телефон: {$phone}";
    if ($debtAmount) {
        $message .= "\n💰 Сумма долга: {$debtAmount}";
    }
    $message .= "\n📍 Источник: {$source}\n\n⏰ Время: " . date('d.m.Y H:i');
    
    $url = "https://api.telegram.org/bot{$telegramToken}/sendMessage";
    $postData = [
        'chat_id' => $telegramChatId,
        'text' => $message
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
}

// Email
$to = getenv('VITE_SMTP_TO');
$subject = "Новая заявка с сайта: {$name}";
$message = "
    <h2>Новая заявка с сайта Правовой Альянс</h2>
    <p><strong>Имя:</strong> {$name}</p>
    <p><strong>Телефон:</strong> {$phone}</p>
";
if ($debtAmount) {
    $message .= "<p><strong>Сумма долга:</strong> {$debtAmount}</p>";
}
$message .= "
    <p><strong>Источник:</strong> {$source}</p>
    <p><strong>Время:</strong> " . date('d.m.Y H:i') . "</p>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . getenv('VITE_SMTP_FROM');

mail($to, $subject, $message, $headers);

echo json_encode(['success' => true, 'message' => 'Заявка успешно отправлена']);
?>
```

### Вариант 3: Serverless функции (Vercel, Netlify)

Создайте файл `api/submit-form.js` (для Vercel) или `netlify/functions/submit-form.js` (для Netlify):

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, source, debtAmount } = req.body;

  // ... код отправки в Telegram и Email (как в варианте 1)

  return res.status(200).json({ success: true });
}
```

## Настройка Vite для работы с API

Если вы используете отдельный backend сервер, добавьте в `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
```

## Тестирование

1. Заполните форму на сайте
2. Проверьте, что сообщение пришло в Telegram
3. Проверьте, что письмо пришло на email

## Безопасность

⚠️ **Важно**: Не коммитьте файл `.env` в Git! Он уже должен быть в `.gitignore`.

Для production используйте переменные окружения на вашем хостинге.


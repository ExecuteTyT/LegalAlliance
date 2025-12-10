/**
 * API endpoint для отправки форм
 * Этот файл нужно интегрировать в ваш backend (Node.js, PHP, Python и т.д.)
 * 
 * Пример для Node.js + Express:
 */

/*
import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';

const router = express.Router();

router.post('/submit-form', async (req, res) => {
  const { name, phone, source, debtAmount } = req.body;

  try {
    // Отправка в Telegram
    const telegramToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.VITE_TELEGRAM_CHAT_ID;
    
    if (telegramToken && telegramChatId) {
      const telegramMessage = `🔔 Новая заявка с сайта Правовой Альянс\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}${debtAmount ? `\n💰 Сумма долга: ${debtAmount}` : ''}\n📍 Источник: ${source || 'Не указан'}\n\n⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;
      
      await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        chat_id: telegramChatId,
        text: telegramMessage,
        parse_mode: 'HTML'
      });
    }

    // Отправка на Email
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

    res.json({ success: true, message: 'Заявка успешно отправлена' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Ошибка при отправке заявки' });
  }
});

export default router;
*/

/**
 * Пример для PHP:
 */

/*
<?php
header('Content-Type: application/json');

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
*/


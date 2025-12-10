# Настройка для Vercel

## Важно: Переменные окружения

После деплоя на Vercel нужно добавить переменные окружения в настройках проекта:

1. Откройте проект на Vercel
2. Перейдите в Settings → Environment Variables
3. Добавьте все переменные из `.env`:

```
VITE_TELEGRAM_BOT_TOKEN=8448539717:AAEyluY1y6xzDq5i6r6xu_qh-oIzFkEwnig
VITE_TELEGRAM_CHAT_ID=-5090369104
VITE_SMTP_HOST=mail.alliance-pravo.ru
VITE_SMTP_PORT=465
VITE_SMTP_USER=info@alliance-pravo.ru
VITE_SMTP_PASSWORD=gI2iI7xL0mcJ7pX2
VITE_SMTP_FROM=info@alliance-pravo.ru
VITE_SMTP_TO=info@alliance-pravo.ru
```

## После добавления переменных

1. Передеплойте проект (Redeploy)
2. Или подождите автоматического деплоя после следующего коммита

## Проверка работы

После деплоя проверьте:
- Форма должна отправляться без ошибок
- Сообщения должны приходить в Telegram
- Письма должны приходить на email


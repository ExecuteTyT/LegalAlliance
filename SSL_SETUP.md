# Установка SSL-сертификата (HTTPS)

## Автоматическая установка

Выполните на сервере:

```bash
cd /var/www/LegalAlliance

# Установить Certbot
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Получить сертификат для домена
certbot --nginx -d alliance-pravo.ru -d www.alliance-pravo.ru

# Certbot спросит:
# - Email для уведомлений (можно ввести ваш email)
# - Согласие с условиями (Y)
# - Редирект HTTP -> HTTPS (2 - редирект)
```

Certbot автоматически:
- Получит SSL-сертификат от Let's Encrypt
- Обновит конфигурацию Nginx
- Настроит автоматическое обновление сертификата

## Ручная настройка (если нужно)

Если автоматическая установка не сработала:

1. Получить сертификат:
```bash
certbot certonly --nginx -d alliance-pravo.ru -d www.alliance-pravo.ru
```

2. Обновить nginx.conf вручную (см. nginx-ssl.conf)

3. Перезапустить Nginx:
```bash
systemctl restart nginx
```

## Проверка

После установки проверьте:
- https://alliance-pravo.ru - должен открываться с зеленым замочком
- http://alliance-pravo.ru - должен автоматически редиректить на HTTPS

## Автоматическое обновление

Certbot автоматически настроит cron для обновления сертификата. Проверить можно:
```bash
systemctl status certbot.timer
```

## Проблемы

Если сертификат не устанавливается:
1. Проверьте, что домен указывает на IP сервера: `dig alliance-pravo.ru`
2. Проверьте, что порт 80 открыт: `netstat -tuln | grep :80`
3. Проверьте логи: `tail -f /var/log/nginx/legal-alliance-error.log`


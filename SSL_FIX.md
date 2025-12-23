# Исправление ошибки SSL (404 на ACME challenge)

## Проблема
Certbot не может получить сертификат, потому что Nginx не обслуживает `.well-known/acme-challenge/` напрямую.

## Решение

### Вариант 1: Использовать standalone режим (рекомендуется)

Этот режим временно остановит Nginx и запустит свой веб-сервер для проверки:

```bash
cd /var/www/LegalAlliance

# Остановить Nginx
systemctl stop nginx

# Получить сертификат в standalone режиме
certbot certonly --standalone -d alliance-pravo.ru -d www.alliance-pravo.ru --email info@alliance-pravo.ru --agree-tos --non-interactive

# Запустить Nginx обратно
systemctl start nginx
```

### Вариант 2: Добавить поддержку ACME challenge в Nginx

1. Обновить nginx.conf на сервере:
```bash
cd /var/www/LegalAlliance
git pull origin main
```

2. Создать папку для ACME challenge:
```bash
mkdir -p /var/www/certbot
chmod 755 /var/www/certbot
```

3. Обновить конфигурацию Nginx:
```bash
cp nginx.conf /etc/nginx/sites-available/legal-alliance
nginx -t
systemctl reload nginx
```

4. Получить сертификат:
```bash
certbot --nginx -d alliance-pravo.ru -d www.alliance-pravo.ru --email info@alliance-pravo.ru --agree-tos --non-interactive --redirect
```

## После получения сертификата

Certbot автоматически обновит конфигурацию Nginx. Проверьте:

```bash
# Проверить конфигурацию
nginx -t

# Перезапустить Nginx
systemctl reload nginx

# Проверить сертификат
certbot certificates
```

## Проверка работы

- https://alliance-pravo.ru - должен открываться с зеленым замочком
- http://alliance-pravo.ru - должен автоматически редиректить на HTTPS


# 🔧 Исправление: SSL сертификат через DNS Challenge

## ❌ Проблема

Let's Encrypt не может получить сертификат через HTTP challenge:
- Обращается по IPv6 (`2a00:f940:2:2:1:1:0:40`)
- Получает 404 на `.well-known/acme-challenge/`

## ✅ Решение: Использовать DNS Challenge

DNS Challenge не требует доступа к серверу через HTTP, работает через DNS записи.

### Шаг 1: Исправить ACME challenge (если хотите попробовать HTTP снова)

```bash
cd /var/www/LegalAlliance
bash fix-acme-challenge.sh
```

### Шаг 2: Получить сертификат через DNS Challenge

```bash
# 1. Запустить certbot в режиме DNS challenge
certbot certonly --manual --preferred-challenges dns \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos \
  --no-eff-email

# 2. Certbot покажет TXT запись для DNS
# Пример:
# _acme-challenge.alliance-pravo.ru. TXT "abc123xyz..."

# 3. Добавить эту TXT запись в DNS у регистратора
# - Зайти в панель управления доменом
# - Найти раздел DNS записи
# - Добавить TXT запись:
#   Имя: _acme-challenge
#   Тип: TXT
#   Значение: (то что показал certbot)

# 4. Подождать 1-2 минуты для распространения DNS

# 5. Нажать Enter в терминале certbot

# 6. Certbot получит сертификат
```

### Шаг 3: Настроить Nginx для использования сертификата

```bash
# 1. Применить SSL конфигурацию
cd /var/www/LegalAlliance
cp nginx-ssl.conf /etc/nginx/sites-available/legal-alliance

# 2. Проверить конфигурацию
nginx -t

# 3. Перезагрузить Nginx
systemctl reload nginx

# 4. Проверить работу
curl -I https://alliance-pravo.ru
```

## 🚀 Альтернатива: Использовать готовый сертификат (если есть)

Если у вас уже есть SSL сертификат от другого провайдера:

```bash
# 1. Скопировать сертификаты в нужное место
mkdir -p /etc/letsencrypt/live/alliance-pravo.ru/
cp your-certificate.crt /etc/letsencrypt/live/alliance-pravo.ru/fullchain.pem
cp your-private-key.key /etc/letsencrypt/live/alliance-pravo.ru/privkey.pem

# 2. Применить SSL конфигурацию
cp /var/www/LegalAlliance/nginx-ssl.conf /etc/nginx/sites-available/legal-alliance

# 3. Проверить и перезагрузить
nginx -t
systemctl reload nginx
```

## 📋 Быстрое решение (если DNS challenge сложно)

### Вариант 1: Исправить ACME challenge и повторить

```bash
# 1. Создать директорию
mkdir -p /var/www/certbot
chmod 755 /var/www/certbot

# 2. Проверить конфигурацию
grep -A 5 "acme-challenge" /etc/nginx/sites-available/legal-alliance

# 3. Убедиться, что location правильный:
# location /.well-known/acme-challenge/ {
#     root /var/www/certbot;
#     try_files $uri =404;
# }

# 4. Перезагрузить Nginx
systemctl reload nginx

# 5. Попробовать снова
certbot --nginx -d alliance-pravo.ru -d www.alliance-pravo.ru
```

### Вариант 2: Использовать standalone режим (временно остановить Nginx)

```bash
# 1. Остановить Nginx
systemctl stop nginx

# 2. Получить сертификат в standalone режиме
certbot certonly --standalone -d alliance-pravo.ru -d www.alliance-pravo.ru

# 3. Запустить Nginx
systemctl start nginx

# 4. Применить SSL конфигурацию
cp /var/www/LegalAlliance/nginx-ssl.conf /etc/nginx/sites-available/legal-alliance
nginx -t
systemctl reload nginx
```

## 🔍 Диагностика проблемы

```bash
# Проверить доступность ACME challenge
curl -I http://alliance-pravo.ru/.well-known/acme-challenge/test

# Проверить логи certbot
tail -50 /var/log/letsencrypt/letsencrypt.log

# Проверить логи Nginx
tail -50 /var/log/nginx/legal-alliance-error.log

# Проверить IPv6
ip -6 addr show
netstat -tulpn | grep ":::80"
```

## 💡 Рекомендация

Если HTTP challenge не работает из-за IPv6, лучше использовать **DNS challenge** - он надежнее и не зависит от доступности сервера через HTTP.


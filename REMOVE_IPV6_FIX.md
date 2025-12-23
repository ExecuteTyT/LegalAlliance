# 🔧 Решение: Удаление IPv6 (AAAA) записей для получения SSL

## ❌ Проблема

Let's Encrypt обращается по IPv6 (`2a00:f940:2:2:1:1:0:40`) и не может достучаться до сервера, получая 404 ошибку.

## ✅ Решение: Удалить AAAA записи (IPv6)

### Шаг 1: Удалить AAAA записи в DNS

1. Зайти в панель управления доменом **Reg.ru**
2. Перейти в раздел **"DNS записи"** или **"Управление записями домена"**
3. Найти все **AAAA записи** (IPv6):
   - `alliance-pravo.ru.` → `2a00:f940:2:2:1:1:0:40`
   - `www.alliance-pravo.ru.` → `2a00:f940:2:2:1:1:0:40`
   - `ftp.alliance-pravo.ru.` → `2a00:f940:2:2:1:1:0:40`
   - `mail.alliance-pravo.ru.` → `2a00:f940:2:2:1:1:0:40`
   - `smtp.alliance-pravo.ru.` → `2a00:f940:2:2:1:1:0:40`
   - `pop.alliance-pravo.ru.` → `2a00:f940:2:2:1:1:0:40`

4. **Удалить все AAAA записи** (или оставить только для mail/ftp, если они нужны)

### Шаг 2: Подождать распространения DNS (5-15 минут)

```bash
# Проверить, что AAAA записи удалены
dig AAAA alliance-pravo.ru
dig AAAA www.alliance-pravo.ru

# Должно показать "no servers could be reached" или пустой ответ
```

### Шаг 3: Получить SSL сертификат

После удаления AAAA записей выполните:

```bash
# 1. Обновить код (чтобы получить nginx-ssl.conf)
cd /var/www/LegalAlliance
git pull

# 2. Остановить Nginx
systemctl stop nginx

# 3. Получить сертификат в standalone режиме
certbot certonly --standalone \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos \
  --non-interactive

# 4. Запустить Nginx
systemctl start nginx

# 5. Применить SSL конфигурацию
cp nginx-ssl.conf /etc/nginx/sites-available/legal-alliance
nginx -t
systemctl reload nginx

# 6. Проверить работу
curl -I https://alliance-pravo.ru
```

## 🔄 Альтернатива: Использовать HTTP challenge через Nginx

Если не хотите останавливать Nginx:

```bash
# 1. Обновить код
cd /var/www/LegalAlliance
git pull

# 2. Применить HTTP конфигурацию
cp nginx.conf /etc/nginx/sites-available/legal-alliance
nginx -t
systemctl reload nginx

# 3. Получить сертификат через Nginx
certbot --nginx -d alliance-pravo.ru -d www.alliance-pravo.ru

# Certbot автоматически настроит SSL!
```

## ⚠️ Важно

После удаления AAAA записей:
- ✅ Let's Encrypt будет обращаться только по IPv4
- ✅ Сертификат должен получить успешно
- ⚠️ Сайт будет доступен только по IPv4 (это нормально, большинство пользователей используют IPv4)

## 📋 Проверка после настройки

```bash
# 1. Проверить сертификат
certbot certificates

# 2. Проверить HTTPS
curl -I https://alliance-pravo.ru

# 3. Проверить редирект HTTP → HTTPS
curl -I http://alliance-pravo.ru

# 4. Проверить в браузере
# Откройте https://alliance-pravo.ru
```

## 🎯 Быстрая команда (после удаления AAAA)

```bash
cd /var/www/LegalAlliance && \
git pull && \
systemctl stop nginx && \
certbot certonly --standalone -d alliance-pravo.ru -d www.alliance-pravo.ru --email info@alliance-pravo.ru --agree-tos --non-interactive && \
systemctl start nginx && \
cp nginx-ssl.conf /etc/nginx/sites-available/legal-alliance && \
nginx -t && \
systemctl reload nginx && \
curl -I https://alliance-pravo.ru
```


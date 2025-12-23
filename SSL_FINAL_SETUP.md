# Финальная настройка SSL (DNS уже правильный)

## Шаг 1: Проверить DNS на сервере

```bash
# Проверить текущий DNS
dig alliance-pravo.ru +short
dig www.alliance-pravo.ru +short

# Должно быть: 95.163.227.144
# Если показывает 31.31.196.76 - это кеш, нужно подождать или очистить
```

## Шаг 2: Очистить DNS кеш (если нужно)

```bash
# Очистить системный DNS кеш
systemd-resolve --flush-caches 2>/dev/null || true

# Или перезапустить systemd-resolved
systemctl restart systemd-resolved

# Проверить снова
dig alliance-pravo.ru +short
```

## Шаг 3: Получить SSL сертификат

```bash
# Остановить Nginx (Certbot запустит свой веб-сервер)
systemctl stop nginx

# Получить сертификат
certbot certonly --standalone \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos \
  --non-interactive

# Запустить Nginx обратно
systemctl start nginx
```

## Шаг 4: Настроить Nginx для HTTPS

```bash
cd /var/www/LegalAlliance

# Обновить конфигурацию Nginx
cat > /etc/nginx/sites-available/legal-alliance << 'EOF'
# HTTP -> HTTPS редирект
server {
    listen 80;
    listen [::]:80;
    server_name alliance-pravo.ru www.alliance-pravo.ru;

    # ACME challenge для обновления сертификата
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files $uri =404;
    }

    # Редирект на HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS сервер
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name alliance-pravo.ru www.alliance-pravo.ru;

    # SSL сертификаты
    ssl_certificate /etc/letsencrypt/live/alliance-pravo.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alliance-pravo.ru/privkey.pem;
    
    # SSL настройки
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    access_log /var/log/nginx/legal-alliance-access.log;
    error_log /var/log/nginx/legal-alliance-error.log;
    client_max_body_size 10M;

    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 120s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3001;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Проверить конфигурацию
nginx -t

# Перезагрузить Nginx
systemctl reload nginx
```

## Шаг 5: Проверка

```bash
# Проверить сертификат
certbot certificates

# Проверить сайт
curl -I https://alliance-pravo.ru
curl -I http://alliance-pravo.ru  # Должен редиректить на HTTPS
```

## Автоматическое обновление сертификата

Certbot автоматически настроит обновление. Проверить можно:

```bash
systemctl status certbot.timer
certbot renew --dry-run
```


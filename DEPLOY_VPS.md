# Инструкция по деплою на VPS сервер

## Подготовка сервера

### 1. Подключение к серверу

```bash
ssh root@95.163.227.144
# Пароль: AG5xQWJPlC3MxSwx
```

### 2. Установка Node.js (если не установлен)

```bash
# Проверить версию Node.js
node --version

# Если не установлен, установить Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Проверить установку
node --version
npm --version
```

### 3. Установка PM2

```bash
npm install -g pm2
```

### 4. Установка nginx (если не установлен)

```bash
apt-get update
apt-get install -y nginx

# Проверить статус
systemctl status nginx
```

### 5. Установка Git (если не установлен)

```bash
apt-get install -y git
```

## Деплой приложения

### 1. Создать директорию для проекта

```bash
mkdir -p /var/www
cd /var/www
```

### 2. Клонировать репозиторий

```bash
git clone https://github.com/ExecuteTyT/LegalAlliance.git
cd LegalAlliance
```

### 3. Установить зависимости

```bash
npm install
```

### 4. Создать .env файл

```bash
nano .env
```

Вставить следующее содержимое:

```env
# Telegram Bot Configuration
VITE_TELEGRAM_BOT_TOKEN=8448539717:AAEyluY1y6xzDq5i6r6xu_qh-oIzFkEwnig
VITE_TELEGRAM_CHAT_ID=-5090369104

# SMTP Configuration
VITE_SMTP_HOST=mail.alliance-pravo.ru
VITE_SMTP_PORT=587
VITE_SMTP_USER=info@alliance-pravo.ru
VITE_SMTP_PASSWORD=gI2iI7xL0mcJ7pX2
VITE_SMTP_FROM=info@alliance-pravo.ru
VITE_SMTP_TO=info@alliance-pravo.ru

# Server Configuration
PORT=3001
NODE_ENV=production
```

Сохранить: `Ctrl+O`, `Enter`, `Ctrl+X`

### 5. Собрать проект

```bash
npm run build
```

### 6. Создать папку для логов

```bash
mkdir -p logs
```

### 7. Запустить через PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Последняя команда покажет команду для автозапуска - выполните её.

### 8. Проверить статус

```bash
pm2 status
pm2 logs legal-alliance
```

## Настройка nginx

### 1. Создать конфигурацию

```bash
cp nginx.conf /etc/nginx/sites-available/legal-alliance
```

Или создать вручную:

```bash
nano /etc/nginx/sites-available/legal-alliance
```

Вставить содержимое из файла `nginx.conf` из репозитория.

### 2. Активировать сайт

```bash
ln -s /etc/nginx/sites-available/legal-alliance /etc/nginx/sites-enabled/
```

### 3. Проверить конфигурацию

```bash
nginx -t
```

### 4. Перезагрузить nginx

```bash
systemctl reload nginx
```

## Настройка домена

### 1. Настроить DNS записи

В панели управления доменом добавить A-запись:
- `alliance-pravo.ru` → `95.163.227.144`
- `www.alliance-pravo.ru` → `95.163.227.144`

### 2. Настроить SSL (Let's Encrypt)

```bash
# Установить certbot
apt-get install -y certbot python3-certbot-nginx

# Получить сертификат
certbot --nginx -d alliance-pravo.ru -d www.alliance-pravo.ru

# Автоматическое обновление
certbot renew --dry-run
```

## Полезные команды

### PM2

```bash
# Статус
pm2 status

# Логи
pm2 logs legal-alliance

# Перезапуск
pm2 restart legal-alliance

# Остановка
pm2 stop legal-alliance

# Удаление
pm2 delete legal-alliance
```

### Обновление проекта

```bash
cd /var/www/LegalAlliance
git pull
npm install
npm run build
pm2 restart legal-alliance
```

### Проверка работы

```bash
# Проверить API
curl http://localhost:3001/api/health

# Проверить через nginx
curl http://localhost/api/health
```

## Устранение проблем

### Порт занят

```bash
# Проверить, что использует порт 3001
lsof -i :3001
netstat -tulpn | grep 3001

# Остановить процесс
pm2 stop legal-alliance
```

### Nginx не работает

```bash
# Проверить статус
systemctl status nginx

# Проверить логи
tail -f /var/log/nginx/error.log

# Перезапустить
systemctl restart nginx
```

### Приложение не запускается

```bash
# Проверить логи PM2
pm2 logs legal-alliance --lines 50

# Проверить .env файл
cat .env

# Проверить, что dist папка существует
ls -la dist/
```

## Безопасность

### Firewall (UFW)

```bash
# Установить UFW
apt-get install -y ufw

# Разрешить SSH, HTTP, HTTPS
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp

# Включить firewall
ufw enable

# Проверить статус
ufw status
```

### Обновление системы

```bash
apt-get update
apt-get upgrade -y
```

## Мониторинг

### PM2 Monitoring

```bash
pm2 monit
```

### Логи

```bash
# Логи приложения
tail -f /var/www/LegalAlliance/logs/out.log
tail -f /var/www/LegalAlliance/logs/err.log

# Логи nginx
tail -f /var/log/nginx/legal-alliance-access.log
tail -f /var/log/nginx/legal-alliance-error.log
```


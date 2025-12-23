# Диагностика и исправление проблем с SSL

## Проблема
Let's Encrypt не может получить доступ к домену через HTTP (404 на `.well-known/acme-challenge/`).

## Диагностика

### 1. Проверить DNS

```bash
# Проверить, куда указывает домен
dig alliance-pravo.ru +short
dig www.alliance-pravo.ru +short

# Должно быть: 95.163.227.144
# Если другой IP - обновите DNS записи в панели управления доменом
```

### 2. Проверить доступность порта 80

```bash
# Проверить, слушает ли Nginx порт 80
netstat -tuln | grep :80

# Проверить файрвол
ufw status
# или
iptables -L -n | grep 80

# Если порт 80 закрыт, открыть его
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload
```

### 3. Проверить доступность сайта

```bash
# С сервера
curl -I http://alliance-pravo.ru
curl -I http://95.163.227.144

# Должен вернуть HTTP 200 или 301/302
```

### 4. Проверить конфигурацию Nginx

```bash
# Проверить, что Nginx использует правильную конфигурацию
nginx -t
cat /etc/nginx/sites-available/legal-alliance | grep server_name

# Должно быть: alliance-pravo.ru www.alliance-pravo.ru
```

## Решение 1: Исправить DNS (если проблема в DNS)

Если домен указывает не на 95.163.227.144:
1. Зайдите в панель управления доменом (reg.ru)
2. Обновите A-записи:
   - `alliance-pravo.ru` → `95.163.227.144`
   - `www.alliance-pravo.ru` → `95.163.227.144`
3. Подождите 5-10 минут для распространения DNS
4. Проверьте: `dig alliance-pravo.ru +short`
5. Попробуйте снова: `certbot certonly --standalone -d alliance-pravo.ru -d www.alliance-pravo.ru --email info@alliance-pravo.ru --agree-tos --non-interactive`

## Решение 2: Открыть порты в файрволе

```bash
# Если ufw активен
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload

# Проверить
ufw status
```

## Решение 3: Использовать DNS challenge (если порт 80 недоступен)

```bash
# Получить сертификат через DNS challenge
certbot certonly --manual --preferred-challenges dns \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos

# Certbot попросит добавить TXT запись в DNS
# Выполните инструкции и нажмите Enter
```

## Решение 4: Временный обход (самоподписанный сертификат)

Если нужно срочно запустить HTTPS, можно использовать самоподписанный сертификат:

```bash
# Создать самоподписанный сертификат
mkdir -p /etc/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/alliance-pravo.ru.key \
  -out /etc/nginx/ssl/alliance-pravo.ru.crt \
  -subj "/C=RU/ST=Tatarstan/L=Naberezhnye Chelny/O=Legal Alliance/CN=alliance-pravo.ru"

# Обновить nginx.conf, указав пути к сертификатам
# Затем перезапустить Nginx
systemctl reload nginx
```

**Внимание:** Браузеры будут показывать предупреждение о небезопасном сертификате. Это только для тестирования!

## После успешного получения сертификата

1. Обновить конфигурацию Nginx для HTTPS
2. Перезапустить Nginx
3. Проверить работу сайта


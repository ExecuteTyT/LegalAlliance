# Установка SSL через DNS challenge (если HTTP не работает)

## Проблема
Let's Encrypt не может получить доступ к домену через HTTP (порт 80). Возможные причины:
- Файрвол блокирует порт 80
- DNS не настроен правильно
- Проблемы с IPv6

## Решение: DNS challenge

Этот метод не требует доступа к порту 80, работает через DNS записи.

### 1. Установить certbot с DNS плагином

```bash
apt-get install -y certbot python3-certbot-dns-cloudflare
# или для других провайдеров:
# python3-certbot-dns-route53 (AWS)
# python3-certbot-dns-google (Google Cloud)
```

### 2. Получить сертификат через DNS challenge

```bash
certbot certonly --manual --preferred-challenges dns \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos \
  --non-interactive
```

Certbot попросит добавить TXT запись в DNS. Выполните инструкции.

### 3. Альтернатива: Проверить доступность порта 80

```bash
# Проверить, слушает ли что-то порт 80
netstat -tuln | grep :80

# Проверить файрвол
ufw status
iptables -L -n | grep 80

# Если порт 80 закрыт, открыть его
ufw allow 80/tcp
ufw allow 443/tcp
```

### 4. Проверить DNS

```bash
# Проверить, куда указывает домен
dig alliance-pravo.ru +short
dig www.alliance-pravo.ru +short

# Должно быть: 95.163.227.144
```

### 5. Проверить доступность сайта извне

```bash
# С другого компьютера или через онлайн-сервис:
curl -I http://alliance-pravo.ru
# Должен вернуть HTTP 200 или 301/302
```


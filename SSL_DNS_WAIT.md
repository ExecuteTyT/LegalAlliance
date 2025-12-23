# Проблема: DNS еще не распространился

## Ситуация
- В панели управления DNS настроен правильно: `95.163.227.144`
- Но на сервере `dig` показывает старый IP: `31.31.196.76`
- Это нормально - DNS распространяется 5-60 минут

## Решение 1: Проверить DNS через публичные серверы

```bash
# Проверить через Google DNS
dig @8.8.8.8 alliance-pravo.ru +short
dig @8.8.8.8 www.alliance-pravo.ru +short

# Проверить через Cloudflare DNS
dig @1.1.1.1 alliance-pravo.ru +short
dig @1.1.1.1 www.alliance-pravo.ru +short

# Если публичные DNS показывают правильный IP (95.163.227.144),
# значит DNS распространился, просто локальный кеш еще старый
```

## Решение 2: Использовать DNS challenge (не требует HTTP)

Если DNS еще не распространился везде, используйте DNS challenge:

```bash
certbot certonly --manual --preferred-challenges dns \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos
```

Certbot попросит добавить TXT записи в DNS:
1. `_acme-challenge.alliance-pravo.ru` → значение
2. `_acme-challenge.www.alliance-pravo.ru` → значение

Добавьте их в панели управления доменом, подождите 2-5 минут, нажмите Enter.

## Решение 3: Подождать распространения DNS

DNS обычно распространяется за 5-60 минут. Можно подождать и попробовать снова через HTTP challenge.

## Решение 4: Временно отключить IPv6 для certbot

Проблема может быть в IPv6. Попробуйте:

```bash
# Получить сертификат только через IPv4
certbot certonly --standalone \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos \
  --non-interactive \
  --preferred-challenges http \
  --http-01-port 80 \
  --preferred-chain "ISRG Root X1"
```


# Проверка TXT записей через разные DNS серверы

## Проблема
Локальный DNS еще не видит TXT записи. Это нормально - DNS распространяется постепенно.

## Решение: Проверить через публичные DNS

```bash
# Проверить через Google DNS (8.8.8.8)
dig @8.8.8.8 _acme-challenge.alliance-pravo.ru TXT +short
dig @8.8.8.8 _acme-challenge.www.alliance-pravo.ru TXT +short

# Проверить через Cloudflare DNS (1.1.1.1)
dig @1.1.1.1 _acme-challenge.alliance-pravo.ru TXT +short
dig @1.1.1.1 _acme-challenge.www.alliance-pravo.ru TXT +short

# Проверить через Quad9 DNS (9.9.9.9)
dig @9.9.9.9 _acme-challenge.alliance-pravo.ru TXT +short
dig @9.9.9.9 _acme-challenge.www.alliance-pravo.ru TXT +short
```

## Если публичные DNS видят записи

Let's Encrypt использует публичные DNS серверы, поэтому сертификат можно получить даже если локальный DNS еще не обновился.

## Попробовать получить сертификат

```bash
certbot certonly --manual --preferred-challenges dns \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos
```

Когда certbot попросит добавить TXT записи:
1. Укажите, что записи уже добавлены
2. Подождите 1-2 минуты
3. Нажмите Enter

Certbot проверит записи через публичные DNS и должен найти их.


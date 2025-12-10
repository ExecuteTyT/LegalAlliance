# Исправление проблемы с доменом

## Проблема
Сайт работает по IP `95.163.227.144`, но не работает по домену `alliance-pravo.ru`.

## Диагностика

Выполните на сервере:

```bash
cd /var/www/LegalAlliance
chmod +x check-dns.sh
./check-dns.sh
```

Или вручную:

```bash
# 1. Проверить DNS записи
dig +short alliance-pravo.ru A
dig +short www.alliance-pravo.ru A

# 2. Проверить, что домен указывает на правильный IP
nslookup alliance-pravo.ru

# 3. Проверить логи nginx при запросе по домену
tail -f /var/log/nginx/legal-alliance-error.log
# В другом терминале сделать запрос:
curl -v http://alliance-pravo.ru

# 4. Проверить конфигурацию nginx
cat /etc/nginx/sites-available/legal-alliance | grep server_name
```

## Решения

### Решение 1: DNS записи не настроены

Если `dig +short alliance-pravo.ru A` возвращает пустой результат или другой IP:

1. Зайдите в панель управления доменом (где вы регистрировали `alliance-pravo.ru`)
2. Найдите настройки DNS (DNS Management / DNS Records)
3. Добавьте/измените A-запись:
   - **Тип:** A
   - **Имя:** @ (или alliance-pravo.ru)
   - **Значение:** 95.163.227.144
   - **TTL:** 3600 (или автоматически)

4. Добавьте A-запись для www:
   - **Тип:** A
   - **Имя:** www
   - **Значение:** 95.163.227.144
   - **TTL:** 3600

5. Подождите 5-30 минут для применения DNS

6. Проверьте:
```bash
dig +short alliance-pravo.ru A
# Должно вернуть: 95.163.227.144
```

### Решение 2: DNS записи настроены, но еще не применились

Если DNS записи правильные, но сайт не работает:

1. Проверьте кеш DNS на вашем компьютере:
```bash
# Windows
ipconfig /flushdns

# Linux/Mac
sudo systemd-resolve --flush-caches
# или
sudo dscacheutil -flushcache
```

2. Используйте другой DNS сервер для проверки:
```bash
# Использовать Google DNS
dig @8.8.8.8 alliance-pravo.ru A

# Использовать Cloudflare DNS
dig @1.1.1.1 alliance-pravo.ru A
```

3. Проверьте на сервере напрямую:
```bash
curl -H "Host: alliance-pravo.ru" http://localhost
```

### Решение 3: Проблема с конфигурацией nginx

Если DNS правильный, но nginx не отвечает:

1. Проверьте, что конфигурация активна:
```bash
ls -la /etc/nginx/sites-enabled/
# Должна быть ссылка на legal-alliance
```

2. Проверьте логи nginx:
```bash
tail -50 /var/log/nginx/legal-alliance-error.log
```

3. Перезагрузите nginx:
```bash
nginx -t
systemctl reload nginx
systemctl restart nginx
```

4. Проверьте, что нет конфликтующих конфигураций:
```bash
grep -r "alliance-pravo.ru" /etc/nginx/
```

### Решение 4: Проверка с другого компьютера

Если на вашем компьютере DNS еще не обновился, проверьте с другого:

1. Используйте онлайн-сервисы:
   - https://dnschecker.org/#A/alliance-pravo.ru
   - https://www.whatsmydns.net/#A/alliance-pravo.ru

2. Проверьте с мобильного интернета (другой провайдер)

## Быстрая проверка

```bash
# На сервере выполните:
cd /var/www/LegalAlliance
git pull
chmod +x check-dns.sh
./check-dns.sh
```

## После исправления DNS

Когда DNS записи применятся:

1. Проверьте сайт в браузере:
   - http://alliance-pravo.ru
   - http://www.alliance-pravo.ru

2. Проверьте API:
   - http://alliance-pravo.ru/api/health

3. Протестируйте форму отправки

4. Настройте SSL (HTTPS) с помощью Let's Encrypt:
```bash
apt-get install certbot python3-certbot-nginx
certbot --nginx -d alliance-pravo.ru -d www.alliance-pravo.ru
```


# Инструкция: Добавление TXT записей для DNS challenge

## Шаг 1: Запустить DNS challenge

```bash
certbot certonly --manual --preferred-challenges dns \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos
```

## Шаг 2: Certbot покажет две TXT записи

Пример:
```
_acme-challenge.alliance-pravo.ru. → значение1
_acme-challenge.www.alliance-pravo.ru. → значение2
```

## Шаг 3: Добавить TXT записи в панели управления доменом

1. Зайдите в панель управления доменом (reg.ru)
2. Найдите раздел "Управление записями домена" или "DNS записи"
3. Нажмите "Создать запись" или кнопку "+"
4. Выберите тип: **TXT**
5. Добавьте первую запись:
   - **Имя:** `_acme-challenge.alliance-pravo.ru` (или просто `_acme-challenge`)
   - **Значение:** (первое значение от certbot)
   - **TTL:** 3600 (или по умолчанию)
6. Сохраните
7. Добавьте вторую запись:
   - **Имя:** `_acme-challenge.www.alliance-pravo.ru` (или `_acme-challenge.www`)
   - **Значение:** (второе значение от certbot)
   - **TTL:** 3600 (или по умолчанию)
8. Сохраните

## Шаг 4: Проверить распространение DNS

```bash
# Проверить первую TXT запись
dig _acme-challenge.alliance-pravo.ru TXT +short

# Проверить вторую TXT запись
dig _acme-challenge.www.alliance-pravo.ru TXT +short

# Должны показать значения, которые вы добавили
```

## Шаг 5: Продолжить в certbot

После того, как TXT записи распространились (2-5 минут):
1. Вернитесь в терминал, где запущен certbot
2. Нажмите **Enter**
3. Certbot проверит записи и выдаст сертификат

## Если certbot был прерван

Если процесс certbot был прерван, запустите заново:

```bash
certbot certonly --manual --preferred-challenges dns \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos
```

Certbot покажет новые значения для TXT записей. Используйте новые значения!

## После получения сертификата

```bash
# Проверить сертификат
certbot certificates

# Настроить Nginx (см. SSL_FINAL_SETUP.md)
```


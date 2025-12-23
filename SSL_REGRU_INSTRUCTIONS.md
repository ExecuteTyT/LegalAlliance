# Инструкция: как правильно добавить TXT записи в reg.ru

## Проблема
TXT записи для ACME challenge не видны ни в одном DNS. Скорее всего, они добавлены с неправильным форматом имени.

## Правильный формат для reg.ru

В reg.ru при добавлении DNS записей:
- НЕ нужно указывать полное имя с доменом
- Домен добавляется автоматически

### Пример

**НЕПРАВИЛЬНО:**
- Имя: `_acme-challenge.alliance-pravo.ru`

**ПРАВИЛЬНО:**
- Имя: `_acme-challenge`

**НЕПРАВИЛЬНО:**
- Имя: `_acme-challenge.www.alliance-pravo.ru`

**ПРАВИЛЬНО:**
- Имя: `_acme-challenge.www`

## Пошаговая инструкция

### 1. Удалить старые TXT записи

Удалите текущие TXT записи с `_acme-challenge` (если они есть).

### 2. Добавить новые TXT записи с правильными именами

**Первая запись:**
- Тип: TXT
- Имя: `_acme-challenge` (БЕЗ `.alliance-pravo.ru`)
- Значение: `vIZgf4Wstkk55JggwRenZGAqJDQ1LCPrQtlGP94sNCM`
- TTL: 3600 (или оставьте по умолчанию)
- Сохраните

**Вторая запись:**
- Тип: TXT
- Имя: `_acme-challenge.www` (БЕЗ `.alliance-pravo.ru`)
- Значение: `SDWJf3R11bww1H-jzuV2NOOs17Ke5MCuOxkjqRoZr1s`
- TTL: 3600 (или оставьте по умолчанию)
- Сохраните

### 3. Подождать 2-5 минут

После добавления подождите 2-5 минут для распространения DNS.

### 4. Проверить записи

На сервере:
```bash
# Проверить через Google DNS
dig @8.8.8.8 _acme-challenge.alliance-pravo.ru TXT +short
dig @8.8.8.8 _acme-challenge.www.alliance-pravo.ru TXT +short
```

Должны показаться значения, которые вы добавили.

### 5. Продолжить с certbot

Если certbot еще запущен и ждет нажатия Enter:
1. Подождите, пока DNS распространится (проверьте командами выше)
2. Нажмите Enter

Если certbot был прерван:
```bash
certbot certonly --manual --preferred-challenges dns \
  -d alliance-pravo.ru \
  -d www.alliance-pravo.ru \
  --email info@alliance-pravo.ru \
  --agree-tos
```

Certbot покажет новые значения для TXT записей. Обновите записи в DNS с новыми значениями.

## Альтернатива: попробовать с точкой в конце

Некоторые панели требуют точку в конце:
- `_acme-challenge.`
- `_acme-challenge.www.`

Но обычно reg.ru не требует.

## Важно

Certbot генерирует новые значения каждый раз. Убедитесь, что используете последние значения:
- Для `_acme-challenge.alliance-pravo.ru` → `vIZgf4Wstkk55JggwRenZGAqJDQ1LCPrQtlGP94sNCM`
- Для `_acme-challenge.www.alliance-pravo.ru` → `SDWJf3R11bww1H-jzuV2NOOs17Ke5MCuOxkjqRoZr1s`


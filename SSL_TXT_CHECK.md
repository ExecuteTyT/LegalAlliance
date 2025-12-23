# Проверка TXT записей для ACME challenge

## Текущие значения от Certbot

**Новые значения (последний запуск):**
- `_acme-challenge.alliance-pravo.ru` → `sRi25MC8NF1PbFOysrduqcl2Tsld9cL8jAVRkyGOLsY`
- `_acme-challenge.www.alliance-pravo.ru` → `JlTk5LRICwP-vsimuxkTpe6MFvAHSJptJKDmeYJdR8Y`

## Проверка на сервере

```bash
# Проверить первую TXT запись
dig _acme-challenge.alliance-pravo.ru TXT +short

# Проверить вторую TXT запись
dig _acme-challenge.www.alliance-pravo.ru TXT +short

# Должны показать значения выше
```

## Если записи не найдены

1. Зайдите в панель управления доменом (reg.ru)
2. Убедитесь, что TXT записи добавлены правильно
3. Проверьте формат имени записи

## Важно: формат имени записи

В reg.ru может быть два варианта:
- **Вариант 1:** Имя: `_acme-challenge.alliance-pravo.ru` (полное имя с доменом)
- **Вариант 2:** Имя: `_acme-challenge` (только поддомен, домен добавляется автоматически)

Попробуйте оба варианта!


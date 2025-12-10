# Быстрое исправление nginx

Выполните на сервере:

```bash
# 1. Проверить текущую конфигурацию
cat /etc/nginx/sites-available/legal-alliance

# 2. Убедиться, что конфигурация правильная
# Если там не то, что нужно, скопируйте заново:
cd /var/www/LegalAlliance
cat nginx.conf

# 3. Удалить старую ссылку и создать новую
rm /etc/nginx/sites-enabled/legal-alliance
ln -s /etc/nginx/sites-available/legal-alliance /etc/nginx/sites-enabled/

# 4. Проверить конфигурацию
nginx -t

# 5. Перезагрузить nginx
systemctl reload nginx

# 6. Проверить работу
curl -H "Host: alliance-pravo.ru" http://localhost/api/health
curl http://localhost:3001/api/health
```

Если все еще не работает, проверьте:
- Что конфигурация nginx правильная
- Что нет конфликтующих конфигураций
- Что nginx слушает на порту 80


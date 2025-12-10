#!/bin/bash

echo "=== Проверка DNS для alliance-pravo.ru ==="
echo ""

echo "1. Проверка A-записи:"
dig +short alliance-pravo.ru A
echo ""

echo "2. Проверка A-записи для www:"
dig +short www.alliance-pravo.ru A
echo ""

echo "3. Проверка с nslookup:"
nslookup alliance-pravo.ru
echo ""

echo "4. Проверка с host:"
host alliance-pravo.ru
echo ""

echo "5. Проверка конфигурации nginx:"
nginx -t
echo ""

echo "6. Проверка активных server blocks:"
ls -la /etc/nginx/sites-enabled/
echo ""

echo "7. Проверка логов nginx (последние 20 строк):"
tail -20 /var/log/nginx/legal-alliance-error.log
echo ""

echo "8. Тест curl по домену:"
curl -I http://alliance-pravo.ru 2>&1 | head -10
echo ""

echo "9. Проверка, что домен резолвится на правильный IP:"
DOMAIN_IP=$(dig +short alliance-pravo.ru A | head -1)
SERVER_IP="95.163.227.144"
echo "IP домена: $DOMAIN_IP"
echo "IP сервера: $SERVER_IP"
if [ "$DOMAIN_IP" = "$SERVER_IP" ]; then
    echo "✓ DNS настроен правильно!"
else
    echo "✗ DNS НЕ настроен правильно! Домен указывает на $DOMAIN_IP, а должен на $SERVER_IP"
fi


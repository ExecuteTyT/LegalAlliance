#!/bin/bash

# Скрипт для диагностики: сайт работал, но перестал работать
# Использование: bash check-site-down.sh

echo "=========================================="
echo "🔍 ДИАГНОСТИКА: САЙТ ПЕРЕСТАЛ РАБОТАТЬ"
echo "=========================================="
echo ""

# 1. Проверка Nginx
echo "1️⃣  Статус Nginx:"
NGINX_STATUS=$(systemctl is-active nginx 2>/dev/null)
if [ "$NGINX_STATUS" = "active" ]; then
    echo "✅ Nginx работает"
else
    echo "❌ Nginx НЕ работает (статус: $NGINX_STATUS)"
    echo "   Попробуйте: systemctl start nginx"
fi
echo ""

# 2. Проверка конфигурации Nginx
echo "2️⃣  Проверка конфигурации Nginx:"
if nginx -t 2>&1 | grep -q "successful"; then
    echo "✅ Конфигурация Nginx валидна"
else
    echo "❌ Ошибки в конфигурации Nginx:"
    nginx -t 2>&1 | grep -i error
fi
echo ""

# 3. Проверка портов
echo "3️⃣  Проверка портов 80 и 443:"
PORT80=$(netstat -tulpn 2>/dev/null | grep ':80 ' | head -1)
PORT443=$(netstat -tulpn 2>/dev/null | grep ':443 ' | head -1)

if [ -n "$PORT80" ]; then
    echo "✅ Порт 80 слушается"
    echo "   $PORT80"
else
    echo "❌ Порт 80 НЕ слушается"
fi

if [ -n "$PORT443" ]; then
    echo "✅ Порт 443 слушается"
    echo "   $PORT443"
else
    echo "❌ Порт 443 НЕ слушается"
fi
echo ""

# 4. Проверка firewall
echo "4️⃣  Проверка Firewall (UFW):"
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(ufw status 2>/dev/null | head -1)
    echo "Статус: $UFW_STATUS"
    
    if echo "$UFW_STATUS" | grep -q "Status: active"; then
        echo "⚠️  Firewall активен - проверьте правила для портов 80 и 443"
        ufw status | grep -E '80|443' || echo "   Порты 80/443 могут быть закрыты"
    else
        echo "✅ Firewall не активен или разрешает все"
    fi
else
    echo "⚠️  UFW не установлен (может использоваться iptables)"
fi
echo ""

# 5. Проверка локальной доступности
echo "5️⃣  Проверка локальной доступности:"
HTTP_LOCAL=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 3 http://localhost 2>/dev/null)
HTTPS_LOCAL=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 3 https://localhost 2>/dev/null)

if [ "$HTTP_LOCAL" = "200" ] || [ "$HTTP_LOCAL" = "301" ] || [ "$HTTP_LOCAL" = "302" ]; then
    echo "✅ HTTP локально работает (код: $HTTP_LOCAL)"
else
    echo "❌ HTTP локально не работает (код: $HTTP_LOCAL)"
fi

if [ "$HTTPS_LOCAL" = "200" ] || [ "$HTTPS_LOCAL" = "301" ] || [ "$HTTPS_LOCAL" = "302" ]; then
    echo "✅ HTTPS локально работает (код: $HTTPS_LOCAL)"
else
    echo "❌ HTTPS локально не работает (код: $HTTPS_LOCAL)"
fi
echo ""

# 6. Проверка доступности по IP
echo "6️⃣  Проверка доступности по IP (95.163.227.144):"
HTTP_IP=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 http://95.163.227.144 2>/dev/null)
HTTPS_IP=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 https://95.163.227.144 2>/dev/null)

if [ "$HTTP_IP" = "200" ] || [ "$HTTP_IP" = "301" ] || [ "$HTTP_IP" = "302" ]; then
    echo "✅ HTTP по IP работает (код: $HTTP_IP)"
else
    echo "❌ HTTP по IP не работает (код: $HTTP_IP)"
fi

if [ "$HTTPS_IP" = "200" ] || [ "$HTTPS_IP" = "301" ] || [ "$HTTPS_IP" = "302" ]; then
    echo "✅ HTTPS по IP работает (код: $HTTPS_IP)"
else
    echo "❌ HTTPS по IP не работает (код: $HTTPS_IP)"
fi
echo ""

# 7. Проверка SSL сертификата
echo "7️⃣  Проверка SSL сертификата:"
if command -v certbot &> /dev/null; then
    CERT_INFO=$(certbot certificates 2>/dev/null | grep -A 5 "alliance-pravo.ru" | head -10)
    if [ -n "$CERT_INFO" ]; then
        echo "Информация о сертификате:"
        echo "$CERT_INFO"
        
        # Проверить срок действия
        CERT_EXPIRY=$(echo "$CERT_INFO" | grep "Expiry Date" || echo "")
        if [ -n "$CERT_EXPIRY" ]; then
            echo "$CERT_EXPIRY"
        fi
    else
        echo "⚠️  Сертификат для alliance-pravo.ru не найден"
    fi
else
    echo "⚠️  certbot не установлен"
fi
echo ""

# 8. Проверка последних ошибок Nginx
echo "8️⃣  Последние ошибки Nginx (10 строк):"
if [ -f "/var/log/nginx/legal-alliance-error.log" ]; then
    ERROR_COUNT=$(tail -10 /var/log/nginx/legal-alliance-error.log | wc -l)
    if [ "$ERROR_COUNT" -gt 0 ]; then
        echo "Последние ошибки:"
        tail -10 /var/log/nginx/legal-alliance-error.log | grep -i error || tail -10 /var/log/nginx/legal-alliance-error.log
    else
        echo "✅ Ошибок в логах не найдено"
    fi
else
    echo "⚠️  Файл логов не найден"
fi
echo ""

# 9. Проверка DNS резолвинга
echo "9️⃣  Проверка DNS резолвинга:"
DNS_RESULT=$(dig +short alliance-pravo.ru A 2>/dev/null)
if [ "$DNS_RESULT" = "95.163.227.144" ]; then
    echo "✅ DNS резолвится правильно: $DNS_RESULT"
else
    echo "❌ DNS резолвится неправильно: $DNS_RESULT (ожидалось: 95.163.227.144)"
fi
echo ""

# 10. Проверка Node.js приложения
echo "🔟 Проверка Node.js приложения:"
if command -v pm2 &> /dev/null; then
    PM2_STATUS=$(pm2 jlist 2>/dev/null | grep -o '"status":"[^"]*"' | head -1)
    if echo "$PM2_STATUS" | grep -q "online"; then
        echo "✅ PM2 приложение работает"
    else
        echo "❌ PM2 приложение не работает: $PM2_STATUS"
    fi
else
    echo "⚠️  PM2 не установлен"
fi
echo ""

# 11. Проверка текущего IP сервера
echo "1️⃣1️⃣  Текущий IP сервера:"
CURRENT_IP=$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')
echo "Текущий IP: $CURRENT_IP"
if [ "$CURRENT_IP" = "95.163.227.144" ]; then
    echo "✅ IP совпадает с DNS записью"
else
    echo "⚠️  IP не совпадает с DNS записью (95.163.227.144)"
    echo "   Возможно, IP сервера изменился"
fi
echo ""

echo "=========================================="
echo "✅ Диагностика завершена"
echo "=========================================="
echo ""
echo "💡 Рекомендации:"
echo "   1. Если Nginx не работает: systemctl start nginx"
echo "   2. Если порты не слушаются: проверьте конфигурацию Nginx"
echo "   3. Если firewall блокирует: ufw allow 80/tcp && ufw allow 443/tcp"
echo "   4. Если SSL истек: certbot renew && systemctl reload nginx"
echo "   5. Проверьте логи: tail -50 /var/log/nginx/legal-alliance-error.log"
echo ""


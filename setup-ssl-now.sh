#!/bin/bash

# Скрипт для быстрой настройки SSL
# Использование: bash setup-ssl-now.sh

set -e

DOMAIN="alliance-pravo.ru"
NGINX_CONFIG="/etc/nginx/sites-available/legal-alliance"
PROJECT_DIR="/var/www/LegalAlliance"

echo "=========================================="
echo "🔧 НАСТРОЙКА SSL ДЛЯ $DOMAIN"
echo "=========================================="
echo ""

# 1. Проверить, установлен ли certbot
echo "1️⃣  Проверка certbot..."
if ! command -v certbot &> /dev/null; then
    echo "⚠️  certbot не установлен, устанавливаю..."
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
    echo "✅ certbot установлен"
else
    echo "✅ certbot установлен"
fi
echo ""

# 2. Проверить наличие сертификата
echo "2️⃣  Проверка существующего сертификата..."
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "✅ Сертификат найден: /etc/letsencrypt/live/$DOMAIN/fullchain.pem"
    CERT_EXISTS=true
else
    echo "❌ Сертификат не найден"
    CERT_EXISTS=false
fi
echo ""

# 3. Применить HTTP конфигурацию (для получения сертификата)
if [ "$CERT_EXISTS" = false ]; then
    echo "3️⃣  Применение HTTP конфигурации (для получения сертификата)..."
    cp "$PROJECT_DIR/nginx.conf" "$NGINX_CONFIG"
    
    # Проверить конфигурацию
    if nginx -t 2>&1 | grep -q "successful"; then
        echo "✅ Конфигурация валидна"
        systemctl reload nginx
        echo "✅ Nginx перезагружен"
    else
        echo "❌ Ошибка в конфигурации Nginx:"
        nginx -t
        exit 1
    fi
    echo ""
fi

# 4. Получить или обновить сертификат
if [ "$CERT_EXISTS" = false ]; then
    echo "4️⃣  Получение SSL сертификата..."
    echo "   Это может занять несколько минут..."
    
    # Получить сертификат
    if certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email info@alliance-pravo.ru 2>&1; then
        echo "✅ SSL сертификат получен"
    else
        echo "❌ Ошибка при получении сертификата"
        echo "   Проверьте:"
        echo "   - Доступность порта 80 извне"
        echo "   - Правильность DNS записей"
        echo "   - Логи: tail -50 /var/log/nginx/legal-alliance-error.log"
        exit 1
    fi
else
    echo "4️⃣  Обновление существующего сертификата..."
    certbot renew --quiet
    echo "✅ Сертификат обновлен (если нужно)"
fi
echo ""

# 5. Проверить конфигурацию после certbot
echo "5️⃣  Проверка конфигурации после certbot..."
if nginx -t 2>&1 | grep -q "successful"; then
    echo "✅ Конфигурация валидна"
    systemctl reload nginx
    echo "✅ Nginx перезагружен"
else
    echo "❌ Ошибка в конфигурации Nginx:"
    nginx -t
    exit 1
fi
echo ""

# 6. Проверка работы HTTPS
echo "6️⃣  Проверка работы HTTPS..."
sleep 2

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 http://localhost 2>/dev/null)
HTTPS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 https://localhost 2>/dev/null)

if [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ HTTP работает (редирект на HTTPS): код $HTTP_CODE"
else
    echo "⚠️  HTTP вернул код: $HTTP_CODE"
fi

if [ "$HTTPS_CODE" = "200" ] || [ "$HTTPS_CODE" = "301" ] || [ "$HTTPS_CODE" = "302" ]; then
    echo "✅ HTTPS работает: код $HTTPS_CODE"
else
    echo "❌ HTTPS не работает: код $HTTPS_CODE"
    echo "   Проверьте логи: tail -50 /var/log/nginx/legal-alliance-error.log"
fi
echo ""

# 7. Информация о сертификате
echo "7️⃣  Информация о сертификате:"
certbot certificates 2>/dev/null | grep -A 10 "$DOMAIN" || echo "⚠️  Информация о сертификате недоступна"
echo ""

echo "=========================================="
echo "✅ Настройка SSL завершена"
echo "=========================================="
echo ""
echo "💡 Проверьте в браузере:"
echo "   http://$DOMAIN  (должен редиректить на HTTPS)"
echo "   https://$DOMAIN (должен открываться)"
echo ""
echo "📋 Полезные команды:"
echo "   certbot certificates          - информация о сертификатах"
echo "   certbot renew                 - обновить сертификаты"
echo "   systemctl status nginx        - статус Nginx"
echo "   tail -f /var/log/nginx/legal-alliance-error.log - логи ошибок"
echo ""


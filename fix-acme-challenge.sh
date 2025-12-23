#!/bin/bash

# Скрипт для исправления проблемы с ACME challenge
# Использование: bash fix-acme-challenge.sh

set -e

echo "=========================================="
echo "🔧 ИСПРАВЛЕНИЕ ACME CHALLENGE"
echo "=========================================="
echo ""

# 1. Создать директорию для ACME challenge
echo "1️⃣  Создание директории для ACME challenge..."
mkdir -p /var/www/certbot
chmod 755 /var/www/certbot
echo "✅ Директория создана: /var/www/certbot"
echo ""

# 2. Проверить текущую конфигурацию Nginx
echo "2️⃣  Проверка конфигурации Nginx..."
if grep -q "/.well-known/acme-challenge/" /etc/nginx/sites-available/legal-alliance; then
    echo "✅ ACME challenge location найден в конфигурации"
else
    echo "⚠️  ACME challenge location не найден, добавляю..."
    
    # Создать временный файл с правильной конфигурацией
    cat > /tmp/nginx-acme-fix.conf << 'EOF'
    # ACME challenge для Let's Encrypt (должен быть ПЕРЕД другими location)
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files $uri =404;
        allow all;
    }
EOF
    
    echo "Добавьте этот блок в начало секции server (перед другими location):"
    cat /tmp/nginx-acme-fix.conf
fi
echo ""

# 3. Проверить доступность директории
echo "3️⃣  Проверка доступности директории..."
if [ -d "/var/www/certbot" ] && [ -r "/var/www/certbot" ]; then
    echo "✅ Директория существует и доступна для чтения"
    
    # Создать тестовый файл
    echo "test" > /var/www/certbot/test.txt
    chmod 644 /var/www/certbot/test.txt
    
    # Проверить доступность через HTTP
    TEST_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/.well-known/acme-challenge/test.txt 2>/dev/null || echo "000")
    
    if [ "$TEST_RESPONSE" = "200" ]; then
        echo "✅ ACME challenge доступен через HTTP"
        rm -f /var/www/certbot/test.txt
    else
        echo "❌ ACME challenge недоступен через HTTP (код: $TEST_RESPONSE)"
        echo "   Проверьте конфигурацию Nginx"
    fi
else
    echo "❌ Директория не существует или недоступна"
fi
echo ""

# 4. Проверить IPv6
echo "4️⃣  Проверка IPv6..."
IPV6_ENABLED=$(ip -6 addr show | grep -q "inet6" && echo "yes" || echo "no")
if [ "$IPV6_ENABLED" = "yes" ]; then
    echo "⚠️  IPv6 включен на сервере"
    echo "   Let's Encrypt может обращаться по IPv6"
    echo "   Убедитесь, что Nginx слушает IPv6 правильно"
else
    echo "✅ IPv6 не включен"
fi
echo ""

# 5. Проверить, что Nginx слушает IPv6
echo "5️⃣  Проверка прослушивания IPv6 в Nginx..."
if netstat -tulpn 2>/dev/null | grep -q ":::80"; then
    echo "✅ Nginx слушает IPv6 на порту 80"
else
    echo "⚠️  Nginx не слушает IPv6 на порту 80"
    echo "   Проверьте конфигурацию: listen [::]:80;"
fi
echo ""

# 6. Тест доступности ACME challenge извне
echo "6️⃣  Тест доступности ACME challenge..."
echo "test-acme-$(date +%s)" > /var/www/certbot/test-acme.txt
chmod 644 /var/www/certbot/test-acme.txt

# Попробовать получить через HTTP
HTTP_TEST=$(curl -s -o /dev/null -w "%{http_code}" http://alliance-pravo.ru/.well-known/acme-challenge/test-acme.txt 2>/dev/null || echo "000")
if [ "$HTTP_TEST" = "200" ]; then
    echo "✅ ACME challenge доступен извне через HTTP"
else
    echo "❌ ACME challenge недоступен извне (код: $HTTP_TEST)"
    echo "   Это может быть причиной ошибки certbot"
fi

rm -f /var/www/certbot/test-acme.txt
echo ""

# 7. Рекомендации
echo "=========================================="
echo "💡 РЕКОМЕНДАЦИИ"
echo "=========================================="
echo ""
echo "Если ACME challenge недоступен, попробуйте:"
echo ""
echo "1. Использовать DNS challenge вместо HTTP:"
echo "   certbot certonly --manual --preferred-challenges dns -d alliance-pravo.ru -d www.alliance-pravo.ru"
echo ""
echo "2. Или временно отключить IPv6 для certbot:"
echo "   certbot certonly --nginx -d alliance-pravo.ru -d www.alliance-pravo.ru --preferred-challenges http"
echo ""
echo "3. Проверить логи Nginx:"
echo "   tail -50 /var/log/nginx/legal-alliance-error.log"
echo ""
echo "4. Проверить логи certbot:"
echo "   tail -50 /var/log/letsencrypt/letsencrypt.log"
echo ""


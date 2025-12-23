#!/bin/bash

# Скрипт для проверки DNS настроек на сервере
# Использование: bash check-dns-server.sh

echo "=========================================="
echo "🔍 ПРОВЕРКА DNS НАСТРОЕК"
echo "=========================================="
echo ""

DOMAIN="alliance-pravo.ru"
EXPECTED_IP="95.163.227.144"

echo "Домен: $DOMAIN"
echo "Ожидаемый IP: $EXPECTED_IP"
echo ""

# 1. Проверка через nslookup
echo "1️⃣  Проверка через nslookup:"
if command -v nslookup &> /dev/null; then
    NSLOOKUP_RESULT=$(nslookup $DOMAIN 2>&1)
    echo "$NSLOOKUP_RESULT"
    
    if echo "$NSLOOKUP_RESULT" | grep -q "$EXPECTED_IP"; then
        echo "✅ DNS запись найдена и указывает на правильный IP"
    else
        echo "❌ DNS запись не найдена или указывает на другой IP"
    fi
else
    echo "⚠️  nslookup не установлен"
fi
echo ""

# 2. Проверка через dig
echo "2️⃣  Проверка через dig:"
if command -v dig &> /dev/null; then
    DIG_RESULT=$(dig +short $DOMAIN A)
    echo "Результат: $DIG_RESULT"
    
    if [ "$DIG_RESULT" = "$EXPECTED_IP" ]; then
        echo "✅ DNS запись правильная"
    else
        echo "❌ DNS запись неверная или отсутствует"
        echo "   Ожидалось: $EXPECTED_IP"
        echo "   Получено: $DIG_RESULT"
    fi
    
    # Полная информация
    echo ""
    echo "Полная информация:"
    dig $DOMAIN A +noall +answer
else
    echo "⚠️  dig не установлен"
fi
echo ""

# 3. Проверка через host
echo "3️⃣  Проверка через host:"
if command -v host &> /dev/null; then
    HOST_RESULT=$(host $DOMAIN 2>&1)
    echo "$HOST_RESULT"
    
    if echo "$HOST_RESULT" | grep -q "$EXPECTED_IP"; then
        echo "✅ DNS запись найдена"
    else
        echo "❌ DNS запись не найдена"
    fi
else
    echo "⚠️  host не установлен"
fi
echo ""

# 4. Проверка www поддомена
echo "4️⃣  Проверка www.alliance-pravo.ru:"
if command -v dig &> /dev/null; then
    WWW_RESULT=$(dig +short www.$DOMAIN A)
    echo "Результат: $WWW_RESULT"
    
    if [ "$WWW_RESULT" = "$EXPECTED_IP" ]; then
        echo "✅ www поддомен настроен правильно"
    else
        echo "❌ www поддомен не настроен или указывает на другой IP"
    fi
else
    echo "⚠️  dig не установлен"
fi
echo ""

# 5. Проверка через внешние DNS серверы
echo "5️⃣  Проверка через Google DNS (8.8.8.8):"
if command -v dig &> /dev/null; then
    GOOGLE_DNS=$(dig @8.8.8.8 +short $DOMAIN A)
    echo "Результат: $GOOGLE_DNS"
    
    if [ "$GOOGLE_DNS" = "$EXPECTED_IP" ]; then
        echo "✅ Google DNS видит правильный IP"
    else
        echo "❌ Google DNS видит другой IP или не видит запись"
        echo "   Это нормально, если DNS только что изменили (нужно время на распространение)"
    fi
else
    echo "⚠️  dig не установлен"
fi
echo ""

# 6. Проверка доступности сервера по IP
echo "6️⃣  Проверка доступности сервера по IP:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 http://$EXPECTED_IP 2>/dev/null)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ Сервер доступен по IP (HTTP $HTTP_CODE)"
else
    echo "❌ Сервер не отвечает по IP (HTTP $HTTP_CODE)"
    echo "   Проверьте, что Nginx запущен и слушает порт 80"
fi
echo ""

# 7. Проверка локального сервера
echo "7️⃣  Проверка локального сервера:"
LOCAL_HEALTH=$(curl -s --connect-timeout 2 http://localhost:3001/api/health 2>/dev/null)
if [ -n "$LOCAL_HEALTH" ]; then
    echo "✅ Локальный сервер отвечает"
    echo "   Ответ: $LOCAL_HEALTH"
else
    echo "❌ Локальный сервер не отвечает"
fi
echo ""

echo "=========================================="
echo "✅ Проверка завершена"
echo "=========================================="
echo ""
echo "💡 Если DNS записи неверные:"
echo "   1. Зайдите в панель управления доменом"
echo "   2. Найдите раздел DNS или DNS-зона"
echo "   3. Добавьте A-запись: @ → $EXPECTED_IP"
echo "   4. Добавьте A-запись: www → $EXPECTED_IP"
echo "   5. Подождите 15-60 минут для распространения"
echo ""


#!/bin/bash

# Быстрая диагностика сайта - выполнить на сервере
# Использование: bash QUICK_CHECK.sh

echo "=========================================="
echo "🔍 БЫСТРАЯ ДИАГНОСТИКА САЙТА"
echo "=========================================="
echo ""

# 1. PM2 Status
echo "1️⃣  PM2 Status:"
pm2 status
echo ""

# 2. Nginx Status
echo "2️⃣  Nginx Status:"
systemctl status nginx --no-pager -l | head -10
echo ""

# 3. Ports
echo "3️⃣  Проверка портов:"
echo "Порт 3001 (Node.js):"
netstat -tulpn 2>/dev/null | grep :3001 || echo "❌ Порт 3001 не слушается"
echo "Порт 80 (HTTP):"
netstat -tulpn 2>/dev/null | grep :80 || echo "❌ Порт 80 не слушается"
echo "Порт 443 (HTTPS):"
netstat -tulpn 2>/dev/null | grep :443 || echo "❌ Порт 443 не слушается"
echo ""

# 4. Dist folder
echo "4️⃣  Проверка dist папки:"
if [ -d "/var/www/LegalAlliance/dist" ]; then
    echo "✅ Папка dist существует"
    echo "   Файлов в dist: $(ls -1 /var/www/LegalAlliance/dist 2>/dev/null | wc -l)"
else
    echo "❌ Папка dist НЕ существует!"
fi
echo ""

# 5. Health check
echo "5️⃣  Health Check (localhost:3001):"
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/health 2>/dev/null)
if [ "$HEALTH" = "200" ]; then
    echo "✅ Сервер отвечает (HTTP $HEALTH)"
    curl -s http://localhost:3001/api/health | head -3
else
    echo "❌ Сервер НЕ отвечает (HTTP $HEALTH)"
fi
echo ""

# 6. PM2 Errors
echo "6️⃣  Последние ошибки PM2 (5 строк):"
pm2 logs legal-alliance --err --lines 5 --nostream 2>/dev/null || echo "⚠️  Не удалось получить логи"
echo ""

# 7. Nginx Errors
echo "7️⃣  Последние ошибки Nginx (5 строк):"
tail -5 /var/log/nginx/legal-alliance-error.log 2>/dev/null || echo "⚠️  Логи недоступны"
echo ""

# 8. Resources
echo "8️⃣  Использование ресурсов:"
echo "Память:"
free -h | grep Mem
echo "Диск:"
df -h / | tail -1
echo ""

# 9. .env file
echo "9️⃣  Проверка .env файла:"
if [ -f "/var/www/LegalAlliance/.env" ]; then
    echo "✅ Файл .env существует"
    echo "   Переменных: $(grep -c '=' /var/www/LegalAlliance/.env 2>/dev/null || echo 0)"
else
    echo "❌ Файл .env НЕ существует!"
fi
echo ""

# 10. Nginx config
echo "🔟 Проверка конфигурации Nginx:"
if nginx -t 2>&1 | grep -q "successful"; then
    echo "✅ Конфигурация Nginx валидна"
else
    echo "❌ Ошибки в конфигурации Nginx:"
    nginx -t 2>&1 | grep -i error
fi
echo ""

echo "=========================================="
echo "✅ Диагностика завершена"
echo "=========================================="
echo ""
echo "💡 Если есть проблемы, смотрите SERVER_TROUBLESHOOTING.md"
echo ""


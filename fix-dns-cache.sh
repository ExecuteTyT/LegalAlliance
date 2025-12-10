#!/bin/bash

echo "=== Исправление проблемы с DNS кешем ==="
echo ""

echo "1. Проверка с разных DNS серверов:"
echo ""
echo "Google DNS (8.8.8.8):"
dig @8.8.8.8 +short alliance-pravo.ru A
echo ""
echo "Cloudflare DNS (1.1.1.1):"
dig @1.1.1.1 +short alliance-pravo.ru A
echo ""
echo "Локальный DNS сервер:"
dig +short alliance-pravo.ru A
echo ""

echo "2. Очистка кеша systemd-resolved (если используется):"
systemd-resolve --flush-caches 2>/dev/null && echo "✓ Кеш очищен" || echo "✗ systemd-resolve не используется"
echo ""

echo "3. Перезапуск systemd-resolved (если используется):"
systemctl restart systemd-resolved 2>/dev/null && echo "✓ systemd-resolved перезапущен" || echo "✗ systemd-resolved не используется"
echo ""

echo "4. Проверка после очистки:"
sleep 2
dig +short alliance-pravo.ru A
echo ""

echo "5. Проверка напрямую через nginx с правильным Host:"
curl -H "Host: alliance-pravo.ru" http://localhost/api/health
echo ""
echo ""

echo "=== Рекомендации ==="
echo ""
echo "Если DNS все еще указывает на старый IP (31.31.196.76):"
echo "1. Подождите 5-30 минут для распространения DNS"
echo "2. Проверьте онлайн: https://dnschecker.org/#A/alliance-pravo.ru"
echo "3. Если через 1-2 часа все еще не работает, проверьте настройки DNS в панели"
echo ""
echo "Временное решение - использовать IP напрямую:"
echo "http://95.163.227.144"
echo ""


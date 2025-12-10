#!/bin/bash

# Скрипт автоматического деплоя на VPS
# Использование: ./deploy.sh

set -e

echo "🚀 Начало деплоя проекта Правовой Альянс..."

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка Node.js
echo -e "${YELLOW}📦 Проверка Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js не установлен. Устанавливаю...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Проверка PM2
echo -e "${YELLOW}📦 Проверка PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Устанавливаю PM2...${NC}"
    npm install -g pm2
fi
echo -e "${GREEN}✅ PM2 установлен${NC}"

# Проверка Git
echo -e "${YELLOW}📦 Проверка Git...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}Устанавливаю Git...${NC}"
    apt-get install -y git
fi
echo -e "${GREEN}✅ Git установлен${NC}"

# Создание директории
PROJECT_DIR="/var/www/LegalAlliance"
echo -e "${YELLOW}📁 Работа с директорией проекта...${NC}"

if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}Обновляю репозиторий...${NC}"
    cd "$PROJECT_DIR"
    git pull origin main
else
    echo -e "${YELLOW}Клонирую репозиторий...${NC}"
    mkdir -p /var/www
    cd /var/www
    git clone https://github.com/ExecuteTyT/LegalAlliance.git
    cd "$PROJECT_DIR"
fi

# Установка зависимостей
echo -e "${YELLOW}📦 Устанавливаю зависимости...${NC}"
npm install

# Проверка .env файла
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Файл .env не найден. Создаю из .env.example...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${RED}⚠️  ВАЖНО: Отредактируйте файл .env и добавьте реальные значения!${NC}"
        echo -e "${YELLOW}Нажмите Enter после редактирования .env файла...${NC}"
        read
    else
        echo -e "${RED}❌ Файл .env.example не найден!${NC}"
        exit 1
    fi
fi

# Сборка проекта
echo -e "${YELLOW}🔨 Собираю проект...${NC}"
npm run build

# Создание папки для логов
mkdir -p logs

# Остановка старого процесса (если запущен)
if pm2 list | grep -q "legal-alliance"; then
    echo -e "${YELLOW}🛑 Останавливаю старый процесс...${NC}"
    pm2 stop legal-alliance || true
    pm2 delete legal-alliance || true
fi

# Запуск через PM2
echo -e "${YELLOW}🚀 Запускаю приложение через PM2...${NC}"
pm2 start ecosystem.config.js
pm2 save

# Настройка автозапуска
echo -e "${YELLOW}⚙️  Настраиваю автозапуск...${NC}"
pm2 startup | grep -v "PM2" | bash || true

echo -e "${GREEN}✅ Деплой завершен!${NC}"
echo -e "${GREEN}📊 Статус:${NC}"
pm2 status

echo -e "${YELLOW}📝 Следующие шаги:${NC}"
echo "1. Настройте nginx (см. DEPLOY_VPS.md)"
echo "2. Проверьте работу: pm2 logs legal-alliance"
echo "3. Проверьте API: curl http://localhost:3001/api/health"


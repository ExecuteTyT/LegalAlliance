// КАЛЬКУЛЯТОР ВОЗВРАТА НАВЯЗАННЫХ УСЛУГ
// Формула: Общая сумма возврата = навязанная сумма × 1.5-2
// Из неё: 60% клиенту, 40% юридической компании

class ReturnCalculator {
    constructor() {
        this.MULTIPLIER_MIN = 1.5;  // Минимальный коэффициент возврата
        this.MULTIPLIER_MAX = 2.0;  // Максимальный коэффициент возврата
        this.COMPANY_COMMISSION = 0.40; // 40% комиссия компании
        this.CLIENT_SHARE = 0.60; // 60% получает клиент
    }

    /**
     * Основной расчет возврата
     * @param {number} imposedAmount - Сумма навязанных услуг
     * @param {string} loanType - Тип кредита ('consumer', 'auto', 'mortgage')
     * @param {boolean} earlyRepayment - Досрочное погашение
     * @param {number} monthsSinceIssue - Месяцев с момента оформления
     * @returns {object} Результат расчета
     */
    calculate(imposedAmount, loanType = 'consumer', earlyRepayment = false, monthsSinceIssue = 12) {
        // Валидация
        if (!imposedAmount || imposedAmount <= 0) {
            return {
                error: true,
                message: 'Укажите корректную сумму навязанных услуг'
            };
        }

        // Определение коэффициента возврата в зависимости от условий
        let multiplier = this.calculateMultiplier(loanType, earlyRepayment, monthsSinceIssue);

        // Общая сумма, которую вернет банк
        const totalReturn = Math.round(imposedAmount * multiplier);

        // Сумма клиенту (60%)
        const clientAmount = Math.round(totalReturn * this.CLIENT_SHARE);

        // Комиссия компании (40%)
        const companyCommission = Math.round(totalReturn * this.COMPANY_COMMISSION);

        // Процент возврата от навязанной суммы
        const returnPercentage = Math.round((clientAmount / imposedAmount) * 100);

        return {
            error: false,
            imposedAmount: imposedAmount,
            totalReturn: totalReturn,
            clientAmount: clientAmount,
            companyCommission: companyCommission,
            returnPercentage: returnPercentage,
            multiplier: multiplier,
            breakdown: this.getBreakdown(imposedAmount, totalReturn, clientAmount, companyCommission),
            estimatedDays: this.estimateDays(loanType)
        };
    }

    /**
     * Расчет коэффициента возврата
     */
    calculateMultiplier(loanType, earlyRepayment, monthsSinceIssue) {
        let multiplier = 1.7; // Базовый коэффициент

        // Увеличиваем коэффициент в зависимости от типа кредита
        switch(loanType) {
            case 'auto':
                multiplier = 1.8; // Автокредиты обычно возвращают больше
                break;
            case 'consumer':
                multiplier = 1.7;
                break;
            case 'mortgage':
                multiplier = 1.6; // Ипотека обычно чуть меньше
                break;
        }

        // Досрочное погашение увеличивает возврат
        if (earlyRepayment) {
            multiplier += 0.2;
        }

        // Чем раньше обратились, тем больше можно вернуть
        if (monthsSinceIssue <= 6) {
            multiplier += 0.1;
        } else if (monthsSinceIssue <= 12) {
            multiplier += 0.05;
        }

        // Ограничиваем диапазон
        multiplier = Math.max(this.MULTIPLIER_MIN, Math.min(this.MULTIPLIER_MAX, multiplier));

        return multiplier;
    }

    /**
     * Детальная разбивка возврата
     */
    getBreakdown(imposed, total, client, commission) {
        // Расчет составляющих общей суммы
        const penalty = Math.round(imposed * 0.3); // ~30% неустойка
        const interest = Math.round(imposed * 0.2); // ~20% проценты
        const compensation = Math.round(imposed * 0.2); // ~20% компенсация
        const baseReturn = imposed; // Основная сумма

        return {
            baseReturn: baseReturn,        // Основная навязанная сумма
            penalty: penalty,              // Неустойка
            interest: interest,            // Проценты
            compensation: compensation     // Компенсация морального вреда
        };
    }

    /**
     * Оценка времени возврата
     */
    estimateDays(loanType) {
        const estimates = {
            'consumer': { min: 14, max: 30 },
            'auto': { min: 20, max: 35 },
            'mortgage': { min: 25, max: 40 }
        };

        return estimates[loanType] || { min: 14, max: 30 };
    }

    /**
     * Форматирование числа в денежный формат
     */
    formatMoney(amount) {
        return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
    }
}

// ====================
// HTML ИНТЕГРАЦИЯ
// ====================

document.addEventListener('DOMContentLoaded', function() {
    const calculator = new ReturnCalculator();
    
    // Элементы формы
    const form = document.getElementById('calculator-form');
    const imposedAmountInput = document.getElementById('imposed-amount');
    const loanTypeInputs = document.querySelectorAll('input[name="loan-type"]');
    const earlyRepaymentInputs = document.querySelectorAll('input[name="early-repayment"]');
    const loanDateInput = document.getElementById('loan-date');
    const calculateBtn = document.getElementById('calculate-btn');
    
    // Элементы результата
    const resultSection = document.getElementById('result-section');
    const totalReturnEl = document.getElementById('total-return');
    const clientAmountEl = document.getElementById('client-amount');
    const companyCommissionEl = document.getElementById('company-commission');
    const breakdownEl = document.getElementById('breakdown');
    const daysEstimateEl = document.getElementById('days-estimate');
    const imposedDisplayEl = document.getElementById('imposed-display');

    // Маска для суммы (добавляет пробелы между тысячами)
    imposedAmountInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    });

    // Обработчик расчета
    calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Получение данных формы
        const imposedAmount = parseInt(imposedAmountInput.value.replace(/\s/g, ''));
        const loanType = document.querySelector('input[name="loan-type"]:checked')?.value || 'consumer';
        const earlyRepayment = document.querySelector('input[name="early-repayment"]:checked')?.value === 'yes';
        
        // Расчет месяцев с момента оформления
        let monthsSinceIssue = 12;
        if (loanDateInput.value) {
            const loanDate = new Date(loanDateInput.value);
            const now = new Date();
            monthsSinceIssue = Math.round((now - loanDate) / (1000 * 60 * 60 * 24 * 30));
        }

        // Выполнение расчета
        const result = calculator.calculate(imposedAmount, loanType, earlyRepayment, monthsSinceIssue);

        if (result.error) {
            alert(result.message);
            return;
        }

        // Отображение результата
        displayResult(result);
        
        // Прокрутка к результату
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    function displayResult(result) {
        // Показываем секцию результата
        resultSection.style.display = 'block';
        resultSection.classList.add('animate-fade-in');

        // Заполняем данные
        imposedDisplayEl.textContent = calculator.formatMoney(result.imposedAmount);
        totalReturnEl.textContent = calculator.formatMoney(result.totalReturn);
        clientAmountEl.textContent = calculator.formatMoney(result.clientAmount);
        companyCommissionEl.textContent = calculator.formatMoney(result.companyCommission);
        
        // Детализация возврата
        breakdownEl.innerHTML = `
            <div class="breakdown-item">
                <span class="breakdown-label">Основная сумма возврата:</span>
                <span class="breakdown-value">${calculator.formatMoney(result.breakdown.baseReturn)}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">+ Неустойка за нарушение прав:</span>
                <span class="breakdown-value">${calculator.formatMoney(result.breakdown.penalty)}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">+ Проценты за пользование:</span>
                <span class="breakdown-value">${calculator.formatMoney(result.breakdown.interest)}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">+ Компенсация морального вреда:</span>
                <span class="breakdown-value">${calculator.formatMoney(result.breakdown.compensation)}</span>
            </div>
        `;

        // Срок возврата
        daysEstimateEl.textContent = `${result.estimatedDays.min}-${result.estimatedDays.max} дней`;

        // Анимация цифр (опционально)
        animateNumber(clientAmountEl, 0, result.clientAmount, 1500);
    }

    // Анимация появления чисел
    function animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = calculator.formatMoney(Math.round(current));
        }, 16);
    }
});

// ====================
// CSS для анимаций
// ====================

const styles = `
<style>
.animate-fade-in {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

#result-section {
    display: none;
    margin-top: 30px;
    padding: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    color: white;
}

.breakdown-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

.breakdown-label {
    font-weight: 400;
}

.breakdown-value {
    font-weight: 700;
}
</style>
`;

// ====================
// HTML СТРУКТУРА
// ====================

const calculatorHTML = `
<div id="calculator-container" class="calculator-container">
    <form id="calculator-form" class="calculator-form">
        <div class="form-group">
            <label for="imposed-amount">Сумма навязанных услуг/страховок: *</label>
            <input 
                type="text" 
                id="imposed-amount" 
                name="imposed-amount" 
                placeholder="Например: 100 000"
                required
            >
            <small class="hint">Посмотрите в кредитном договоре раздел "Дополнительные услуги"</small>
        </div>

        <div class="form-group">
            <label>Тип кредита:</label>
            <div class="radio-group">
                <label>
                    <input type="radio" name="loan-type" value="consumer" checked>
                    <span>Потребительский кредит</span>
                </label>
                <label>
                    <input type="radio" name="loan-type" value="auto">
                    <span>Автокредит</span>
                </label>
                <label>
                    <input type="radio" name="loan-type" value="mortgage">
                    <span>Ипотека</span>
                </label>
            </div>
        </div>

        <div class="form-group">
            <label for="loan-date">Дата оформления кредита:</label>
            <input 
                type="date" 
                id="loan-date" 
                name="loan-date"
            >
        </div>

        <div class="form-group">
            <label>Досрочно погасили кредит?</label>
            <div class="radio-group">
                <label>
                    <input type="radio" name="early-repayment" value="yes">
                    <span>Да</span>
                </label>
                <label>
                    <input type="radio" name="early-repayment" value="no" checked>
                    <span>Нет</span>
                </label>
                <label>
                    <input type="radio" name="early-repayment" value="partial">
                    <span>Частично</span>
                </label>
            </div>
        </div>

        <button type="button" id="calculate-btn" class="btn-calculate">
            РАССЧИТАТЬ МОЙ ВОЗВРАТ
        </button>
    </form>

    <!-- РЕЗУЛЬТАТ -->
    <div id="result-section" class="result-section">
        <div class="result-header">
            <h2>🎉 ОТЛИЧНАЯ НОВОСТЬ!</h2>
            <p>Вы можете вернуть примерно:</p>
        </div>

        <div class="result-total">
            <div class="result-total-amount" id="total-return">0 ₽</div>
            <p class="result-subtitle">Общая сумма возврата от банка</p>
        </div>

        <div class="result-breakdown">
            <h3>Из них:</h3>
            
            <div class="result-row highlight">
                <span class="result-label">💰 Вы получите на руки:</span>
                <span class="result-value" id="client-amount">0 ₽</span>
            </div>

            <div class="result-row">
                <span class="result-label">💼 Наш гонорар за работу:</span>
                <span class="result-value" id="company-commission">0 ₽</span>
            </div>
        </div>

        <div class="result-explanation">
            <p><strong>Как это работает:</strong></p>
            <p>При сумме навязанных услуг <strong id="imposed-display">0 ₽</strong>, банк обязан вернуть вам примерно <strong id="total-return-2">0 ₽</strong> (включая неустойку, проценты и компенсацию морального вреда по решению суда).</p>
            
            <div id="breakdown" class="breakdown-details"></div>

            <p class="estimate-time">⏱️ Срок возврата: <strong id="days-estimate">14-30 дней</strong></p>
        </div>

        <div class="result-cta">
            <p class="cta-text">Хотите узнать <strong>точную сумму</strong>?</p>
            <p>Укажите контакты, и мы проведем детальный анализ вашего договора <strong>БЕСПЛАТНО</strong></p>
            
            <form id="contact-form" class="contact-form">
                <input type="text" name="name" placeholder="Ваше имя" required>
                <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required>
                <input type="email" name="email" placeholder="Email (необязательно)">
                
                <label class="checkbox-label">
                    <input type="checkbox" required>
                    <span>Согласен с политикой конфиденциальности</span>
                </label>

                <button type="submit" class="btn-submit">
                    ПОЛУЧИТЬ ТОЧНЫЙ РАСЧЕТ
                </button>
            </form>
        </div>

        <p class="disclaimer">* Расчет является ориентировочным. Точная сумма зависит от условий договора, решения банка и судебной практики.</p>
    </div>
</div>
`;

// ====================
// ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
// ====================

/*
ПРИМЕР 1: Простой расчет
const calc = new ReturnCalculator();
const result = calc.calculate(100000); // 100 000 рублей навязанных услуг

console.log(`Общий возврат: ${result.totalReturn} руб`);
console.log(`Клиент получит: ${result.clientAmount} руб`);
console.log(`Наша комиссия: ${result.companyCommission} руб`);

ПРИМЕР 2: С деталями
const result2 = calc.calculate(
    150000,      // сумма навязанных услуг
    'auto',      // автокредит
    true,        // досрочное погашение
    6            // 6 месяцев с оформления
);

ПРИМЕР 3: Форматирование
console.log(calc.formatMoney(result.clientAmount)); // "120 000 ₽"
*/

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReturnCalculator;
}

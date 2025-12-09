import React, { useState } from 'react';
import { TrendingDown, Calculator, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';

export const DebtCalculator: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [debt, setDebt] = useState('');
  const [result, setResult] = useState<{
    canBankrupt: boolean;
    savings: number;
    monthlyPayment: number;
  } | null>(null);

  const calculate = () => {
    const debtAmount = parseFloat(debt.replace(/\s/g, '').replace(/\u00A0/g, '')) || 0;

    if (debtAmount < 500000) {
      setResult({
        canBankrupt: false,
        savings: 0,
        monthlyPayment: 0
      });
      return;
    }

    // Simplified calculation - банкротство доступно если долг >= 500000
    const canBankrupt = debtAmount >= 500000;
    const savings = canBankrupt ? debtAmount : 0;

    setResult({
      canBankrupt,
      savings,
      monthlyPayment: canBankrupt ? 12500 : 0
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-3xl p-8 lg:p-12 border-2 border-neutral-100 shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-2xl mb-4 shadow-gold">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          Калькулятор долга
        </h3>
        <p className="text-neutral-600">
          Узнайте, подходит ли вам процедура банкротства
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <label className="block text-center text-base font-medium text-neutral-700 mb-4">
            Сумма долга (₽)
          </label>
          <input
            type="text"
            value={debt}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              const formatted = value ? new Intl.NumberFormat('ru-RU').format(parseInt(value)) : '';
              setDebt(formatted);
            }}
            placeholder="1 500 000"
            className="w-full h-16 px-6 rounded-xl border-2 border-neutral-200 bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-xl text-center font-semibold"
          />
        </div>

        <Button 
          fullWidth 
          size="lg" 
          onClick={calculate}
          className="mb-6 text-lg py-6 shadow-2xl hover:shadow-3xl"
        >
          Рассчитать
        </Button>

        {result && (
          <div className="mt-8 space-y-6">
            {result.canBankrupt ? (
              <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-6 border-2 border-success/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center shrink-0">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-success mb-2">
                      Банкротство подходит вам!
                    </h4>
                    <div className="space-y-2 text-neutral-700">
                      <p>
                        <strong>Экономия:</strong>{' '}
                        <span className="text-success font-bold text-lg">
                          {formatNumber(result.savings)} ₽
                        </span>
                      </p>
                      <p>
                        <strong>Ежемесячный платеж при банкротстве:</strong>{' '}
                        <span className="text-primary font-bold">
                          от {formatNumber(result.monthlyPayment)} ₽/мес
                        </span>
                      </p>
                      <p className="text-sm text-neutral-600 mt-4">
                        Процедура банкротства поможет вам списать долги и начать новую жизнь.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-error/10 to-error/5 rounded-2xl p-6 border-2 border-error/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-error rounded-xl flex items-center justify-center shrink-0">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-error mb-2">
                      Банкротство может не подойти
                    </h4>
                    <p className="text-neutral-700 mb-4">
                      Для процедуры банкротства сумма долга должна быть не менее 500 000 ₽.
                    </p>
                    <p className="text-sm text-neutral-600">
                      Рекомендуем получить консультацию юриста для оценки вашей ситуации.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-6 border-2 border-neutral-100">
              <h5 className="font-bold text-primary mb-4">Визуализация</h5>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-600">Текущий долг</span>
                    <span className="font-bold text-error">
                      {formatNumber(parseFloat(debt.replace(/\s/g, '').replace(/\u00A0/g, '')) || 0)} ₽
                    </span>
                  </div>
                  <div className="h-4 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-error transition-all duration-500"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
                {result.canBankrupt && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-600">После банкротства</span>
                      <span className="font-bold text-success">0 ₽</span>
                    </div>
                    <div className="h-4 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-success transition-all duration-500"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button 
              fullWidth 
              size="lg" 
              onClick={onOpenModal}
              className="text-lg py-6 shadow-2xl hover:shadow-3xl"
            >
              Получить БЕСПЛАТНУЮ консультацию
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};


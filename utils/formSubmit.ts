interface FormData {
  name: string;
  phone: string;
  source?: string; // откуда пришла заявка
  debtAmount?: string;
  [key: string]: string | undefined;
}

interface SubmitResult {
  success: boolean;
  message?: string;
}

/**
 * Отправляет данные формы в Telegram бота и на email
 */
export async function submitForm(data: FormData): Promise<SubmitResult> {
  const apiUrl = import.meta.env.VITE_API_URL || '/api/submit-form';
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, message: result.message };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { 
      success: false, 
      message: 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.' 
    };
  }
}

/**
 * Форматирует сообщение для Telegram
 */
export function formatTelegramMessage(data: FormData): string {
  const source = data.source || 'Не указан';
  const debtAmount = data.debtAmount ? `\n💰 Сумма долга: ${data.debtAmount}` : '';
  
  return `🔔 Новая заявка с сайта Правовой Альянс

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}${debtAmount}
📍 Источник: ${source}

⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;
}

/**
 * Форматирует сообщение для Email
 */
export function formatEmailMessage(data: FormData): string {
  const source = data.source || 'Не указан';
  const debtAmount = data.debtAmount ? `<p><strong>Сумма долга:</strong> ${data.debtAmount}</p>` : '';
  
  return `
    <h2>Новая заявка с сайта Правовой Альянс</h2>
    <p><strong>Имя:</strong> ${data.name}</p>
    <p><strong>Телефон:</strong> ${data.phone}</p>
    ${debtAmount}
    <p><strong>Источник:</strong> ${source}</p>
    <p><strong>Время:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</p>
  `;
}


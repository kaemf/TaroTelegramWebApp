// Функция для начала вибрации
function RouneVibrate(element) {
    element.classList.add('vibrating');
    window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
    setTimeout(() => {
        element.classList.remove('vibrating');
    }, 100); // 100 миллисекунд
}
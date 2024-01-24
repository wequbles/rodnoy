"use strict";

const lightBtn = document.getElementById('light');
lightBtn.addEventListener('click', () => {
	if (lightBtn.getAttribute('data-light') == 'true') {
		lightBtn.setAttribute('data-light', 'false');
	} else {
		lightBtn.setAttribute('data-light', 'true');
	}
});

/* Прокручивание к контактам */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href');
		scrollTo(targetId);
	});

	anchor.addEventListener('touchstart', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href');
		scrollTo(targetId);
	});
});

function scrollTo(targetId) {
	document.querySelector(targetId).scrollIntoView({
		behavior: 'smooth'
	});
}

/* Кнопки слайдера */
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const scroller = document.getElementById('gallery__scroller');

// Функция для проверки положения слайдера и скрытия/показа кнопок
function checkSliderPosition() {
	const isAtBeginning = scroller.scrollLeft === 0;
	const isAtEnd = scroller.scrollLeft + scroller.clientWidth === scroller.scrollWidth;

	// Скрыть/показать кнопки в зависимости от положения слайдера
	prevBtn.style.display = isAtBeginning ? 'none' : 'block';
	nextBtn.style.display = isAtEnd ? 'none' : 'block';
}

// Добавить обработчик события прокрутки
scroller.addEventListener('scroll', checkSliderPosition);

// Добавить обработчики событий для кнопок
nextBtn.addEventListener('click', () => {
	scroller.scrollBy({ left: 200 });
	checkSliderPosition();
});

prevBtn.addEventListener('click', () => {
	scroller.scrollBy({ left: -200 });
	checkSliderPosition();
});

// Проверить положение слайдера при загрузке страницы
checkSliderPosition();

/* Копирование номера телефона */
const phoneNumberBlock = document.getElementById('phone_number');
const phoneNumber = phoneNumberBlock.getAttribute('data-phone-number');

phoneNumberBlock.addEventListener('click', function() {
	navigator.clipboard.writeText(phoneNumber) // Копируем номер телефона в буфер обмена
		.then(() => {
			alert('Номер телефона скопирован'); // При необходимости выводим сообщение об успешном копировании
		})
		.catch(error => {
			console.error('Ошибка копирования ' + error);
		});

	const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); // Определяем платформу устройства
	if (isMobileDevice) { // Если устройство мобильное, открываем приложение мобильного телефона
		window.location.href = `tel:${phoneNumber}`;
	}
});
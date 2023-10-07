function slider (){
    const nextSlide = document.querySelector('.offer__slider-next'),
      prevSlide = document.querySelector('.offer__slider-prev'),
      slides = document.querySelectorAll('.offer__slide'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrap = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slide-inner'),
      width = window.getComputedStyle(slidesField).width;
let slideIndex = 1;
let offset = 0;

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '1s all';

slidesWrap.style.overflow = 'hidden';

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}

slides.forEach(slide => {
    slide.style.width = width;
});

nextSlide.addEventListener('click', () => {
    if(offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length) {
        slideIndex = 1; 
    } else {
        slideIndex++;
    }

    if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
})

prevSlide.addEventListener('click', () => {
    if(offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1)
    } else {
        offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == 1) {
        slideIndex = slides.length; 
    } else {
        slideIndex--;
    }

    if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
})

if(slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

   if(slides.length < 10) {
    current.textContent = `0${slideIndex}`;
} else {
    current.textContent = slideIndex;
}

}

export default slider;
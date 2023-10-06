/* eslint-disable no-unused-vars */
window.addEventListener('DOMContentLoaded', () => {
    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item');

    function hideTabsContent() {
        tabsContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('active');
        })
    
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent(i = 0) {

        tabsContent[i].classList.add('active');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });

        }
    });

    hideTabsContent();
    showTabsContent();

//   Timer---------------------------------------------------

const deadline = '2023-11-01';

function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endTime) - Date.parse(new Date());

if (t <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
} else {
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t / (1000 * 60 * 60) % 24)),
    minutes = Math.floor((t / 1000 / 60) % 60), 
    seconds = Math.floor((t / 1000) % 60);
}   
    return {t, days, hours, minutes, seconds};
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setTimeRemaining() {
    const days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds'),
          timerId = setInterval(updateTimer, 1000);
    
    function updateTimer() {
        const  date = getTimeRemaining(deadline);

        days.textContent = getZero(date.days);
        hours.textContent = getZero(date.hours);
        minutes.textContent = getZero(date.minutes);
        seconds.textContent = getZero(date.seconds);

        if (date.t <= 0) {
            clearInterval(timerId);
        }
    }

    updateTimer();
    
}

setTimeRemaining();


//   Modal---------------------------------------------------

const   modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalTimer = setTimeout(openModal, 300000);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('active');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('active')) { 
            closeModal();
        }
    });
 
    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll); 

 //   Cards---------------------------------------------------


class MenuCard {
    constructor(img, alt, title, descr, cost, parentSelector, ...classes) {
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.cost = cost;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.rub = 56;
        this.convertToRub();
    }

    convertToRub() {
        this.cost = this.rub * this.cost;
    }
    render() {
        const menuItem = document.createElement('div');

        if(this.classes.length === 0) {
            this.classes = 'menu__item';
            menuItem.classList.add(this.classes);
        } else {
            this.classes.forEach(className => menuItem.classList.add(className));
        }
        
        menuItem.innerHTML = `
            <img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.cost}</span> руб/день</div>
            </div>
        `;
        this.parent.append(menuItem);
    }
}

const getMenu = async (url, data) => {
    const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
    return await res.json();
}

getMenu('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price})=> {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        }) 
    }) 

//   Forms---------------------------------------------------

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/spinner/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    error: 'Ошибка'
}

forms.forEach(item => {
    bindPostData(item);
});
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

function bindPostData(form) {
    form.addEventListener('submit', (e)=> {
        e.preventDefault();
        const statusMessage = document.createElement('img');
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        statusMessage.src = message.loading;

        form.append(statusMessage);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            form.reset();
            showThanksModal(message.success);
            statusMessage.remove();
        })
        .catch(()=> {
            showThanksModal(message.error);
        })
        .finally(() => {
            form.reset();
        });

    });
}

function showThanksModal(mess) {
    const prevModal = document.querySelector('.modal__dialog');

    prevModal.classList.add('hide');
    openModal();

    const messModal = document.createElement('div');
    messModal.classList.add('modal__dialog');

    messModal.innerHTML = `
    <div class="modal__content">
        <form action="#">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${mess}</div>
        </form>
    </div>
    `;

    document.querySelector('.modal').append(messModal);

    setTimeout(() => {
        messModal.remove();
        prevModal.classList.remove('hide');
        closeModal();
    }, 2000);
}


//   Slider---------------------------------------------------
    
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

// showSlide(slideIndex);

// prevSlide.addEventListener('click', ()=> {
//     plusSlides(-1);
// });

// nextSlide.addEventListener('click', ()=> {
//     plusSlides(1);
// });

// function showSlide(n) {
//    if (n > slides.length) {
//        slideIndex = 1;
//    }

//    if (n < 1) {
//        slideIndex = slides.length;
//    }

//    slides.forEach(slide => slide.classList.add('hide'));
//    slides[slideIndex - 1].classList.remove('hide');

//    if(slides.length < 10) {
//     current.textContent = `0${slideIndex}`;
// } else {
//     current.textContent = slideIndex;
// }
// }


// function plusSlides(n) {
//     showSlide(slideIndex += n);
// }


//   Calc---------------------------------------------------

const result = document.querySelector('.calculating__result span');

let sex, heght, weight, age, ratio;

if(localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
} else { 
    sex = 'female';
    localStorage.setItem('sex', 'female');
}

if(localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else { 
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        if(elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }

        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function calcTotal() {
    if(!sex || !heght || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
    }

    if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * heght) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * heght) - (5.7 * age)) * ratio);
    }
}

calcTotal();

function getStatInfo(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if(e.target.getAttribute('data-ratio')) {
                ratio = e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
            } else { 
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
    
            elements.forEach((elem) => {
                elem.classList.remove(activeClass);
            });
    
            e.target.classList.add(activeClass);
    
            calcTotal();
        });
    });
}

getStatInfo('#gender', 'calculating__choose-item_active');
getStatInfo('.calculating__choose_big', 'calculating__choose-item_active');

function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

        if(input.value.match(/\D/g)) {
            input.style.boxShadow = '0 4px 15px red';
            console.log('qwe');
        } else {
            input.style.boxShadow = '0 4px 15px rgba(0,0,0,.2)';
        }

        switch(input.getAttribute('id')) {
            case 'height' : 
                heght = +input.value;
                break;
            case 'weight' : 
                weight = +input.value;
                break;
            case 'age' : 
                age = +input.value;
                break;
        }
        calcTotal();
    });
}

getDynamicInfo('#height');
getDynamicInfo('#weight');
getDynamicInfo('#age');
});
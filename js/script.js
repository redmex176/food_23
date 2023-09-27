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

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
   10,
   '.menu__field .container',
   "menu__item"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"',
   'Меню "Премиум" - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
   16,
   '.menu__field .container',
   "menu__item"
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
   'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
   13,
   '.menu__field .container',
   "menu__item"
).render();

//   Forms---------------------------------------------------

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/spinner/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    error: 'Ошибка'
}

forms.forEach(item => {
    postData(item);
});

function postData(form) {
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

        const obj = {};

        formData.forEach(function (value, key) {
            obj[key] = value;
        })

        fetch('server.php',{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(data => data.text())
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

});
import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(modalTimer) {
    const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/spinner/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    error: 'Ошибка'
}

forms.forEach(item => {
    bindPostData(item);
});

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
    openModal('.modal', modalTimer);

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
        closeModal('.modal');
    }, 2000);
}

}

export default forms;
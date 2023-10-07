import tabs from './modules/tabs';
import calc from'./modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import { openModal } from './modules/modal'; 

window.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 3000);

    tabs({
        tabsSelector: '.tabheader__item',
        tabsParentSelector: '.tabheader__items',
        tabsContentSelector: '.tabcontent',
        tabsActiveSelector: 'tabheader__item_active'
    });
    calc();
    cards();
    forms(modalTimer);
    modal('[data-modal]', '.modal', modalTimer);
    slider();
    timer();
});
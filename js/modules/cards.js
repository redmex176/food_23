import { getMenu } from "../services/services";

function cards() {
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
    
    getMenu('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price})=> {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        }) 
    }) 
        
}


export default cards;
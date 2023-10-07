function tabs({tabsSelector, tabsParentSelector, tabsContentSelector, tabsActiveSelector}) {
    const tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector),
    tabs = document.querySelectorAll(tabsSelector);

function hideTabsContent() {
  tabsContent.forEach(tab => {
      tab.classList.add('hide');
      tab.classList.remove('active');
  })

  tabs.forEach(tab => {
      tab.classList.remove(tabsActiveSelector);
  });
}

function showTabsContent(i = 0) {

  tabsContent[i].classList.add('active');
  tabsContent[i].classList.remove('hide');
  tabs[i].classList.add(tabsActiveSelector);
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
}
export default tabs;
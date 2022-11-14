const popupArray = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('#popupProf'); // попап для изменения профиля
const popupPlace = document.querySelector('#popupPlace'); // попап для добавления нового поста
const popupView = document.querySelector('#popupView'); // попап для просмотра постов 
const formProfile = popupProfile.querySelector('#formProf'); // попап для просмотра постов 
const formPlace = popupPlace.querySelector('#formPlace'); // попап для просмотра постов 
const formView = popupView.querySelector('#formView'); // попап для просмотра постов 
const profileChange = document.querySelector('.profile__change'); // кнопка для изменения профиля
const profileAdd = document.querySelector('.profile__add'); // кнопка для добавления поста
const popupCloseArray = Array.from(document.querySelectorAll('.popup__close-button')); // кнопка закрытия попапа
const saveNewPlace = document.querySelector('#newPlace');
const profileName = document.querySelector('.profile__name'); // Имя в профиля
const profilAbout = document.querySelector('.profile__about'); // Род деятельности в профиле
const nameInput = formProfile.querySelector('#form__name'); // Инпут для имени
const aboutInput = formProfile.querySelector('#form__about'); // Инпут для деятельности
const placeName = formPlace.querySelector('#form__place'); // Инпут для названия нового поста
const placeLink = formPlace.querySelector('#form__link'); // Инпут для ссылки на новый пост
const popupImg = formView.querySelector('#viewImg'); // Увеличенная картинка в попапе
const popupCaption = formView.querySelector('.popup__caption'); // Описание карнки в попапе
const elementTemplate = document.querySelector('#element').content; // Получение элементов из Template
const elements = document.querySelector('.elements'); // Отсек со всеми постами
const firstCards =[
    {
        name: 'Бауманска станция',
        link: './images/Бауманска.jpg'
    },
    {
        name: 'Общежитие',
        link: './images/Общага.jpg'
    },
    {
        name: 'Деревня',
        link: './images/Деревня.jpg'
    },
    {
        name: 'Челябинск',
        link: './images/Челябиск.jpg'
    },
    {
        name: 'Новомихайловск',
        link: './images/Новомих.jpg'
    },
    {
        name: 'Орленок',
        link: './images/Орленок.jpg'
    }
];
console.log(saveNewPlace)
function createCard(item) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementParagraph = element.querySelector('.element__paragraph'); // выбор элементов нового поста
    const elementImg = element.querySelector('.element__img');
    const elementDelete = element.querySelector('.element__delete');
    const elementLike = element.querySelector('.element__like');
    const elementView = element.querySelector('.element__img-popup')
    elementParagraph.textContent = item.name;
    elementImg.src = item.link;
    elementImg.alt = item.name;
    elementLike.addEventListener('click', () => { // Присвоение слушателей к новому посту
        elementLike.classList.toggle('element__like_active');
    });
    elementDelete.addEventListener('click', () => {
        elementDelete.parentNode.remove();
    });
    elementView.addEventListener('click', () => {
        openPopup(popupView);
        popupImg.src = elementImg.src;
        popupCaption.textContent = elementParagraph.textContent;
        popupImg.alt = elementParagraph.textContent;
    });
    return element;
};

function renderCard(elementUnit){
    const card = createCard(elementUnit);
    elements.prepend(card);
};

firstCards.forEach(renderCard);// Добавление карточек с помощью Js 

function closePopup(elem){  // функция для закрытия формы
    elem.classList.remove('popup_opend');
    document.removeEventListener('keydown', closePopupByEsc);
};

function openPopup(elem){
    elem.classList.add('popup_opend');
    document.addEventListener('keydown', closePopupByEsc);
};

function saveSubmitProfile(evt) { //функция сохранения данных полученных от пользователя при изменении профиля
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilAbout.textContent = aboutInput.value;
    closePopup(popupProfile);
};

const saveSubmitPlace = (evt) => { //функция сохранения данных полученных от пользователя при добовления новой карточки
    evt.preventDefault();
    if(placeLink.value != '' || placeName.value != ''){
        const newCards ={
            name: placeName.value,
            link: placeLink.value,
        };
    renderCard(newCards);
    }
    closePopup(popupPlace);
};

const closePopupByEsc = (evt) => {
    if(evt.key === "Escape"){
        const popupOpened = document.querySelector('.popup_opend');
        closePopup(popupOpened);
    }
}
profileChange.addEventListener('click', function(){ // открытие формы для изменения профиля
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    aboutInput.value = profilAbout.textContent;
});

profileAdd.addEventListener('click', function(){ // открытие формы для добовлания постов
    openPopup(popupPlace);
    disableButton( saveNewPlace, 'form__save-button_disable');
    placeName.value = "";
    placeLink.value ="";
});

popupCloseArray.forEach((pop) => {
    const popupOpened = pop.closest("div");
    pop.addEventListener('click', () => {
        closePopup(popupOpened);
    }); //само закрытие формы
});


popupArray.forEach((pop) => {
    const childElement = pop.firstElementChild;
    pop.addEventListener('click', (evt) =>{
        if(!(evt.target == childElement || childElement.contains(evt.target))){
            closePopup(pop);
        }
    });
});

popupProfile.addEventListener('submit', saveSubmitProfile); //перенос данных из формы в профиль
popupPlace.addEventListener('submit',saveSubmitPlace); //перенос данных из формы в посты
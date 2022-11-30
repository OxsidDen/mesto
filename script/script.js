import {data} from './Data.js';
import {Card} from './Card.js';
import { FormValidation } from './FormValidation.js';
import { selectors } from './selectorValid.js';
const popupArray = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('#popupProf'); // попап для изменения профиля
const popupPlace = document.querySelector('#popupPlace'); // попап для добавления нового поста
const popupView = document.querySelector('#popupView'); // попап для просмотра постов 
const formProfile = popupProfile.querySelector('#formProf'); // попап для просмотра постов 
const formPlace = popupPlace.querySelector('#formPlace'); // попап для просмотра постов 
const formView = popupView.querySelector('#formView'); // попап для просмотра постов 
const profileChange = document.querySelector('.profile__change'); // кнопка для изменения профиля
const placeAdd = document.querySelector('.profile__add'); // кнопка для добавления поста
const buttonCloseArray = Array.from(document.querySelectorAll('.popup__close-button')); // кнопка закрытия попапа
const profileName = document.querySelector('.profile__name'); // Имя в профиля
const profilAbout = document.querySelector('.profile__about'); // Род деятельности в профиле
const nameInput = formProfile.querySelector('#form__name'); // Инпут для имени
const aboutInput = formProfile.querySelector('#form__about'); // Инпут для деятельности
const placeName = formPlace.querySelector('#form__place'); // Инпут для названия нового поста
const placeLink = formPlace.querySelector('#form__link'); // Инпут для ссылки на новый пост
const popupImg = formView.querySelector('#viewImg'); // Увеличенная картинка в попапе
const popupCaption = formView.querySelector('.popup__caption'); // Описание карнки в попапе
const elements = document.querySelector('.elements'); // Отсек со всеми постами
const formPlaceValid = new FormValidation(selectors, formPlace);
formPlaceValid.enableValidation();
const formProfileValid = new FormValidation(selectors, formProfile);
formProfileValid.enableValidation();

function createCard(elementUnit) {
    const card = new Card(elementUnit, 
        (data) => {
            openPopup(popupView);
            popupImg.src = data.link;
            popupCaption.textContent = data.name;
            popupImg.alt = data.name;
        }, "#templateCard");
        const cardElement = card.renderCard();
        return cardElement;
    };

function renderCard(elementUnit){
    const cardElement = createCard(elementUnit);
    elements.prepend(cardElement);
};

data.forEach(renderCard);

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

placeAdd.addEventListener('click', function(){ // открытие формы для добовлания постов
    openPopup(popupPlace);
    placeName.value = "";
    placeLink.value ="";
    formPlaceValid.disableButton();
});

buttonCloseArray.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener('click', () => {
        closePopup(popup);
    }); //само закрытие формы
});


popupArray.forEach((pop) => {
    const childElement = pop.firstElementChild;
    pop.addEventListener('mousedown', (evt) =>{
        if(!(evt.target == childElement || childElement.contains(evt.target))){
            closePopup(pop);
        }
    });
});


popupProfile.addEventListener('submit', saveSubmitProfile); //перенос данных из формы в профиль
popupPlace.addEventListener('submit',saveSubmitPlace); //перенос данных из формы в посты


import {data} from './Data.js';
import {Card} from './Card.js';
import './index.css';
import { FormValidation } from './FormValidation.js';
import { selectors } from './selectorValid.js';
import {
    formProfile,
    formPlace,
    profileChange,
    placeAdd,
    placeName,
    placeLink,
} from './constants.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const formPlaceValid = new FormValidation(selectors, formPlace);
formPlaceValid.enableValidation();
const formProfileValid = new FormValidation(selectors, formProfile);
formProfileValid.enableValidation();
const profilePopup = new PopupWithForm({
    popupSelector: '#popupProf',
    formSubmiit: (evt) =>  { //функция сохранения данных полученных от пользователя при изменении профиля
        evt.preventDefault();
        userInfo.setUserInfo();
        profilePopup.close();
    }
});
const newCardPopup = new PopupWithForm({
    popupSelector: '#popupPlace', 
    formSubmiit: (evt) => { //функция сохранения данных полученных от пользователя при добовления новой карточки
        evt.preventDefault();
        const newCard ={
            name: placeName.value,
            link: placeLink.value,
        };
        const newCards =  new Card(newCard,
            (data) => {
                cardView.open(data);
            }, "#templateCard");
        const element = newCards.renderCard();
        cardsList.addItem(element);
        newCardPopup.close();
    }
});
const cardView = new PopupWithImage('#popupView');
const userInfo = new UserInfo(
    {
        nameSelector: ".profile__name",
        aboutSelector:".profile__about"
    });

const cardsList = new Section({
    items: data,
    renderer: (card) => {
        const newCards =  new Card(card,
            (data) => {
                cardView.open(data);
            }, "#templateCard");
        const element = newCards.renderCard();
        cardsList.addItem(element);
    }
},'.elements');

cardsList.renderingCard();

profileChange.addEventListener('click', function(){ // открытие формы для изменения профиля
    profilePopup.open();
    userInfo.getUserInfo();
});

placeAdd.addEventListener('click', function(){ // открытие формы для добовлания постов
    newCardPopup.open()
    formPlaceValid.disableButton();
});

profilePopup.setEventListeners();
newCardPopup.setEventListeners();
cardView.setEventListeners(); 


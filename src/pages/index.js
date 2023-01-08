import {data} from '../data.js';
import {Card} from '../components/Card.js';
import './index.css';
import { FormValidation } from '../components/FormValidation.js';
import {
    popupProfile,
    popupPlace,
    formProfile,
    formPlace,
    profileChange,
    placeAdd,
    placeName,
    placeLink,
    selectors,
    popupProfSelector,
    popupPlaceSelector,
    templateSelector,
    profNameSelector,
    profAboutSelector,
    popupViewSelector,
    elementSelector
} from '../constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formPlaceValid = new FormValidation(selectors, formPlace);
formPlaceValid.enableValidation();
const formProfileValid = new FormValidation(selectors, formProfile);
formProfileValid.enableValidation();
const profilePopup = new PopupWithForm({
    popupSelector: popupProfSelector,
    formSubmit: (evt) =>  { //функция сохранения данных полученных от пользователя при изменении профиля
        evt.preventDefault();
        userInfo.setUserInfo();
        profilePopup.close();
    }
});
const newCardPopup = new PopupWithForm({
    popupSelector: popupPlaceSelector, 
    formSubmit: (evt) => { //функция сохранения данных полученных от пользователя при добовления новой карточки
        evt.preventDefault();
        const newCardvalue ={
            name: placeName.value,
            link: placeLink.value,
        };
        const newCard = createNewCard(newCardvalue);
        const element = newCard.renderCard();
        cardsList.addItem(element);
        newCardPopup.close();
    }
});

const createNewCard = (element) => {
    const newCards =  new Card(element,
        (data) => {
            cardView.open(data);
        }, templateSelector);
    return newCards;
};


const cardView = new PopupWithImage(popupViewSelector);
const userInfo = new UserInfo(
    {
        nameSelector: profNameSelector,
        aboutSelector: profAboutSelector
    });

const cardsList = new Section({
    items: data,
    renderer: (card) => {
        const defaultCards = createNewCard(card);
        const element = defaultCards.renderCard();
        cardsList.addItem(element);
    }
}, elementSelector);

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


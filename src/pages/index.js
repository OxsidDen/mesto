import {Card} from '../components/Card.js';
import './index.css';
import { FormValidation } from '../components/FormValidation.js';
import {
    formProfile,
    formPlace,
    formEditAvatar,
    profileChange,
    placeAdd,
    placeName,
    placeLink,
    selectors,
    popupProfSelector,
    popupPlaceSelector,
    popupAvatarSelector,
    templateSelector,
    profNameSelector,
    profAboutSelector,
    popupViewSelector,
    elementSelector,
    avatar,
    popupDeletSelector,
    aceptButton,
    avaterChange,
    avatarLink,
    buttonText,
    aboutInput,
    nameInput
} from '../constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
let id = 0;
const formPlaceValid = new FormValidation(selectors, formPlace);
formPlaceValid.enableValidation();
const formProfileValid = new FormValidation(selectors, formProfile);
formProfileValid.enableValidation();
const avatarEditValid = new FormValidation(selectors, formEditAvatar);
avatarEditValid.enableValidation();
const popupDeletCard = new Popup(popupDeletSelector);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    authorization: '08c90c1a-1998-40ee-b8a2-c5f50d26b954'
});

Promise.all([api.getCards(), api.getProfile()])
    .then(([cards, prof]) => {
        id = prof._id;
        avatar.src = prof.avatar;
        userInfo.setUserInfo(prof);
        cardsList.renderingCard(cards);
    })
    .catch((err) => {
        console.log(err); 
    }); 

const profilePopup = new PopupWithForm({
    popupSelector: popupProfSelector,
    formSubmit: (evt) =>  { //функция сохранения данных полученных от пользователя при изменении профиля
        evt.preventDefault();
        newCardPopup.setButtonText(buttonText.saving);

        api.changeProfile(nameInput.value, aboutInput.value)
            .then((res) => {
                userInfo.setUserInfo(res);
            })
            .then(() => {
                profilePopup.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                newCardPopup.setButtonText(buttonText.save);
            })
    },
});

const newCardPopup = new PopupWithForm({
    popupSelector: popupPlaceSelector, 
    formSubmit: (evt) => { //функция сохранения данных полученных от пользователя при добовления новой карточки
        evt.preventDefault();
        newCardPopup.setButtonText(buttonText.creating)
        const newCardvalue = {
            name: placeName.value,
            link: placeLink.value,
        };
        api.addNewPost(newCardvalue.name, newCardvalue.link)
            .then((res) => {
                const newCard = createNewCard(res);
                const element = newCard.renderCard();
                cardsList.renderItems(element);
            })
            .then(() => {
                newCardPopup.close();
            })
            .catch((err) => {
                console.log(err); 
            })
            .finally(() => {
                newCardPopup.setButtonText(buttonText.create);
            })
    }
});

const editProfilePopup = new PopupWithForm({
    popupSelector: popupAvatarSelector,
    formSubmit: (evt) => {
        evt.preventDefault();
        newCardPopup.setButtonText(buttonText.saving)
        api.changeAvatar(avatarLink.value)
            .then(res => {
                avatar.src = res.avatar;
            })
            .then(() => {
                editProfilePopup.close();
            })
            .catch((err) => {
                console.log(err); 
            })
            .finally(() => {
                newCardPopup.setButtonText(buttonText.save);
            })
    }
})

const createNewCard = (element) => { //создание новой карточки
    const newCards =  new Card(
        element,
        id,
        (data) => {
            cardView.open(data);
        },
        (id) => {
            popupDeletCard.open();
            aceptButton.addEventListener('click', () => {
                api.deletCard(id)
                    .then(() => {
                        newCards.deletPost();
                        popupDeletCard.close();
                    })
                    .catch((err) => {
                        console.log(err); 
                    }); 
            })
        },
        (id) => {
            api.putLike(id)
                .then((res) => {
                    newCards.calculateLike(res);
                })
                .catch((err) => {
                    console.log(err); 
                }); 
        },
        (id) => {
            api.deletLike(id)
                .then((res) => {
                    newCards.calculateLike(res);
                })
                .catch((err) => {
                    console.log(err); 
                }); 
        },
        templateSelector);
    return newCards;
};

const cardsList = new Section({
    renderer: (card) => {
        const defaultCards = createNewCard(card);
        const element = defaultCards.renderCard();
        defaultCards.calculateLike(card);
        cardsList.renderItems(element);
    }
}, elementSelector);

const cardView = new PopupWithImage(popupViewSelector); //попап с просмтором карточки
const userInfo = new UserInfo(         // информация о пользователе
{
    nameSelector: profNameSelector,
    aboutSelector: profAboutSelector,
});

profileChange.addEventListener('click', function(){ // открытие формы для изменения профиля
    profilePopup.open();
    formProfileValid.resetValid();
    const data = userInfo.getUserInfo()
    nameInput.value = data.profName;
    aboutInput.value = data.profAbout; 
});

placeAdd.addEventListener('click', function(){ // открытие формы для добовлания постов
    newCardPopup.open();
    formPlaceValid.resetValid();
    formPlaceValid.disableButton();
});

avaterChange.addEventListener('click', function(){
    editProfilePopup.open();
    avatarEditValid.resetValid();
    avatarEditValid.disableButton();
})

profilePopup.setEventListeners();
newCardPopup.setEventListeners();
cardView.setEventListeners(); 
popupDeletCard.setEventListeners();
editProfilePopup.setEventListeners();

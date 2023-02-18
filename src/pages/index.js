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
    profileName,
    profileAbout,
    sectionElements,
    popupDeletSelector,
    aceptButton,
    avaterChange,
    avatarLink,
    buttonText,
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

const profilePopup = new PopupWithForm({
    popupSelector: popupProfSelector,
    formSubmit: (evt) =>  { //функция сохранения данных полученных от пользователя при изменении профиля
        evt.preventDefault();
        newCardPopup.loading(true)
        userInfo.setUserInfo();
        api.changeProfile(profileName.textContent, profileAbout.textContent)
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                newCardPopup.loading(false);
            })
        profilePopup.close();
    },
    loadingText: buttonText.saving,
    defoltText: buttonText.save,
});
const newCardPopup = new PopupWithForm({
    popupSelector: popupPlaceSelector, 
    formSubmit: (evt) => { //функция сохранения данных полученных от пользователя при добовления новой карточки
        evt.preventDefault();
        newCardPopup.loading(true)
        const newCardvalue = {
            name: placeName.value,
            link: placeLink.value,
        };
        api.addNewPost(newCardvalue.name, newCardvalue.link)
            .then((res) => {
                const newCard = createNewCard(res);
                const element = newCard.renderCard();
                sectionElements.prepend(element);
            })
            .catch((err) => {
                console.log(err); 
            })
            .finally(() => {
                newCardPopup.loading(false);
            })
        
        newCardPopup.close();
    },
    loadingText: buttonText.creating,
    defoltText: buttonText.create,
});

const editProfilePopup = new PopupWithForm({
    popupSelector: popupAvatarSelector,
    formSubmit: (evt) => {
        evt.preventDefault();
        newCardPopup.loading(true)
        api.changeAvatar(avatarLink.value)
            .then(res => {
                avatar.src = res.avatar;
            })
            .catch((err) => {
                console.log(err); 
            })
            .finally(() => {
                newCardPopup.loading(false);
            })

        editProfilePopup.close();
    },
    loadingText: buttonText.saving,
    defoltText: buttonText.save,
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
const cardView = new PopupWithImage(popupViewSelector); //попап с просмтором карточки
const userInfo = new UserInfo(         // информация о пользователе
{
    nameSelector: profNameSelector,
    aboutSelector: profAboutSelector,
    getProf: api.getProfile()//  получение данных о пользователе с сервера
        .then(res => {
            avatar.src = res.avatar;
            profileName.textContent = res.name;
            profileAbout.textContent = res.about;
            id = res._id
            return id
        })
        .catch((err) => {
            console.log(err); 
        })
});

userInfo.myId()

profileChange.addEventListener('click', function(){ // открытие формы для изменения профиля
    profilePopup.open();
    userInfo.getUserInfo(); 
});

placeAdd.addEventListener('click', function(){ // открытие формы для добовлания постов
    newCardPopup.open()
    formPlaceValid.disableButton();
});

avaterChange.addEventListener('click', function(){
    editProfilePopup.open();
    avatarEditValid.disableButton();
})

profilePopup.setEventListeners();
newCardPopup.setEventListeners();
cardView.setEventListeners(); 
popupDeletCard.setEventListeners();
editProfilePopup.setEventListeners();

api.getCards() // Загрузка карточек с сервера
    .then(res => {
        const cardsList = new Section({
            items: res,
            renderer: (card) => {
                const defaultCards = createNewCard(card);
                const element = defaultCards.renderCard();
                defaultCards.calculateLike(card);
                cardsList.addItem(element);
            }
        }, elementSelector);
        cardsList.renderingCard()
    })
    .catch((err) => {
        console.log(err); 
    }); 

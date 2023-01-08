export const popupProfile = document.querySelector('#popupProf'); // попап для изменения профиля
export const popupPlace = document.querySelector('#popupPlace'); // попап для добавления нового поста
export const formProfile = popupProfile.querySelector('#formProf'); // попап для просмотра постов 
export const formPlace = popupPlace.querySelector('#formPlace'); // попап для просмотра постов 
export const profileChange = document.querySelector('.profile__change'); // кнопка для изменения профиля
export const placeAdd = document.querySelector('.profile__add'); // кнопка для добавления поста
export const placeName = formPlace.querySelector('#form__place'); // Инпут для названия нового поста
export const placeLink = formPlace.querySelector('#form__link'); // Инпут для ссылки на новый пост
export const selectors = {
    errorInputClass: "form__input_error" ,
    errorTextClass: "form__input-error_able" ,
    saveButtonSelector: ".form__save-button",
    saveButtonDisableClass: "form__save-button_disable",
    inputSelector: ".form__input"
};
export const popupProfSelector = '#popupProf';
export const popupPlaceSelector = '#popupPlace';
export const templateSelector = "#templateCard";
export const profNameSelector = ".profile__name";
export const profAboutSelector = ".profile__about";
export const popupViewSelector = "#popupView";
export const elementSelector = '.elements';
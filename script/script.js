let popup = document.querySelector('.popup');
let profileChange = document.querySelector('.profile__change');
let popupClose = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profilAbout = document.querySelector('.profile__about');
let nameInput = document.querySelector('#popupName');
let aboutInput = document.querySelector('#popupAbout');
function ClosePopup(){  // функция для закрытия формы
    popup.classList.remove('popup_opend');
}
function FormSubmit(evt) { //функция сохранения данных полученных от пользователя
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilAbout.textContent = aboutInput.value;
    ClosePopup();
}
profileChange.addEventListener('click', function(){ // открытие формы для изменения профиля
    popup.classList.add('popup_opend');
    nameInput.value = profileName.textContent;
    aboutInput.value = profilAbout.textContent;
})
popupClose.addEventListener('click',ClosePopup ); //само закрытие формы
popup.addEventListener('submit', FormSubmit); //перенос данных из формы в профиль
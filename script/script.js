let popup = document.querySelector('.popup');
let ProfileChange = document.querySelector('.profile__change');
let popupClose = popup.querySelector('.popup__close-button');
let ProfileName = document.querySelector('.profile__name');
let ProfilAbout = document.querySelector('.profile__about');
let nameInput = popup.querySelector('.popup__name');
let aboutInput = popup.querySelector('.popup__about');
ProfileChange.addEventListener('click', function(){ // открытие формы для изменения профиля
    popup.classList.add('popup__opend');
    nameInput.value = ProfileName.textContent;
    aboutInput.value = ProfilAbout.textContent;
})
function ClosePopup(){  // функция для закрытия формы
    popup.classList.remove('popup__opend');
}
popupClose.addEventListener('click',ClosePopup ); //само закрытие формы
nameInput.addEventListener('click',function(){
    nameInput.value = ''; 
} );
aboutInput.addEventListener('click',function(){ //очистка данных формы при нажатии
    aboutInput.value = '';
} );
function FormSubmit(evt) { //функция сохранения данных полученных от пользователя
    evt.preventDefault();
    ProfileName.textContent = nameInput.value;
    ProfilAbout.textContent = aboutInput.value;
    ClosePopup();
}
popup.addEventListener('submit', FormSubmit); //перенос данных из формы в профиль
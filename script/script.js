const popup = document.querySelector('.popup'); // Весь попап (грид сетка и затемнение)
const popupProfile = document.querySelector('#popupProf'); // попап для изменения профиля
const popupPlace = document.querySelector('#popupPlace'); // попап для добавления нового поста
const popupView = document.querySelector('#popupView'); // попап для просмотра постов 
const profileChange = document.querySelector('.profile__change'); // кнопка для изменения профиля
const profileAdd = document.querySelector('.profile__add'); // кнопка для добавления поста
const popupClose = popup.querySelector('.popup__close-button'); // кнопка закрытия попапа
let profileName = document.querySelector('.profile__name'); // Имя в профиля
let profilAbout = document.querySelector('.profile__about'); // Род деятельности в профиле
const nameInput = document.querySelector('#popupName'); // Инпут для имени
const aboutInput = document.querySelector('#popupAbout'); // Инпут для деятельности
const placeName = document.querySelector('#popupPost'); // Инпут для названия нового поста
const placeLink = document.querySelector('#popupLink'); // Инпут для ссылки на новый пост
const popupImg = document.querySelector('#viewImg'); // Увеличенная картинка в попапе
const popupCaption = document.querySelector('.popup__caption'); // Описание карнки в попапе
const elementTemplate = document.querySelector('#element').content; // Получение элементов из Template
const elements = document.querySelector('.elements'); // Отсек со всеми постами
const initialCards =[
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

initialCards.forEach(function(el){ // Добавление карточек с помощью Js
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__img').src = el.link;
    element.querySelector('.element__paragraph').textContent = el.name;
    elements.prepend(element);
});
const element = document.querySelectorAll('.element'); // NodeList из всех постов
const elementArray = Array.from(element); // Перевод из NodeList в Array

function closePopup(){  // функция для закрытия формы
    popup.classList.remove('popup_opend');
    popup.classList.remove('popup_view-place');
    popupView.classList.remove('popup_opend');
    popupPlace.classList.remove('popup_opend');
    popupProfile.classList.remove('popup_opend');
}

function formSubmitProfile(evt) { //функция сохранения данных полученных от пользователя
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilAbout.textContent = aboutInput.value;
    closePopup();
}

elementArray.forEach((item) => { // функция добовления взаимодецствия с пользователем (лайк, удаление, просмотр)
    const elementDelete = item.querySelector('.element__delete'); // Выбор элеиентов уже существующих карточек
    const elementLike = item.querySelector('.element__like');
    const elementView = item.querySelector('.element__img-popup');
    const elementImg = item.querySelector('.element__img');
    const elementParagraph = item.querySelector('.element__paragraph');
    elementLike.addEventListener('click', () => {  // Добавление к существующим картом слушателей
        elementLike.classList.toggle('element__like_active');
    });
    elementDelete.addEventListener('click', () => {
        elementDelete.parentNode.remove();
    });
    elementView.addEventListener('click', () => {
        popup.classList.add('popup_opend', 'popup_view-place');
        popupView.classList.add('popup_opend');
        popupImg.src = elementImg.src;
        popupCaption.textContent = elementParagraph.textContent;
        });
});

function formSubmitPlace(evt) { //функция сохранения данных полученных от пользователя
    evt.preventDefault();
    if(placeLink.value != '' || placeName.value != ''){
        const element = elementTemplate.querySelector('.element').cloneNode(true);
        elements.prepend(element);
        const elementParagraph = document.querySelector('.element__paragraph'); // выбор элементов нового поста
        const elementImg = document.querySelector('.element__img');
        const elementDelete = document.querySelector('.element__delete');
        const elementLike = document.querySelector('.element__like');
        const elementView = document.querySelector('.element__img-popup');
        elementParagraph.textContent = placeName.value;
        elementImg.src = placeLink.value;
        elementLike.addEventListener('click', () => { // Присвоение слушателей к новому посту
            elementLike.classList.toggle('element__like_active');
        });
        elementDelete.addEventListener('click', () => {
            elementDelete.parentNode.remove();
        });
        elementView.addEventListener('click', () => {
            popup.classList.add('popup_opend', 'popup_view-place');
            popupView.classList.add('popup_opend');
            popupImg.src = elementImg.src;
            popupCaption.textContent = elementParagraph.textContent;
            });
    }
    closePopup();
}

profileChange.addEventListener('click', function(){ // открытие формы для изменения профиля
    popup.classList.add('popup_opend');
    popupProfile.classList.add('popup_opend'); 
    nameInput.value = profileName.textContent;
    aboutInput.value = profilAbout.textContent;
})

profileAdd.addEventListener('click', function(){ // открытие формы для добовлания постов
    popup.classList.add('popup_opend');
    popupPlace.classList.add('popup_opend');
});

popupClose.addEventListener('click',closePopup); //само закрытие формы
popupProfile.addEventListener('submit', formSubmitProfile); //перенос данных из формы в профиль
popupPlace.addEventListener('submit',formSubmitPlace); //перенос данных из формы в посты
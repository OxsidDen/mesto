const popupProfile = document.querySelector('#popupProf'); // попап для изменения профиля
const popupPlace = document.querySelector('#popupPlace'); // попап для добавления нового поста
const popupView = document.querySelector('#popupView'); // попап для просмотра постов 
const formProfile = document.querySelector('#formProf'); // попап для просмотра постов 
const formPlace = document.querySelector('#formPlace'); // попап для просмотра постов 
const formView = document.querySelector('#formView'); // попап для просмотра постов 
const profileChange = document.querySelector('.profile__change'); // кнопка для изменения профиля
const profileAdd = document.querySelector('.profile__add'); // кнопка для добавления поста
const popupClose = Array.from(document.querySelectorAll('.popup__close-button')); // кнопка закрытия попапа
const profileName = document.querySelector('.profile__name'); // Имя в профиля
const profilAbout = document.querySelector('.profile__about'); // Род деятельности в профиле
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
function createCard(item) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementParagraph = element.querySelector('.element__paragraph'); // выбор элементов нового поста
    const elementImg = element.querySelector('.element__img');
    const elementDelete = element.querySelector('.element__delete');
    const elementLike = element.querySelector('.element__like');
    const elementView = element.querySelector('.element__img-popup');
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
        openPopup(formView);
        
        popupImg.src = elementImg.src;
        popupCaption.textContent = elementParagraph.textContent;
    });
    return element;
};

function renderCard(elementUnit){
    const card = createCard(elementUnit);
    elements.prepend(card);
};

initialCards.forEach(renderCard);// Добавление карточек с помощью Js 
const elemental = document.querySelectorAll('.element'); // NodeList из всех постов
const elementArray = Array.from(elemental); // Перевод из NodeList в Array

function closePopup(elem){  // функция для закрытия формы
    elem.classList.remove('popup_opend');
};

function openPopup(elem){
    elem.classList.add('popup_opend');
};

function saveSubmitProfile(evt) { //функция сохранения данных полученных от пользователя
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilAbout.textContent = aboutInput.value;
    closePopup(popupProfile);
    closePopup(formProfile);
};

function saveSubmitPlace(evt) { //функция сохранения данных полученных от пользователя
    evt.preventDefault();
    if(placeLink.value != '' || placeName.value != ''){
        const newCards ={
            name: placeName.value,
            link: placeLink.value,
        };
    renderCard(newCards);
    }
    closePopup(formPlace);
    closePopup(popupPlace);
};

profileChange.addEventListener('click', function(){ // открытие формы для изменения профиля
    openPopup(formProfile);
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    aboutInput.value = profilAbout.textContent;
});

profileAdd.addEventListener('click', function(){ // открытие формы для добовлания постов
    openPopup(popupPlace);
    openPopup(formPlace);
});

popupClose.forEach((pop) => {
    pop.addEventListener('click', () => {
        closePopup(popupPlace);
        closePopup(popupProfile);
        closePopup(popupView);
    }); //само закрытие формы
});
popupProfile.addEventListener('submit', saveSubmitProfile); //перенос данных из формы в профиль
popupPlace.addEventListener('submit',saveSubmitPlace); //перенос данных из формы в посты
export class Card {

    constructor(data, handleCardClick, template){
        this._data = data;
        this._title = data.name;
        this._link = data.link;
        this._openPopup = handleCardClick;
        this._templateSelector = template;

    }

    _getTemplate(template){
        const cardElement = document
            .querySelector(template)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _likePost(){
        this._elementLike.classList.toggle('element__like_active');
    }

    _deletPost(){
        this._card.remove();
    }

    _viewImage(){
       this._openPopup(this._data);
    }

    _setListener(){
        this._elementLike.addEventListener('click', () => this._likePost())
        this._elementDelete.addEventListener('click', () => this._deletPost())
        this._elementView.addEventListener('click', () => this._viewImage() )

    }

    renderCard(){
        this._card = this._getTemplate(this._templateSelector);
        this._elementParagraph = this._card.querySelector('.element__paragraph'); // выбор элементов нового поста
        this._elementImg = this._card.querySelector('.element__img');
        this._elementDelete = this._card.querySelector('.element__delete');
        this._elementLike = this._card.querySelector('.element__like');
        this._elementView = this._card.querySelector('.element__img-popup')

        
        this._elementParagraph .textContent = this._title;
        this._elementImg.src = this._link;
        this._elementImg.alt = this._title;

        this._setListener();

        return this._card;
    }

};
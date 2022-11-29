export class Card {

    constructor(data, openPop, template){
        this._data = data;
        this._title = data.name;
        this._link = data.link;
        this._openPop = openPop;
        this._template = template;
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
        this.elementLike.classList.toggle('element__like_active');
    }

    _deletPost(){
        this.elementDelete.parentNode.remove();
    }

    _viewImage(){
       this._openPop(this._data);
    }

    _setListener(){
        this.elementLike.addEventListener('click', () => this._likePost())
        this.elementDelete.addEventListener('click', () => this._deletPost() )
        this.elementView.addEventListener('click', () => this._viewImage() )

    }

    renderCard(){
        this._card = this._getTemplate(this._template);
        this.elementParagraph = this._card.querySelector('.element__paragraph'); // выбор элементов нового поста
        this.elementImg = this._card.querySelector('.element__img');
        this.elementDelete = this._card.querySelector('.element__delete');
        this.elementLike = this._card.querySelector('.element__like');
        this.elementView = this._card.querySelector('.element__img-popup')

        
        this.elementParagraph .textContent = this._title;
        this.elementImg.src = this._link;
        this.elementImg.alt = this._title;

        this._setListener();

        return this._card;
    }

};
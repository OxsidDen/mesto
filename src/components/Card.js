export class Card {

    constructor(data, myId, handleCardClick, handleDeletClick,deletLikeClick, addLikeClick, template){
        this._data = data;
        this._userId = myId;
        this._owner = data.owner._id;
        this._id = data._id;
        this._title = data.name;
        this._link = data.link;
        this._likes = data.likes;

        this._openPopup = handleCardClick;
        this._handleDeletClick = handleDeletClick;
        this.addLikeClick = addLikeClick;
        this.deletLikeClick = deletLikeClick;
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

    likePost(){
        this._elementLike.classList.toggle('element__like_active');
    }

    deletPost(){
        this._card.remove();
    }

    calculateLike(data){
        this._likes = data.likes;
        this._elementCuounter = this._card.querySelector('.element__counter');
        this._elementCuounter.textContent = this._likes.length;
    }

    _isLiked(){
        if( this._likes.some((like) => like._id === this._userId)){
            this.likePost();
        }
    }

    _viewImage(){
       this._openPopup(this._data);
    }

    _setListener(){
        this._elementLike.addEventListener('click', () => {
            if(this._elementLike.classList.contains('element__like_active')){
                this.addLikeClick(this._id);
            }
            else{
                this.deletLikeClick(this._id);
            }
            this.likePost();
        });
        this._elementDelete.addEventListener('click', () => {
            this._handleDeletClick(this._id);
        });
        this._elementView.addEventListener('click', () => this._viewImage());
    }

    renderCard(){
        this._card = this._getTemplate(this._templateSelector);
        this._elementParagraph = this._card.querySelector('.element__paragraph'); // выбор элементов нового поста
        this._elementImg = this._card.querySelector('.element__img');
        this._elementDelete = this._card.querySelector('.element__delete');
        this._elementLike = this._card.querySelector('.element__like');
        this._elementView = this._card.querySelector('.element__img-popup');

        if(this._owner !== this._userId){
            this._elementDelete.remove();
        }

        this._elementParagraph .textContent = this._title;
        this._elementImg.src = this._link;
        this._elementImg.alt = this._title;

        this._setListener();
        this._isLiked();
        return this._card;
    }

};
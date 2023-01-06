import Popup from "./Popup.Js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector){
        super(popupSelector);
        this._popupImg = document.querySelector('#viewImg');
        this._popupCaption = document.querySelector('.popup__caption');
    };

    open(data){
        this._popup.classList.add('popup_opend');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupImg.src = data.link;
        this._popupCaption.textContent = data.name;
        this._popupImg.alt = data.name;
    }
}
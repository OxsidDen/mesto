import Popup from "./Popup.Js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector){
        super(popupSelector);
        this._popupImg = this._popup.querySelector('#viewImg');
        this._popupCaption = this._popup.querySelector('.popup__caption');
    };

    open(data){
        super.open();
        this._popupImg.src = data.link;
        this._popupCaption.textContent = data.name;
        this._popupImg.alt = data.name;
    }
}
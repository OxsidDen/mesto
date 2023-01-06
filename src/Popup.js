export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._closeButton = document.querySelector(".popup__close-button");
        this._handleEscClose = this._handleEscClose.bind(this)
    };

    open(){
        this._popup.classList.add('popup_opend');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close(){
        this._popup.classList.remove('popup_opend');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _handleEscClose(evt){
        if(evt.key === "Escape"){
            this.close();
        }
    };

    setEventListeners(){
        const childElement = this._popup.firstElementChild;
        this._popup.addEventListener('mousedown', (evt) =>{
            if(!(evt.target == childElement || childElement.contains(evt.target))){
                this.close()
            }
        });
        this._closeButton.addEventListener('click', () => {
            this.close();
        })
    }
}
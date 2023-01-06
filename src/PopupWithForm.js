import Popup from "./Popup.Js";

export default class PopupWithForm extends Popup{

constructor({popupSelector, formSubmiit}){
    super(popupSelector);
    this._form = document.querySelector(popupSelector);
    this._formSubmiit = formSubmiit;
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
}

_getInputValues(){
    this.formValues = {};
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
    return this.formValues;
};

close(){
    this._popup.classList.remove('popup_opend');
    document.removeEventListener('keydown', this._handleEscClose);
    this._inputList.forEach(input => {
        input.value = "";
      });
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
    this._form.addEventListener('submit', this._formSubmiit);
};

}
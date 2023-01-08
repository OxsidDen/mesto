import Popup from "./Popup.Js";

export default class PopupWithForm extends Popup{

    constructor({popupSelector, formSubmit}){
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._popupForm = this._popup.querySelector('.form');
        this._formSubmit = formSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
    }

    _getInputValues(){
        this.formValues = {};
        this._inputList.forEach(input => {
           this._formValues[input.name] = input.value;
          });
        return this.formValues;
    };

    close(){
        this._popupForm.reset();
        super.close();
    };

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', this._formSubmit);
    };

}
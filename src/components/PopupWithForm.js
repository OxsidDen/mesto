import Popup from "./Popup.Js";

export default class PopupWithForm extends Popup{

    constructor({popupSelector, formSubmit}){
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector(".form");
        this._formSubmit = formSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
        this._buttonText = this._form.querySelector('.form__save-button');
    }

    _getInputValues(){ 
        this.formValues = {}; 
        this._inputList.forEach(input => { 
            this.formValues[input.name] = input.value; 
        });
        return this.formValues; 
    }; 
    
    close(){
        this._form.reset();
        super.close();
    };

    setButtonText = (text) => {
        this._buttonText.textContent = text;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues())
        });
        };

}
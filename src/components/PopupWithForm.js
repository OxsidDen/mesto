import Popup from "./Popup.Js";

export default class PopupWithForm extends Popup{

    constructor({popupSelector, formSubmit, loadingText, defoltText}){
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._popupForm = this._popup.querySelector('.form');
        this._formSubmit = formSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
        this._buttonText = this._form.querySelector('.form__save-button').textContent;
        this._loadingText = loadingText;
        this._defoltText = defoltText;
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

    loading(status){
        if(status){
            this._buttonText = this._loadingText;
        }
        else{
            this._buttonText = this._defoltText;
        }
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', this._formSubmit);
    };

}
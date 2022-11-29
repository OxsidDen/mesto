export class FormValidation {

    constructor(form){
        this.form = document.querySelector(form);
        this.errorInputClass = "form__input_error";
        this.errorTextClass = "form__input-error_able";
        this.saveButtonSelector = ".form__save-button";
        this.saveButtonDisableClass = "form__save-button_disable";
        this.inputSelector = ".form__input";
    }

    _hideError( inputEl, errorEl, errorInputClass, errorTextClass ){
        inputEl.classList.remove(errorInputClass);
        errorEl.textContent = '';
        errorEl.classList.remove(errorTextClass);
    }

    _showError( inputEl,errorEl, errorReport, errorInputClass, errorTextClass ){
        inputEl.classList.add(errorInputClass);
        errorEl.textContent = errorReport;
        errorEl.classList.add(errorTextClass);
    }

    _testValid(formEl, inputEl, errorInputClass, errorTextClass){
        const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
        if (!inputEl.validity.valid) {
            this._showError( inputEl, errorEl, inputEl.validationMessage, errorInputClass, errorTextClass);
        } else {
            this._hideError( inputEl, errorEl, errorInputClass, errorTextClass);
        }
    }

    _hasInvalidInput(inputArray){
        return inputArray.some((inputEl) => {
            return !inputEl.validity.valid;
        });
    }

    _enableButton(buttonEl, saveButtonDisableClass){
        buttonEl.classList.remove(saveButtonDisableClass);
        buttonEl.disabled = false;
    }

    _disableButton(buttonEl, saveButtonDisableClass){
        buttonEl.classList.add(saveButtonDisableClass);
        buttonEl.disabled = true;
    }

    _switchButton(inputArray, buttonEl, saveButtonDisableClass){
        if (this._hasInvalidInput(inputArray)) {
            this._disableButton(buttonEl, saveButtonDisableClass);
        }
        else {
            this._enableButton(buttonEl, saveButtonDisableClass);
        }
    }

    _setEventListeners(formEl, errorInputClass, errorTextClass, saveButtonSelector, saveButtonDisableClass, inputSelector){
        const inputArray = Array.from(formEl.querySelectorAll(inputSelector));
        const buttonEl = formEl.querySelector(saveButtonSelector);
        this._disableButton(buttonEl, saveButtonDisableClass);
        inputArray.forEach((inputEl) => {
            inputEl.addEventListener('input', () => {
                this._testValid(formEl, inputEl, errorInputClass, errorTextClass);
                this._switchButton(inputArray, buttonEl, saveButtonDisableClass);
            });
        });
    }

    _enableValid(){
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this.form, this.errorInputClass, 
            this.errorTextClass, this.saveButtonSelector,
            this.saveButtonDisableClass, this.inputSelector);
        
    }
}
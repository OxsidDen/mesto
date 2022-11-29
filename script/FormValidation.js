export class FormValidation {

    constructor(selector, form){
        this._form = form;
        this._errorInputClass =  selector.errorInputClass;
        this._errorTextClass =  selector.errorTextClass;
        this._saveButtonSelector = form.querySelector(selector.saveButtonSelector);
        this._saveButtonDisableClass =  selector.saveButtonDisableClass;
        this._inputSelectors = form.querySelectorAll(selector.inputSelector);
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

    _setEventListeners(formEl, errorInputClass, errorTextClass, saveButtonSelector, saveButtonDisableClass){
        const inputArray = Array.from( this._inputSelectors);
        this._disableButton( this._saveButtonSelector, saveButtonDisableClass);
        inputArray.forEach((inputEl) => {
            inputEl.addEventListener('input', () => {
                this._testValid(formEl, inputEl, errorInputClass, errorTextClass);
                this._switchButton(inputArray,  this._saveButtonSelector, saveButtonDisableClass);
            });
        });
    }

    enableValidation(){
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._form, this._errorInputClass, 
            this._errorTextClass, this._saveButtonSelector,
            this._saveButtonDisableClass);
        
    }
}
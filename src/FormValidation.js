export class FormValidation {

    constructor(selectors, form){
        this._form = form;
        this._errorInputClass =  selectors.errorInputClass;
        this._errorTextClass =  selectors.errorTextClass;
        this._saveButton = form.querySelector(selectors.saveButtonSelector);
        this._saveButtonDisableClass =  selectors.saveButtonDisableClass;
        this._inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
    }

    _hideError( inputEl, errorEl ){
        inputEl.classList.remove(this._errorInputClass);
        errorEl.textContent = '';
        errorEl.classList.remove(this._errorTextClass);
    }

    _showError( inputEl,errorEl, errorReport ){
        inputEl.classList.add(this._errorInputClass);
        errorEl.textContent = errorReport;
        errorEl.classList.add(this._errorTextClass);
    }

    _testValid(inputEl){
        const errorEl = this._form.querySelector(`.${inputEl.id}-error`);
        if (!inputEl.validity.valid) {
            this._showError(inputEl, errorEl, inputEl.validationMessage);
        } else {
            this._hideError(inputEl, errorEl);
        }
    }

    _hasInvalidInput(){
        return this._inputList.some((inputEl) => {
            return !inputEl.validity.valid;
        });
    }

    _enableButton(){
        this._saveButton.classList.remove(this._saveButtonDisableClass);
        this._saveButton.disabled = false;
    }

    disableButton(){
        this._saveButton.classList.add(this._saveButtonDisableClass);
        this._saveButton.disabled = true;
    }

    _switchButton(){
        if (this._hasInvalidInput()) {
            this.disableButton();
        }
        else {
            this._enableButton();
        }
    }

    _setEventListeners(){
        this.disableButton();
        this._inputList.forEach((inputEl) => {
            inputEl.addEventListener('input', () => {
                this._testValid(inputEl);
                this._switchButton();
            });
        });
    }

    enableValidation(){
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
        
    }
}
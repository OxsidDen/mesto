const hideError = ( inputEl, errorEl, errorInputClass, errorTextClass) => {   
    inputEl.classList.remove(errorInputClass);
    errorEl.textContent = '';
    errorEl.classList.remove(errorTextClass);
};

const showError = (inputEl,errorEl, errorReport, errorInputClass, errorTextClass) => {
    inputEl.classList.add(errorInputClass);
    errorEl.textContent = errorReport;
    errorEl.classList.add(errorTextClass);
};

const testValid = (formEl, inputEl, errorInputClass, errorTextClass) => {
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    if (!inputEl.validity.valid) {
        showError( inputEl, errorEl, inputEl.validationMessage, errorInputClass, errorTextClass);
    } else {
        hideError( inputEl, errorEl, errorInputClass, errorTextClass);
    }
};

const hasInvalidInput = (inputArray) => {
    return inputArray.some((inputEl) => {
        return !inputEl.validity.valid;
    });
};

const enableButton = (buttonEl, saveButtonDisableClass) => {
    buttonEl.classList.remove(saveButtonDisableClass);
    buttonEl.disabled = false;
}

const disableButton = (buttonEl, saveButtonDisableClass) => {
    buttonEl.classList.add(saveButtonDisableClass);
    buttonEl.disabled = true;
}

const switchButton = (inputArray, buttonEl, saveButtonDisableClass) => {
    if (hasInvalidInput(inputArray)) {
        disableButton(buttonEl, saveButtonDisableClass);
    }
    else {
        enableButton(buttonEl, saveButtonDisableClass);
    }
};

const setEventListeners = (formEl, errorInputClass, errorTextClass, saveButtonSelector, saveButtonDisableClass, inputSelector) => {
    const inputArray = Array.from(formEl.querySelectorAll(inputSelector));
    const buttonEl = formEl.querySelector(saveButtonSelector);
    disableButton(buttonEl, saveButtonDisableClass);
    inputArray.forEach((inputEl) => {
        inputEl.addEventListener('input', () => {
            testValid(formEl, inputEl, errorInputClass, errorTextClass);
            switchButton(inputArray, buttonEl, saveButtonDisableClass);
        });
    });
};

const enableValid = (config) => {
    const formArray = Array.from(document.querySelectorAll(config.formSelector));
    formArray.forEach((formEl) => {
        formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formEl, config.errorInputClass, 
            config.errorTextClass, config.saveButtonSelector,
            config.saveButtonDisableClass, config.inputSelector);
    });
};

enableValid({
    formSelector: ".form",
    inputSelector: ".form__input",
    errorInputClass: "form__input_error'",
    errorTextClass: "form__input-error_able",
    saveButtonSelector: ".form__save-button",
    saveButtonDisableClass: "form__save-button_disable"
});
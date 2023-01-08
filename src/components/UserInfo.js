export default class UserInfo {

constructor({nameSelector, aboutSelector}){
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._aboutInput = document.querySelector('#form__about');
    this._nameInput = document.querySelector('#form__name');
}

getUserInfo(){
    this._nameInput.value = this._nameSelector.textContent
    this._aboutInput.value = this._aboutSelector.textContent
}

setUserInfo(){
    this._nameSelector.textContent = this._nameInput.value;
    this._aboutSelector.textContent = this._aboutInput.value;
}

}
export default class UserInfo {

constructor({nameSelector, aboutSelector, getProf}){
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._aboutInput = document.querySelector('#form__about');
    this._nameInput = document.querySelector('#form__name');
    this._profile = getProf;
    this._id = getProf._id
}

getUserInfo(){
    this._nameInput.value =  this._nameSelector.textContent;
    this._aboutInput.value = this._aboutSelector.textContent;
}

setUserInfo(){
    this._nameSelector.textContent = this._nameInput.value;
    this._aboutSelector.textContent = this._aboutInput.value;
}

myId(){
    return this._id;
}
}
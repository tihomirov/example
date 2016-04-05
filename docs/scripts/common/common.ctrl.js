"use strict";
(function () {

    var Routing = app.Routing;

    app.Common.CommonCtrl = {
        validateName: validateName,
        validateMail: validateMail,
        addItemForm: addItemForm
    };

    function validateName() {

        var nameInput = this;
        var btnDisabled = document.querySelector('.button-save');
        var parentElement = nameInput.parentElement;
        var labelInput = parentElement.querySelector('.label');

        if (!nameInput.value) {
            addClass.call(parentElement, 'has-error');
            labelInput.textContent = "Name is required";
            btnDisabled.disabled = true;
            return false
        }
        if (nameInput.value.length < 3) {
            addClass.call(parentElement, 'has-error');
            labelInput.textContent = "Name is too hort";
            btnDisabled.disabled = true;
            return false
        }
        if (nameInput.value.length > 20) {
            addClass.call(parentElement, 'has-error');
            labelInput.textContent = "Name is too large";
            btnDisabled.disabled = true;
            return false
        }

        labelInput.textContent = "Name";
        removeClass.call(parentElement, 'has-error');
        btnDisabled.disabled = false;
        return true
    }

    function validateMail() {

        var emailInput = this;
        var btnDisabled = document.querySelector('.button-save');
        var parentElement = emailInput.parentElement;
        var labelInput = parentElement.querySelector('.label');

        if (!emailInput.value) {
            addClass.call(parentElement, 'has-error');
            labelInput.textContent = "Email is required";
            btnDisabled.disabled = true;
            return false
        }
        if (!(/^\w+@\w+\.\w{2,4}$/).test(emailInput.value)) {
            addClass.call(parentElement, 'has-error');
            labelInput.textContent = "Incorrect email";
            btnDisabled.disabled = true;
            return false
        }

        labelInput.textContent = "Mail";
        removeClass.call(parentElement, 'has-error');
        btnDisabled.disabled = false;

        return true
    }

    function addItemForm(){

        var currentUrl = Routing.getUrl();

        if (currentUrl === '/companies') {
            return app.Companies.CompaniesCtrl.openCompanyForm();
        }
        if(currentUrl === '/users') {
            return app.Users.UsersCtrl.openUserForm();
        }
    }

    function addClass(){
        for(var i = 0, len = arguments.length; i < len; i++){
            this.classList.add(arguments[i]);
        }
    }

    function removeClass(){
        for(var i = 0, len = arguments.length; i < len; i++){
            this.classList.remove(arguments[i]);
        }
    }

}());
"use strict";
(function () {

    app.Users.UsersComponents = {
        user: user,
        form: form
    };

    function user(user) {
        var clone = document.querySelector('.user-content');
        var userLi = clone.cloneNode(true);
        userLi.setAttribute('data-user-id', user.id);
        userLi.classList.remove('hide');

        userLi.querySelector('.f-name-fild').textContent = user.firstName;
        userLi.querySelector('.l-name-fild').textContent = user.lastName;
        userLi.querySelector('.email-fild').textContent = user.mail;

        var editButton = userLi.querySelector(".button-edit");
        var deleteButton = userLi.querySelector(".button-delete");

        editButton.addEventListener("click", app.Users.UsersCtrl.openUserForm.bind(user));
        deleteButton.addEventListener("click", app.Users.UsersCtrl.deleteUser.bind(user));


        return userLi;
    }

    function form(user) {

        var userForm = document.querySelector('[data-edit-user-form=\'' + user.id + '\']');
        var inputName = userForm.querySelector('[data-input-name=input-user-name]');
        var inputSurname = userForm.querySelector('[data-input-surname=input-user-surname]');
        var inputMail = userForm.querySelector('[data-input-mail=input-user-mail]');

        inputName.value = user.firstName;
        inputSurname.value = user.lastName;
        inputMail.value = user.mail;

        var saveButton = userForm.querySelector(".button-save");
        var closeButton = userForm.querySelector(".button-close");
        var nameInput = userForm.querySelector("[data-input-name=input-user-name]");
        var mailInput = userForm.querySelector("[data-input-mail=input-user-mail]");

        saveButton.addEventListener("click", app.Users.UsersCtrl.saveUser.bind(user));
        closeButton.addEventListener("click", app.Users.UsersCtrl.closeForm.bind(user));
        nameInput.addEventListener("input", app.Common.CommonCtrl.validateName.bind(nameInput));
        mailInput.addEventListener("input", app.Common.CommonCtrl.validateMail.bind(mailInput));

    }

}());
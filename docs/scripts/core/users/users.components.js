"use strict";
(function () {

    app.Users.UsersComponents = {
        user: user,
        form: form
    };

    function user(user) {

        var userLine = document.createElement('li');

        userLine.setAttribute('data-user-id', user.id);
        userLine.setAttribute('class', 'user-content');

        var userRow = '<div class="user-name">' + user.firstName + '</div>' +
            '<div class="user-address">' + user.lastName + '</div>' +
            '<div class="user-email">' + user.mail + '</div>';

        var userHtml = '<div class="user-element">' + userRow +
            '<div class="buttons">' + '<input type="button" class="button-edit" title="Edit Company">'
            + '<input type="button" class="button-delete" title="Delete Company">' + '</div>' + '</div>';

        userLine.innerHTML = userHtml;

        var editButton = userLine.querySelector(".button-edit");
        var deleteButton = userLine.querySelector(".button-delete");

        editButton.addEventListener("click", app.Users.UsersCtrl.openUserForm.bind(user));
        deleteButton.addEventListener("click", app.Users.UsersCtrl.deleteUser.bind(user));

        return userLine;
    }

    function form(user) {
        var userForm = document.createElement('div');
        userForm.className = " edit-user-form";

        var form = '<form name="forma" class="form" data-edit-user-form=' + user.id + '>'
            + '<div  class="input-name">' + '<span class="label">' + "First Name" + '</span>'
            + '<input data-input-name="input-user-name" name="firstName" size="20" placeholder="FirstName" value=' + user.firstName + '>' + '</div>'
            + '<div>' + '<span>' + "Last Name" + '</span>' + '<input  name="lastName"  size="20" placeholder="LastName" value=' + user.lastName + ' >' + '</div>'
            + '<div class="input-mail">' + '<span class="label">' + "Mail" + '</span>'
            + '<input data-input-mail="input-user-mail" type="email" name="mail"  size="20" placeholder="Mail" value=' + user.mail + '>' + '</div>'
            + '<div class="user-form-button">' + '<input type="button" class="button-save">'
            + '<input type="button" class="button-close">' + '</div>' + '</form>';

        userForm.innerHTML = form;

        var saveButton = userForm.querySelector(".button-save");
        var closeButton = userForm.querySelector(".button-close");
        var nameInput = userForm.querySelector("[data-input-name=input-user-name]");
        var mailInput = userForm.querySelector("[data-input-mail=input-user-mail]");

        saveButton.addEventListener("click", app.Users.UsersCtrl.saveUser.bind(user));
        closeButton.addEventListener("click", app.Users.UsersCtrl.closeForm.bind(user));
        nameInput.addEventListener("input", app.Common.CommonCtrl.validateName.bind(nameInput));
        mailInput.addEventListener("input", app.Common.CommonCtrl.validateMail.bind(mailInput));

        return userForm;
    }

}());
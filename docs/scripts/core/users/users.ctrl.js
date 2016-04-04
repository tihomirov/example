"use strict";
(function () {

    var Routing = app.Routing;
    var UserService = app.Users.UsersSrv;
    var CommonControl = app.Common.CommonCtrl;

    var users = UserService.getAllUsers();

    users.sort(function (a, b) {
        if (a.firstName > b.firstName) {
            return 1;
        }
        if (a.firstName < b.firstName) {
            return -1;
        }
        return 0;
    });
    
    app.Users.UsersCtrl = {
        renderUser: renderUser,
        renderUsers: renderUsers,
        openUserForm: openUserForm,
        saveUser: saveUser,
        deleteUser: deleteUser,
        closeForm: closeForm
    };

    function renderUser(user, isCreate, usersList) {
        if (!usersList) {
            var usersList = document.querySelector('.users-list');
        }

        if (!isCreate) {
            var oldUserElement = document.querySelector('[data-user-id=\'' + user.id + '\']');
        }

        var userElement = function() {
            var clone = document.querySelector('.user-content');
            var userLi = clone.cloneNode(true);
            userLi.setAttribute('data-user-id', user.id);
            userLi.classList.remove('hide');

            userLi.querySelector('.f-name-field').textContent = user.firstName;
            userLi.querySelector('.l-name-field').textContent = user.lastName;
            userLi.querySelector('.email-field').textContent = user.mail;

            var editButton = userLi.querySelector(".button-edit");
            var deleteButton = userLi.querySelector(".button-delete");

            editButton.addEventListener("click", app.Users.UsersCtrl.openUserForm.bind(user));
            deleteButton.addEventListener("click", app.Users.UsersCtrl.deleteUser.bind(user));


            return userLi;
        };

        if (isCreate) {
            usersList.appendChild(userElement());

        } else {
            usersList.replaceChild(userElement(), oldUserElement);
        }
    }

    function renderUsers() {

        Routing.setUrl('/users');

        document.querySelector('.users-link').style.textDecoration = 'underline';
        document.querySelector('.companies-link').style.textDecoration = 'none';
        if (users.length === 0) {
            return
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/app/scripts/core/users/users.tpl.html', true);

        xhr.onreadystatechange = function () {

            if (xhr.readyState != 4) return;
            if (this.status === 200) {
                document.getElementById('container').innerHTML = this.responseText;

                var userForm = document.querySelector('.add-user');
                userForm.setAttribute('data-user-id', 'undefined');

                var addButton = userForm.querySelector(".button-add");
                addButton.addEventListener("click", app.Common.CommonCtrl.addItemForm);

                var usersList = document.querySelector('.users-list');

                for (var i = 0; i < users.length; i++) {
                    renderUser(users[i], true, usersList);
                }

            }
        };

        xhr.send();
    }

    function openUserForm() {

        var user = this;

        if (user.id === undefined) {
            user = {firstName: "", lastName: "", mail: ""};
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/app/scripts/core/users/form.tpl.html', false);

        var userForma = document.createElement('div');
        userForma.className = " edit-user-form";
        userForma.setAttribute('data-edit-user-form', user.id);

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (this.status === 200) {
                userForma.innerHTML = this.responseText;
            }
        };

        xhr.send();

        var userElement = document.querySelector('[data-user-id=\'' + user.id + '\']');

        userElement.className =  user.id ? 'edit-user' : 'new-user';
        userElement.appendChild(userForma);
        form(user);

    }

    function saveUser(user) {

        var user = this;

        var form = document.querySelector("[data-edit-user-form='" + user.id + "']").firstChild;
        var isValidName = CommonControl.validateName.call(form.firstName);
        var isValidEmail = CommonControl.validateMail.call(form.mail);

        if (isValidName && isValidEmail) {
            var userDTO = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                mail: form.mail.value,
                id: user.id ? user.id : undefined
            };

            UserService.saveUser(userDTO, function (editUser) {
                closeForm(user);
                renderUser(editUser, !user.id);
            });
        }
    }

    function deleteUser() {

        var usersList = document.querySelector('.users-list');
        UserService.deleteUser(this.id, function (removeUser) {
            var oldUserElement = document.querySelector('[data-user-id=\'' + removeUser + '\']');
            usersList.removeChild(oldUserElement);
        });
    }

    function closeForm(user) {
        if (user === event) {
            var user = this;
        }

        var userElement = document.querySelector('[data-user-id=\'' + user.id + '\']');

        userElement.removeChild(userElement.lastChild);
        userElement.className =  user.id ?  'user-content' :'add-user';
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
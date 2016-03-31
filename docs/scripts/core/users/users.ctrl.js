"use strict";
(function () {

    var Routing = app.Routing;
    var UserService = app.Users.UsersSrv;
    var UsersComponents = app.Users.UsersComponents;
    var CommonControl = app.Common.CommonCtrl;

    var users = UserService.getAllUsers();

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
        var userElement = UsersComponents.user.call(app.UsersCtrl, user,isCreate,usersList);

        if (isCreate) {
            usersList.appendChild(userElement);

        } else {
            usersList.replaceChild(userElement, oldUserElement);
        }
    }

    function renderUsers() {

        Routing.setUrl('/users');

        document.querySelector('.users-link').style.textDecoration = 'underline';
        document.querySelector('.companies-link').style.textDecoration = 'none';
        if (users.length === 0) {
            return
        }

        var xhr= new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/app/scripts/core/users/users-tmp.html', false);

        xhr.onreadystatechange = function() {

            if (xhr.readyState != 4) return;
            if (this.status === 200) {
                document.getElementById('container').innerHTML= this.responseText;
            }
        };

        xhr.send();

        app.Common.CommonComponents.addButton();

        var usersList = document.querySelector('.users-list');

        for (var i = 0; i < users.length; i++) {
            renderUser(users[i], true, usersList);
        }

        var example = document.querySelector('.user-content.example');
        usersList.removeChild(example);
    }

    function openUserForm() {

        var user = this;

        if(user.id === undefined){
            user = {firstName: "", lastName: "", mail: ""};
        }

        var xhr= new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/app/scripts/core/users/form-tmp.html', false);

        var userForma = document.createElement('div');
        userForma.className = " edit-user-form";
        userForma.setAttribute('data-edit-user-form', user.id)

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (this.status === 200) {
                userForma.innerHTML =  this.responseText;
            }
        };

        xhr.send();

        var userElement = document.querySelector('[data-user-id=\'' + user.id + '\']');

        if (user.id !== undefined) {
            userElement.classList.add('edit');
            userElement.appendChild(userForma);
            UsersComponents.form.call(app.UsersCtrl,user);

        }else {
            userElement.appendChild(userForma);
            userElement.classList.add("new");
            UsersComponents.form.call(app.UsersCtrl,user);
        }
    }

    function saveUser(user) {

        var user = this;

        var form = document.querySelector("[data-edit-user-form='" + user.id + "']").firstChild;
        var isValidName = CommonControl.validateName.call(form.firstName);
        var isValidEmail = CommonControl.validateMail.call(form.mail);

        if(isValidName && isValidEmail) {
            var userDTO = {
                id: user.id ? user.id : undefined,
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                mail: form.mail.value
            };

            UserService.saveUser(userDTO, function (editUser) {
                if (user.id !== undefined) {
                    renderUser(editUser, false);
                } else {
                    renderUser(editUser, true);
                    var userElement = document.querySelector('[data-user-id=\'' + user.id + '\']');
                    userElement.removeChild(userElement.lastChild);
                    userElement.classList.remove("new");
                }
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
        var user= this;
        var userElement = document.querySelector('[data-user-id=\'' + user.id + '\']');

        if (user.id !== undefined) {
            userElement.classList.remove('edit');
            userElement.removeChild(userElement.lastChild)
        } else {
            userElement.removeChild(userElement.lastChild);
            userElement.classList.remove("new")
        }
    }

    //renderUsers();
}());
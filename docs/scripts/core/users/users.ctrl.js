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
        var userElement = UsersComponents.user.call(app.UsersCtrl, user);

        if (isCreate) {
            usersList.appendChild(userElement);
        } else {
            usersList.replaceChild(userElement, oldUserElement);
        }
    }

    function renderUsers() {

        Routing.setUrl('/users');


        debugger
        var xhr= new XMLHttpRequest();
        xhr.open('GET', '/mb_done2/new/myApp/scripts/core/users/users.html', true);
        xhr.onreadystatechange= function() {
            debugger
            if (this.readyState!==4) return;
            if (this.status!==200) return; // or whatever error handling you want
            document.getElementById('y').innerHTML= this.responseText;
        };
        xhr.send();

        return

        document.querySelector('.users-link').style.textDecoration = 'underline';
        document.querySelector('.companies-link').style.textDecoration = 'none';
        if (users.length === 0) {
            return
        }

        //var container = document.getElementById('container');
        //container.innerHTML = "<ul id='usersList'></ul>";
        var usersList = document.querySelector('.users-list');

        var buttonAddUser = document.createElement('li');
        buttonAddUser.setAttribute('data-user-id', 'undefined');
        buttonAddUser.className = 'add-user';
        buttonAddUser.innerHTML = app.Common.CommonComponents.addButton(users);
        usersList.appendChild(buttonAddUser);

        //var titleElement = document.createElement('li');
        //titleElement.className = 'title';
        //var titles = '';
        //var titleUser = {
        //    firstName: "First Name",
        //    lastName: "Last Name",
        //    mail: "Mail"
        //};
        //
        //for (var key in titleUser) {
        //    titles += '<div class=' + "property" + key + '>' + titleUser[key] + '</div>';
        //}
        //
        //var titlesContent = document.createElement('div');
        //titlesContent.className = 'titles';
        //
        //titlesContent.innerHTML = titles;
        //titleElement.appendChild(titlesContent);
        //usersList.appendChild(titleElement);

        for (var i = 0; i < users.length; i++) {
            renderUser(users[i], true, usersList);
        }
    }

    function openUserForm() {

        var user = this;

        Routing.setUrl('/users/edit/' + user.id);

        if(user.id === undefined){
            user = {firstName: "", lastName: "", mail: ""};
        }

        var userForm = UsersComponents.form.call(app.UsersCtrl,user);
        var userElement = document.querySelector('[data-user-id=\'' + user.id + '\']');

        if (user.id) {
            userElement.className = 'edit-user-content';
            userElement.appendChild(userForm);
        }else {
            var usersList = document.getElementById('usersList');
            var newUserForm = document.createElement('li');
            newUserForm.className = " new-user-form";
            newUserForm.appendChild(userForm);
            userElement.style.display = 'none';
            usersList.insertBefore(newUserForm, usersList.children[0]);
        }
    }

    function saveUser(user) {

        var user = this;

        var form = document.querySelector("[data-edit-user-form='" + user.id + "']");

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
                    usersList.removeChild(usersList.firstChild);
                    var userElement = document.querySelector('[data-user-id=\'' + user.id + '\']');
                    userElement.style.display = 'block';
                }
            });
        }
    }

    function deleteUser() {

        UserService.deleteUser(this.id, function (removeUser) {
            var oldUserElement = document.querySelector('[data-user-id=\'' + removeUser + '\']');
            usersList.removeChild(oldUserElement);
        });
    }

    function closeForm(user) {
        var user= this;
        var userElement = document.querySelector('[data-user-id=\'' + user.id + '\']');

        if (user.id !== undefined) {
            userElement.className = 'user-content';
            userElement.removeChild(userElement.lastChild)
        } else {
            usersList.removeChild(usersList.firstChild);
            userElement.style.display = 'block';
        }
    }

    //renderUsers();
}());
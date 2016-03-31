"use strict";
(function () {
    app.Common.CommonComponents = {
        addButton: addButton
    };

    function addButton() {
        var userForm = document.querySelector('.add-user');
        userForm.setAttribute('data-user-id', 'undefined');

        var addButton = userForm.querySelector(".button-add");
        addButton.addEventListener("click", app.Common.CommonCtrl.addItemForm);
    }
}());
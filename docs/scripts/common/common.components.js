"use strict";
(function () {
    app.Common.CommonComponents = {
        addButton: addButton
    };

    function addButton() {
        var buttonContent = '<div class="create-new">' + '<input  type="button" class="button-add" onclick="app.Common.CommonCtrl.addItemForm()">' + '</div>';
        return buttonContent;
    }

}());
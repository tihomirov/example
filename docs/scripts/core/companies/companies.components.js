"use strict";
(function () {

    app.Companies.CompaniesComponents = {
        company: company,
        form: form
    };

    function company(company) {

        var companyLine = document.createElement('li');

        companyLine.setAttribute('data-company-id', company.id);
        companyLine.setAttribute('class', 'company-content');

        var companyRow = '<div class="company-name">' + company.companyName + '</div>' +
            '<div class="company-address">' + company.adressCompany + '</div>' +
            '<div class="company-email">' + company.companyMail + '</div>';

        var companyHtml = '<div class="company-element">' + companyRow +
            '<div class="buttons">' + '<input type="button" class="button-edit" title="Edit Company" >'
            + '<input type="button" class="button-delete" title="Delete Company">' + '</div>' + '</div>';

        companyLine.innerHTML = companyHtml;

        var editButton = companyLine.querySelector(".button-edit");
        var deleteButton = companyLine.querySelector(".button-delete");

        editButton.addEventListener("click",  app.Companies.CompaniesCtrl.openCompanyForm.bind(company));
        deleteButton.addEventListener("click",  app.Companies.CompaniesCtrl.deleteCompany.bind(company));

        return companyLine;
    }

    function form(company) {
        var companyForm = document.createElement('div');
        companyForm.className = " edit-company-form";

        var form = '<form name="forma" class="form" data-edit-company-form=' + company.id + '>'
            + '<div class="input-name">' + '<span class="label">' + "Company Name" + '</span>'
            + '<input name="companyName" data-input-name="input-company-name" size="20"  placeholder="Company Name" value=' + company.companyName + '>' + '</div>'
            + '<div>' + '<span>' + "Company Adress" + '</span>' + '<input name="adressCompany"  size="20" placeholder="Company Adress" value=' + company.adressCompany + '>' + '</div>'
            + '<div class="input-mail">' + '<span class="label">' + "Company Mail" + '</span>'
            + '<input type="email" data-input-mail="input-company-mail"  name="companyMail" placeholder="Company Mail"  size="20"  value=' + company.companyMail + '>' + '</div>'
            + '<div class="company-form-button">' + '<input type="button" class="button-save">'
            + '<input type="button" class="button-close"' + '</div>' + '</form>';

        companyForm.innerHTML = form;

        var saveButton = companyForm.querySelector(".button-save");
        var closeButton = companyForm.querySelector(".button-close");
        var nameInput = companyForm.querySelector("[data-input-name=input-company-name]");
        var mailInput = companyForm.querySelector("[data-input-mail=input-company-mail]");

        saveButton.addEventListener("click", app.Companies.CompaniesCtrl.saveCompany.bind(company));
        closeButton.addEventListener("click", app.Companies.CompaniesCtrl.closeForm.bind(company));
        nameInput.addEventListener("input", app.Common.CommonCtrl.validateName.bind(nameInput));
        mailInput.addEventListener("input", app.Common.CommonCtrl.validateMail.bind(mailInput));

        return companyForm;
    }

}());
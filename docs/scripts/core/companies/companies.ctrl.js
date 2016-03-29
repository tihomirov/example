"use strict";
(function () {

    var Routing = app.Routing;
    var CompanyService = app.Companies.CompaniesSrv;
    var CompaniesComponents = app.Companies.CompaniesComponents;
    var CommonControl = app.Common.CommonCtrl;

    var companies = CompanyService.getAllCompanies();

    app.Companies.CompaniesCtrl = {
        renderCompany: renderCompany,
        renderCompanies: renderCompanies,
        openCompanyForm: openCompanyForm,
        saveCompany: saveCompany,
        deleteCompany: deleteCompany,
        closeForm: closeForm
    };

    function renderCompany(company, isCreate, companiesList) {

        if (!companiesList) {
            var companiesList = document.getElementById('companiesList');
        }
        if (!isCreate) {
            var oldCompanyElement = document.querySelector('[data-company-id=\'' + company.id + '\']');
        }
        var companyElement = CompaniesComponents.company.call(app.CompaniesCtrl, company);

        if (isCreate) {
            companiesList.appendChild(companyElement);
        } else {
            companiesList.replaceChild(companyElement, oldCompanyElement);
        }
    }

    function renderCompanies() {

        Routing.setUrl('/companies');

        document.querySelector('.companies-link').style.textDecoration = 'underline';
        document.querySelector('.users-link').style.textDecoration = 'none';
        if (companies.length === 0) {
            return
        }

        var container = document.getElementById('container');
        container.innerHTML = "<ul id='companiesList'></ul>";
        var companiesList = document.getElementById('companiesList');

        var buttonAddCompany = document.createElement('li');
        buttonAddCompany.setAttribute('data-company-id', 'undefined');
        buttonAddCompany.className = 'add-company';
        buttonAddCompany.innerHTML = app.Common.CommonComponents.addButton(companies);
        companiesList.appendChild(buttonAddCompany);

        var titleElement = document.createElement('li');
        titleElement.className = 'title';
        var titles = '';
        var titleCompany = {
            companyName: "Company Name",
            companyAdress: "Company Adress",
            companMail: "Company Mail"
        };

        for (var key in titleCompany) {
            titles += '<div class=' + "property" + key + '>' + titleCompany[key] + '</div>';
        }

        var titlesContent = document.createElement('div');
        titlesContent.className = 'titles';

        titlesContent.innerHTML = titles;
        titleElement.appendChild(titlesContent);
        companiesList.appendChild(titleElement);

        for (var i = 0; i < companies.length; i++) {
            renderCompany(companies[i], true, companiesList);
        }
    }

    function openCompanyForm() {

        var company = this;

        if (company.id === undefined) {
            company = {companyName: "", adressCompany: "", companyMail: ""};
        }

        var companyForm = CompaniesComponents.form.call(app.CompaniesCtrl, company);
        var companyElement = document.querySelector('[data-company-id=\'' + company.id + '\']');

        if (company.id) {
            companyElement.className = 'edit-company-content';
            companyElement.appendChild(companyForm)
        }
        else {
            var companiesList = document.getElementById('companiesList');
            var newCompanyForm = document.createElement('li');
            newCompanyForm.className = " new-company-form";
            newCompanyForm.appendChild(companyForm);
            companyElement.style.display = 'none';
            companiesList.insertBefore(newCompanyForm, companiesList.children[0]);
        }
    }

    function saveCompany(company) {

        var company = this;

        var form = document.querySelector('[data-edit-company-form=\'' + company.id + '\']');

        var isValidName = CommonControl.validateName.call(form.companyName);
        var isValidEmail = CommonControl.validateMail.call(form.companyMail);

        if (isValidName && isValidEmail) {

            var companyDTO = {
                id: company.id ? company.id : undefined,
                companyName: form.companyName.value,
                adressCompany: form.adressCompany.value,
                companyMail: form.companyMail.value
            };

            CompanyService.saveCompany(companyDTO, function (editCompany) {
                if (company.id !== undefined) {
                    renderCompany(editCompany, false);
                } else {
                    renderCompany(editCompany, true);
                    companiesList.removeChild(companiesList.firstChild);
                    var companyElement = document.querySelector('[data-company-id=\'' + company.id + '\']');
                    companyElement.style.display = 'block';
                }
            });
        }
    }

    function deleteCompany() {

        CompanyService.deleteCompany(this.id, function (removeCompany) {
            var oldCompanyElement = document.querySelector('[data-company-id=\'' + removeCompany + '\']');
            companiesList.removeChild(oldCompanyElement);
        });
    }

    function closeForm(company) {
        var company = this;
        var companyElement = document.querySelector('[data-company-id=\'' + company.id + '\']');

        if (company.id !== undefined) {
            companyElement.className = 'company-content';
            companyElement.removeChild(companyElement.lastChild)
        } else {
            companiesList.removeChild(companiesList.firstChild);
            companyElement.style.display = 'block';
        }
    }

}());

// Para organizaçao serao passados primeiros os pageObjects, depois os helpers e por fim os fixtures

import authenticationPage from "../../support/PageObjects/authenticationPage";
import inventoryPage from "../../support/PageObjects/inventoryPage";

import authHelper from "../../support/helpers/authHelper";
import verifyUrlHelper from "../../support/helpers/verifyUrlHelper";

import * as users from "../../fixtures/userCredentials.json";
import * as errors from "../../fixtures/errorMessages.json";


// Testes de autenticação com finalidade de validar o funcionamento correto do login

describe("Caso de uso - Autenticar", () => {
  beforeEach(() => {
    authHelper.visit();
  });

  it("Autenticar com credenciais válidas", () => {
    authenticationPage.username.type(users.standard_user.username);
    authenticationPage.password.type(users.standard_user.password);
    authenticationPage.loginButton.click();
    verifyUrlHelper.verifyInventory();
  });

  it("Autenticar com usuario inválido", () => {
    authenticationPage.username.type(users.incorrected_user.username);
    authenticationPage.password.type(users.incorrected_password.password);
    authenticationPage.loginButton.click();
    authenticationPage.errorMessage.should("have.text", errors.invalid_username.error);
  });

  it("Autenticar com senha inválida", () => {
    authenticationPage.username.type(users.standard_user.username);
    authenticationPage.password.type(users.incorrected_password.password);
    authenticationPage.loginButton.click();
    authenticationPage.errorMessage.should("have.text", errors.invalid_password.error);
  });

  it("Autenticar com usuário bloqueado", () => {
    authenticationPage.username.type(users.locked_out_user.username);
    authenticationPage.password.type(users.locked_out_user.password);
    authenticationPage.loginButton.click();
    authenticationPage.errorMessage.should("have.text", errors.locked_out_user.error);
  });

  it("Autenticar com usuário em branco", () => {
    authenticationPage.password.type(users.standard_user.password);
    authenticationPage.loginButton.click();
    authenticationPage.errorMessage.should("have.text", errors.empty_username.error);
  });

  it("Autenticar com senha em branco", () => {
    authenticationPage.username.type(users.standard_user.username);
    authenticationPage.loginButton.click();
    authenticationPage.errorMessage.should("have.text", errors.empty_password.error);
  });

  it("Autenticar com usuário e senha em branco", () => {
    authenticationPage.loginButton.click();
    authenticationPage.errorMessage.should("have.text", errors.empty_username.error);
  });

  it("Autenticar com usuário e senha válidos e sair", () => {
    authenticationPage.username.type(users.standard_user.username);
    authenticationPage.password.type(users.standard_user.password);
    authenticationPage.loginButton.click();
    verifyUrlHelper.verifyInventory();
    inventoryPage.burgerMenu.click();
    inventoryPage.logoutButton.click();
    verifyUrlHelper.verifyIndex();
  });
}); 
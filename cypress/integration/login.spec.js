import { loginPage } from "../support/pages/LoginPage.po"

describe("Testar página de Login", () => {
    const cadastrar = () => {
        cy.contains("button", "Registrar").click();
        cy.get(".card__register").within(() => {
            cy.get("input[name='email']").type("raro@raro.com", { force: true });
            cy.get("input[name='name']").type("Raro", { force: true });
            cy.get("input[name='password']").type("1234", { force: true });
            cy.get("input[name='passwordConfirmation']").type("1234", { force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
        cy.get("#btnCloseModal").click();
    };
    beforeEach(() => {
        loginPage.visitar();
    }); 

    it("Os campos email e senha são campos obrigatórios.", () => {
        loginPage.confirmarFormulario();
        cy.get(".card__login .input__warging:contains('É campo obrigatório')").should('have.length', 2);
    });

    it("Não deve ser possível realizar login com dados inválidos" , () => {
        loginPage.preencherFormulario("raro@raro.com", "1234")
        loginPage.confirmarFormulario();
        loginPage.verificarModalUsuarioInvalido();
    });

    it("Deve ser possível realizar login com dados válidos" , () => {
        cadastrar();
        loginPage.preencherFormulario("raro@raro.com", "1234")
        loginPage.confirmarFormulario();
        loginPage.verificarUrlHome();
    });
});
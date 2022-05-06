import { loginPage } from "../support/pages/LoginPage.po"

describe("Testar página de Login", () => {
    let dadosUsuario;
    beforeEach(() => {
        cy.fixture("user.json").then((informacoesUsuario) => {
            dadosUsuario = informacoesUsuario;
            window.localStorage.setItem(
                informacoesUsuario.email,
                JSON.stringify(informacoesUsuario)
            );
        });
        loginPage.visitar();
    }); 

    it("Os campos email e senha são campos obrigatórios.", () => {
        loginPage.confirmarFormulario();
        cy.get(".card__login .input__warging:contains('É campo obrigatório')").should('have.length', 2);
    });

    it("Deve ser possível realizar login com dados válidos" , () => {
        loginPage.preencherFormulario(dadosUsuario.email, dadosUsuario.password)
        loginPage.confirmarFormulario();
        loginPage.verificarUrlHome();
    });

    it("Não deve ser possível realizar login com dados inválidos" , () => {
        loginPage.preencherFormulario("raro@mail.com", "12354")
        loginPage.confirmarFormulario();
        loginPage.verificarModalUsuarioInvalido();
    });
});
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
        cy.visit("");
    }); 

    it("Os campos email e senha são campos obrigatórios.", () => {
        cy.contains("button", "Acessar").click();
        cy.get(".card__login .input__warging:contains('É campo obrigatório')").should('have.length', 2);
    });

    it("Não deve ser possível realizar login com dados inválidos" , () => {
        cy.get(".card__login [name='email']").type("raro@raro.com");
        cy.get(".card__login [name='password']").type("1234");
        cy.contains("button","Acessar").click();
        cy.contains("#modalText", "Usuário ou senha inválido.").should("be.visible")
    });

    it("Deve ser possível realizar login com dados válidos" , () => {
        cadastrar();
        cy.get(".card__login [name='email']").type("raro@raro.com");
        cy.get(".card__login [name='password']").type("1234");
        cy.contains("button","Acessar").click();
        cy.url().should("equal", "https://bugbank.netlify.app/home");
    });
});
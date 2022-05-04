import { registerPage } from "../../support/pages/RegisterPage.po";

describe("Teste do Cadastro do site BugBank", () => {
    const login = () => {
        cy.get(".card__login").within(() => {
            cy.get("input[name='email']").type("raro@raro.com");
            cy.get("input[name='password']").type("1234");
            cy.contains("button", "Acessar").click();
        });
    };
    const cadastrarSemSaldo = () => {
        cy.get(".card__register").within(() => {
            cy.get("input[name='email']").type("raro@raro.com", { force: true });
            cy.get("input[name='name']").type("Raro", { force: true });
            cy.get("input[name='password']").type("1234", { force: true });
            cy.get("input[name='passwordConfirmation']").type("1234", { force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
    };

    beforeEach(() => {
        cy.visit("");
        cy.contains("button", "Registrar").click();
    }); 

    it("Os campos nome, email, senha e confirmar senha são de preenchimento obrigatório", () => {
        cy.contains("button", "Cadastrar").click({ force: true });
        cy.get(".card__register .input__warging:contains('É campo obrigatório')").should('have.length', 4);
    });

    it("O campo nome não pode ser vazio", () => {
        cy.get(".card__register").within(() => {
            cy.get("input[name='email']").type("raro@raro.com", { force: true });
            cy.get("input[name='password']").type("1234", { force: true });
            cy.get("input[name='passwordConfirmation']").type("1234", { force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
        cy.contains("#modalText", "Nome não pode ser vazio").should("be.visible");
    });

    it("O campo email não pode ser vazio", () => {
        cy.get(".card__register").within(() => {
            cy.get("input[name='name']").type("Raro", { force: true });
            cy.get("input[name='password']").type("1234", { force: true });
            cy.get("input[name='passwordConfirmation']").type("1234", { force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
        cy.contains("#modalText", "Email não pode ser vazio").should("be.visible"); 
    });

    it("O campo senha não pode ser vazio", () => {
        cy.get(".card__register").within(() => {
            cy.get("input[name='email']").type("raro@raro.com", { force: true });
            cy.get("input[name='name']").type("Raro", { force: true });
            cy.get("input[name='passwordConfirmation']").type("1234", { force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
        cy.contains("#modalText", "Senha não pode ser vazio").should("be.visible");
    });

    it("O campo confirmar senha não pode ser vazio", () => {
        cy.get(".card__register").within(() => {
            cy.get("input[name='email']").type("raro@raro.com", { force: true });
            cy.get("input[name='name']").type("Raro", { force: true });
            cy.get("input[name='password']").type("1234", { force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
        cy.contains("#modalText", "Confirmar senha não pode ser vazio").should("be.visible");
    });

    it("Deve ser possível criar conta com saldo", () => {
        cy.get(".card__register").within(() => {
            cy.get("input[name='email']").type("raro@raro.com", { force: true });
            cy.get("input[name='name']").type("Raro", { force: true });
            cy.get("input[name='password']").type("1234", { force: true });
            cy.get("input[name='passwordConfirmation']").type("1234", { force: true });
            cy.get("#toggleAddBalance").click({ force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
        cy.get("#btnCloseModal").click();

        login();
        cy.contains("#textBalance", "Saldo em conta R$ 1.000,00");     
    });

    it("Deve ser possível criar conta sem saldo", () => {
        cy.get(".card__register").within(() => {
            cy.get("input[name='email']").type("raro@raro.com", { force: true });
            cy.get("input[name='name']").type("Raro", { force: true });
            cy.get("input[name='password']").type("1234", { force: true });
            cy.get("input[name='passwordConfirmation']").type("1234", { force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
        cy.get("#btnCloseModal").click();

        login();
        cy.contains("#textBalance", "Saldo em conta R$ 0,00");     
    });

    it("Não deve ser possível preencher os campos senha e confirmação de senha com dados diferentes", () => {
        cy.get(".card__register").within(() => {
            cy.get("input[name='email']").type("raro@raro.com", { force: true });
            cy.get("input[name='name']").type("Raro", { force: true });
            cy.get("input[name='password']").type("123", { force: true });
            cy.get("input[name='passwordConfirmation']").type("1234", { force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
        cy.contains("#modalText", "As senhas não são iguais.").should("be.visible");  
    });

    it("Deve ser possível visualizar número da conta ao ser criada com sucesso", () => {
        cy.get(".card__register").within(() => {
            cy.get("input[name='email']").type("raro@raro.com", { force: true });
            cy.get("input[name='name']").type("Raro", { force: true });
            cy.get("input[name='password']").type("1234", { force: true });
            cy.get("input[name='passwordConfirmation']").type("1234", { force: true });
            cy.contains("button", "Cadastrar").click({ force: true });
        });
        cy.contains("#modalText", /A conta [0-9][0-9][0-9]-[0-9] foi criada com sucesso/).should("be.visible"); 
    });

    it("Deve ser possível fechar o modal de cadastro com sucesso com o botão fechar do header", () => {
        cadastrarSemSaldo();
        cy.contains("#btnCloseModal", "Fechar").should("be.visible");
        cy.contains("#btnCloseModal", "Fechar").click();
        cy.contains("#btnCloseModal", "Fechar").should("not.exist");
    });
    
    it.only("Deve ser possível fechar o modal de cadastro com sucesso com o botão fechar do footer", () => {
        cadastrarSemSaldo();
        cy.contains("#btnCloseModal", "Fechar").should("be.visible");
        cy.contains("#btnCloseModal", "Fechar").click();
        cy.contains("#btnCloseModal", "Fechar").should("not.exist");
    });
});

describe("Teste do Cadastro do site BugBank", () => {
    const login = () => {
        cy.get(".card__login input[name='email']").click().type("raro@raro.com");
        cy.get(".card__login input[name='password']").click().type("1234");
        cy.contains("button", "Acessar").click();
    };

    beforeEach(() => {
        cy.visit("https://bugbank.netlify.app/");
        cy.contains("button", "Registrar").click();
        cy.wait(2000);
    }); 

    it("Os campos são de preenchimento obrigatório", () => {
        cy.contains("button", "Cadastrar").click({force: true});
        cy.get(".card__register .input__warging:contains('É campo obrigatório')").should('have.length', 4);
    });

    it("O campo nome não pode ser vazio", () => {
        cy.get(".card__register input[name='email']").click({force: true}).type("raro@raro.com");
        cy.get(".card__register input[name='password']").click({force: true}).type("1234");
        cy.get(".card__register input[name='passwordConfirmation']").click({force: true}).type("1234");
        cy.contains("button", "Cadastrar").click({force: true});
        cy.wait(2000);
        cy.contains("#modalText", "Nome não pode ser vazio");
    });

    it("O campo email não pode ser vazio", () => {
        cy.get(".card__register input[name='name']").click({force: true}).type("Raro");
        cy.get(".card__register input[name='password']").click({force: true}).type("1234");
        cy.get(".card__register input[name='passwordConfirmation']").click({force: true}).type("1234");
        cy.contains("button", "Cadastrar").click({force: true});
        cy.wait(2000);
        cy.contains("#modalText", "Email não pode ser vazio");
    });

    it("O campo senha não pode ser vazio", () => {
        cy.get(".card__register input[name='email']").click({force: true}).type("raro@raro.com");
        cy.get(".card__register input[name='name']").click({force: true}).type("Raro");
        cy.get(".card__register input[name='passwordConfirmation']").click({force: true}).type("1234");
        cy.contains("button", "Cadastrar").click({force: true});
        cy.wait(2000);
        cy.contains("#modalText", "Senha não pode ser vazio");
    });

    it("O campo confirmar senha não pode ser vazio", () => {
        cy.get(".card__register input[name='email']").click({force: true}).type("raro@raro.com");
        cy.get(".card__register input[name='name']").click({force: true}).type("Raro");
        cy.get(".card__register input[name='password']").click({force: true}).type("1234");
        cy.contains("button", "Cadastrar").click({force: true});
        cy.wait(2000);
        cy.contains("#modalText", "Confirmar senha não pode ser vazio");
    });

    it("Deve ser possível criar conta com saldo", () => {
        cy.get(".card__register input[name='email']").click({force: true}).type("raro@raro.com");
        cy.get(".card__register input[name='name']").click({force: true}).type("Raro");
        cy.get(".card__register input[name='password']").click({force: true}).type("1234");
        cy.get(".card__register input[name='passwordConfirmation']").click({force: true}).type("1234");
        cy.get("#toggleAddBalance").click({force: true});
        cy.contains("button", "Cadastrar").click({force: true});
        cy.wait(2000);
        cy.get("#btnCloseModal").click();

        login();
        cy.contains("#textBalance", "Saldo em conta R$ 1.000,00");     
    });

    it("Deve ser possível criar conta sem saldo", () => {
        cy.get(".card__register input[name='email']").click({force: true}).type("raro@raro.com");
        cy.get(".card__register input[name='name']").click({force: true}).type("Raro");
        cy.get(".card__register input[name='password']").click({force: true}).type("1234");
        cy.get(".card__register input[name='passwordConfirmation']").click({force: true}).type("1234");
        cy.contains("button", "Cadastrar").click({force: true});
        cy.wait(2000);
        cy.get("#btnCloseModal").click();

        login();
        cy.contains("#textBalance", "Saldo em conta R$ 0,00");     
    });

    it("Não deve ser possível preencher os campos senha e confirmação de senha com dados diferentes", () => {
        cy.get(".card__register input[name='email']").click({force: true}).type("raro@raro.com");
        cy.get(".card__register input[name='name']").click({force: true}).type("Raro");
        cy.get(".card__register input[name='password']").click({force: true}).type("123");
        cy.get(".card__register input[name='passwordConfirmation']").click({force: true}).type("1234");
        cy.contains("button", "Cadastrar").click({force: true}); 
        cy.wait(2000);
        cy.contains("#modalText", "As senhas não são iguais.");  
    });

    // xit("Deve ser possível visualizar número da conta ao ser criada com sucesso", () => {
    //     cy.get(".card__register input[name='email']").click({force: true}).type("raro@raro.com");
    //     cy.get(".card__register input[name='name']").click({force: true}).type("Raro");
    //     cy.get(".card__register input[name='password']").click({force: true}).type("1234");
    //     cy.get(".card__register input[name='passwordConfirmation']").click({force: true}).type("1234");
    //     cy.contains("button", "Cadastrar").click({force: true});
    //     cy.wait(2000);
    //     cy.contains("#modalText", "A conta XXX-X foi criada com sucesso");  
    // });
});

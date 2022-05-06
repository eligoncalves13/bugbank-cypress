import { registerPage } from "../support/pages/RegisterPage.po";

describe("Teste do Cadastro do site BugBank", () => {
    const login = () => {
        cy.get(".card__login").within(() => {
            cy.get("input[name='email']").type("raro@raro.com");
            cy.get("input[name='password']").type("1234");
            cy.contains("button", "Acessar").click();
        });
    };
    
    beforeEach(() => {
        registerPage.visitar();
        registerPage.abrirFormularioCadastro();
    }); 

    it("Os campos nome, email, senha e confirmar senha são de preenchimento obrigatório", () => {
        registerPage.confirmarFormulario();
        registerPage.verficarMensagemDeCamposObrigatorios();
    });

    it("O campo nome não pode ser vazio", () => {
        registerPage.preencherEmail("raro@raro.com");
        registerPage.preencherSenha("1234");
        registerPage.preencherConfirmarSenha("1234");
        registerPage.confirmarFormulario();
        registerPage.verificarModalDeCampoVazio("Nome");
    });

    it("O campo email não pode ser vazio", () => {
        registerPage.preencherNome("Raro");
        registerPage.preencherSenha("1234");
        registerPage.preencherConfirmarSenha("1234");
        registerPage.confirmarFormulario();
        registerPage.verificarModalDeCampoVazio("Email");
    });

    it("O campo senha não pode ser vazio", () => {
        registerPage.preencherEmail("raro@raro.com");
        registerPage.preencherNome("Raro");
        registerPage.preencherConfirmarSenha("1234");    
        registerPage.confirmarFormulario();
        registerPage.verificarModalDeCampoVazio("Senha");
    });

    it("O campo confirmar senha não pode ser vazio", () => {
        registerPage.preencherEmail("raro@raro.com");
        registerPage.preencherNome("Raro");
        registerPage.preencherSenha("1234");
        registerPage.confirmarFormulario();
        registerPage.verificarModalDeCampoVazio("Confirmar senha");
    });

    it("Deve ser possível criar conta com saldo", () => {
        registerPage.preencherFormulario("raro@raro.com", "Raro", "1234", "1234");
        registerPage.adicionarSaldo();
        registerPage.confirmarFormulario();
        registerPage.fecharModalDeContaCriada("#btnCloseModal", "Fechar");

        login();
        registerPage.verificarTextoDeSaldo("1.000,00");

    });

    it("Deve ser possível criar conta sem saldo", () => {
        registerPage.preencherFormulario("raro@raro.com", "Raro", "1234", "1234");
        registerPage.confirmarFormulario();
        registerPage.fecharModalDeContaCriada("#btnCloseModal", "Fechar");

        login();
        registerPage.verificarTextoDeSaldo("0,00");   
    });

    it("Não deve ser possível preencher os campos senha e confirmação de senha com dados diferentes", () => {
        registerPage.preencherEmail("raro@raro.com");
        registerPage.preencherNome("Raro");
        registerPage.preencherSenha("1234");
        registerPage.preencherConfirmarSenha("12345");  
        registerPage.confirmarFormulario();
        registerPage.verificarModalDeSenhasDiferentes();
    });

    it("Deve ser possível visualizar número da conta ao ser criada com sucesso", () => {
        registerPage.preencherEmail("raro@raro.com");
        registerPage.preencherNome("Raro");
        registerPage.preencherSenha("1234");
        registerPage.preencherConfirmarSenha("1234");  
        registerPage.confirmarFormulario();
        registerPage.verificarModaldeContaCriada();
    });

    it("Deve ser possível fechar o modal de cadastro com sucesso com o botão fechar do header", () => {
        registerPage.preencherFormulario("raro@raro.com", "Raro", "1234", "1234");
        registerPage.confirmarFormulario();
        registerPage.verificarVisibilidadeBotaoFecharModal("a[href='#']", "x")
        registerPage.fecharModalDeContaCriada("a[href='#']", "x");
        registerPage.verificarExistenciaBotaoFecharModal("a[href='#']", "x");
    });
    
    it("Deve ser possível fechar o modal de cadastro com sucesso com o botão fechar do footer", () => {
        registerPage.preencherFormulario("raro@raro.com", "Raro", "1234", "1234");
        registerPage.confirmarFormulario();
        registerPage.verificarVisibilidadeBotaoFecharModal("#btnCloseModal", "Fechar")
        registerPage.fecharModalDeContaCriada("#btnCloseModal", "Fechar");
        registerPage.verificarExistenciaBotaoFecharModal("#btnCloseModal", "Fechar");
    });
});

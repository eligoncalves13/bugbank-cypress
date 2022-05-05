class LoginPage {
    formularioDeLogin = ".card__login";
    inputEmail = "input[name='email']";
    inputSenha = "input[name='password']";

    visitar() {
        cy.visit("")
    };

    preencherFormulario(email, senha) {
        cy.get(this.formularioDeLogin).within(() => {
            this.preencherEmail(email);
            this.preencherSenha(senha);
        });
    };

    preencherEmail(email) {
        cy.get(this.inputEmail).type(email);
    };
    
    preencherSenha(senha) {
        cy.get(this.inputSenha).type(senha);
    };

    confirmarFormulario() {
        cy.contains("button", "Acessar").click();
    };

    verificarModalUsuarioInvalido(){
        cy.contains("#modalText", "Usuário ou senha inválido.").should("be.visible");
    };

    verificarUrlHome(){
        cy.url().should("equal", "https://bugbank.netlify.app/home");
    };

    
};

export var loginPage = new LoginPage();
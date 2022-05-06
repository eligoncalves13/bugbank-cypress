class RegisterPage {
    formularioDeRegistro = ".card__register";
    inputEmail = "input[name='email']";
    inputNome = "input[name='name']";
    inputSenha = "input[name='password']";
    inputConfirmarSenha = "input[name='passwordConfirmation']";
    toggleAdicionarSaldo = "#toggleAddBalance";

    visitar() {
        cy.visit("");
    };

    abrirFormularioCadastro() {
        cy.contains("button", "Registrar").click();
    };

    preencherFormulario(email, nome, senha, confirmarSenha) {
        // cy.get(this.formularioDeRegistro).within(() => {
            this.preencherEmail(email);
            this.preencherNome(nome);
            this.preencherSenha(senha);
            this.preencherConfirmarSenha(confirmarSenha);
        // });
    };

    preencherEmail(email) {
        cy.get(this.formularioDeRegistro + " " + this.inputEmail).type(email, { force: true });
    };

    preencherNome(nome) {
        cy.get(this.formularioDeRegistro + " " + this.inputNome).type(nome, { force: true });
    };

    preencherSenha(senha) {
        cy.get(this.formularioDeRegistro + " " + this.inputSenha).type(senha, { force: true });
    };

    preencherConfirmarSenha(confirmarSenha) {
        cy.get(this.formularioDeRegistro + " " + this.inputConfirmarSenha).type(confirmarSenha, { force: true });
    };

    confirmarFormulario() {
        cy.contains("button", "Cadastrar").click({ force: true });
    };

    adicionarSaldo(){
        cy.get(this.toggleAdicionarSaldo).click({ force: true });
    }

    verficarMensagemDeCamposObrigatorios(){
        cy.get(".card__register .input__warging:contains('É campo obrigatório')").should('have.length', 4);
    };

    verificarModalDeCampoVazio(campo){
        cy.contains("#modalText", `${campo} não pode ser vazio`).should("be.visible");
    };

    fecharModalDeContaCriada(elemento, texto){
        cy.contains(elemento, texto).click();
    };

    verificarTextoDeSaldo(saldo){
        cy.contains("#textBalance", `Saldo em conta R$ ${saldo}`);     
    };

    verificarModalDeSenhasDiferentes(){
        cy.contains("#modalText", "As senhas não são iguais.").should("be.visible");  
    }

    verificarModaldeContaCriada(){
        cy.contains("#modalText", /A conta [0-9][0-9][0-9]-[0-9] foi criada com sucesso/).should("be.visible"); 
    }

    verificarVisibilidadeBotaoFecharModal(elemento, texto){
        cy.contains(elemento, texto).should("be.visible");
    };

    verificarExistenciaBotaoFecharModal(elemento, texto){
        cy.contains(elemento, texto).should("not.exist");
    };
};


export var registerPage = new RegisterPage();
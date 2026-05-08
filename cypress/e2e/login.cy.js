describe('Cenários Negativos: Login', () => {

    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit(Cypress.env('urlBase'));
    });

    it('Deve exibir erro ao tentar logar sem informações', () => {

        // Tenta realizar login sem preencher campos
        cy.contains('button', 'Entrar').click();

        // Valida comportamento esperado da aplicação
        cy.contains(/obrigatório|required|email/i)
            .should('be.visible');

    });

    it('Deve exibir erro ao inserir credenciais incorretas', () => {

        // Preenche credenciais inválidas
        cy.get('#email').type('email_errado@teste.com');
        cy.get('#password').type('123456');

        // Tenta realizar login
        cy.contains('button', 'Entrar').click();

        // Valida retorno de erro da aplicação
        cy.contains(/login|senha|incorreto|inválido|erro/i, { timeout: 10000 })
            .should('be.visible');

        // Garante que permaneceu na tela de login
        cy.url().should('not.include', '/dashboard');

    });

});
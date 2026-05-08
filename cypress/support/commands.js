Cypress.Commands.add('login', () => {
    // 1. Acessa a página
    cy.visit(Cypress.env('urlBase'));

    // 2. Preenche os dados
    cy.get('#email').type(Cypress.env('usuario'));
    cy.get('#password').type(Cypress.env('senha'), { log: false });

    // 3. Clica em entrar
    cy.contains('button', 'Entrar').click();

    // 4. O Bypass do Bug
    cy.contains('Seu login está incorreto, quer continuar?').should('be.visible');
    cy.contains('Continuar').click();
});
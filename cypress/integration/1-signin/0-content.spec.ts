describe('Sign-in content', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');
  });

  it('should have a correct title', () => {
    cy.title().should('include', 'Login');
  });

  it('should include form', () => {
    cy.get('main > form').should('exist');
  });

  it('should include logo', () => {
    cy.get('main > form svg').should('exist');
  });

  it('should include labeled inputs with placeholders', () => {
    cy.get('main > form label:first')
      .should('exist')
      .should('have.attr', 'for', 'email')
      .should('not.have.class', 'border-red-500')
      .contains('Email');
    cy.get('main > form input#email').should('exist').should('have.attr', 'placeholder');

    cy.get('main > form label:last')
      .should('exist')
      .should('have.attr', 'for', 'password')
      .should('not.have.class', 'border-red-500')
      .contains('Password');
    cy.get('main > form input#password').should('exist').should('have.attr', 'placeholder');
  });

  it('should include submit button', () => {
    cy.get('main > form button')
      .should('exist')
      .should('have.attr', 'type', 'submit')
      .contains('Login');
  });
});

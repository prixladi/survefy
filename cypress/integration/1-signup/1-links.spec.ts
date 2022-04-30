describe('Sign-up links', () => {
  beforeEach(() => {
    cy.visit('/auth/signup');
  });

  it('should include working go to register link', () => {
    cy.get('main > form a').should('exist').should('have.attr', 'href', '/auth/signin').click();

    cy.url().should('include', '/auth/signin');
  });
});

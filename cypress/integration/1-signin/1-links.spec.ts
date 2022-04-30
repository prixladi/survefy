describe('Sign-in links', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');
  });

  it('should include working go to register link', () => {
    cy.get('main > form a').should('exist').should('have.attr', 'href', '/auth/signup').click();

    cy.url().should('include', '/auth/signup');
  });
});

describe('Homepage links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have working register cta', () => {
    cy.get('main article a.cta')
      .should((x) => {
        expect(x).to.have.attr('href', '/auth/signup');
      })
      .click();

    cy.url().should('include', '/auth/signup');
  });
});

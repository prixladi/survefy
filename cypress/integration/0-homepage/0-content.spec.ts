import testNavbar from "tests/navbar";

describe('Homepage content', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('should have a correct title', () => {
        cy.title().should('include', 'Home');
    });

    it('should have a content', () => {
        cy.title().should('include', 'Home');
    });

    testNavbar({});
});
type Options = {
  authorized?: boolean;
  short?: boolean;
};

const testNavbar = ({}: Options) => {
  context('Navbar tests', () => {
    it('should exist', () => {
      cy.get('nav').should('exist');
    });

    it('should contain logo, sign-in and-sign up buttons', () => {
        cy.get('nav > div:first').should(x => {
            expect(x).to.have.class('hidden');
        });

        cy.get('nav > div:last').should(x => {
            expect(x).to.not.have.class('hidden');
        });

        cy.get('nav > div:last a').should(x => {
            expect(x).to.have.length(3);
            const logo = x[0];
            const login = x[1];
            const register = x[2];

            expect(logo).to.have.attr('href', '/');
            expect(login).to.have.attr('href', '/auth/signin');
            expect(register).to.have.attr('href', '/auth/signup');
        });

        cy.get('nav > div:last > div:first a > svg').should('exist');
    });
  });
};

export default testNavbar;

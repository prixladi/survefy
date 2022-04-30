import { factoryUser } from 'fixtures/users';

const user = factoryUser();

const expectError = (input: 'email' | 'password', contain: string) => {
  cy.get(`@${input}`).should('exist').should('have.class', 'border-red-500');
  cy.get(`@${input}`)
    .next('span')
    .should('exist')
    .should('have.class', 'text-red-500')
    .contains(contain);
}

const expectNoError = (input: 'email' | 'password') => {
  cy.get(`@${input}`).should('exist').should('not.have.class', 'border-red-500');
  cy.get(`@${input}`)
    .next('span')
    .get('span')
    .should('exist')
    .should('have.class', 'opacity-0');
}

describe('Sign-up register', () => {
  beforeEach(() => {
    cy.visit('/auth/signup');
    cy.get('main > form input#email').as('email');
    cy.get('main > form input#password').as('password');
    cy.get('main > form button').as('submit');
  });

  it('should show input errors on register without credentials', () => {
    cy.get('@submit').click();

    expectError('email', 'required');
    expectError('password', 'required');
  });

  it('should show email error on invalid email', () => {
    cy.get('@email').type('invalid');
    cy.get('@password').type('password');
    cy.get('@submit').click();

    expectError('email', 'invalid');
    expectNoError('password');
  });

  it('errors should change and disappear on typing', () => {
    cy.get('@submit').click();
    
    expectError('email', 'required');
    expectError('password', 'required');

    cy.get('@email').type("email");
    cy.get('@password').type(user.password);

    expectError('email', 'invalid');
    expectNoError('password');

    cy.get('@email').type(user.email);

    expectNoError('email');
    expectNoError('password');
  });

  it('should register correctly on new valid credentials', () => {
    cy.get('@email').type(user.email);
    cy.get('@password').type(user.password);
    cy.get('@submit').click();

    cy.url({ timeout: 10 * 1000 }).should('include', '/dashboard');

    cy.visit('/auth/signin');
    cy.url().should('include', '/dashboard');
    cy.visit('/auth/signout');
  });
});

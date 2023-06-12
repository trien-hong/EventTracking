describe('Go to login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost/login/')
  })

  it('title should contain \"Event Tracking | Login\"', () => {
    cy.title().should('eq', 'Event Tracking | Login')
  })

  it('should contain \"LOGIN\" at the top of container', () => {
    cy.get('[id=generalContainer]').contains('LOGIN')
  })

  it('verify content of top toolbar', () => {
    cy.get('header').contains('a', 'SIGNUP')
    cy.get('header').contains('a', 'RESET PASSWORD')
    cy.get('header').contains('a', 'LOGIN')
  })

  describe('Check bottom links', () => {
    it('should contain signup link', () => {
      cy.get('[id=generalContainer] a').should('have.attr', 'href', '/signup/')
    })

    it('should contain reset password link', () => {
      cy.get('[id=generalContainer] a').eq(1).should('have.attr', 'href', '/reset/password/')
    })
  })

  describe('Check login page form', () => {
    it('type in the required field(s), verify field(s) content, & login', () => {
      cy.get('[name=username]').type(Cypress.env("USERNAME"))
      cy.get('[name=password]').type(Cypress.env("PASSWORD"))

      cy.get('[name=username]').should('have.value', Cypress.env("USERNAME"))
      cy.get('[name=password]').should('have.value', Cypress.env("PASSWORD"))

      cy.get('[id=generalContainer]').get('form').submit().click()
    })
  })
})
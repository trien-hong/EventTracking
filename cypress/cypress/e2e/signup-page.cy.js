describe('Go to signup page', () => {
  beforeEach(() => {
    cy.visit('http://localhost/signup/')
  })

  it('title should contain \"Event Tracking | Signup\"', () => {
    cy.title().should('eq', 'Event Tracking | Signup')
  })

  it('should contain \"SIGNUP\" at the top of container', () => {
    cy.get('[id=generalContainer]').contains('SIGNUP')
  })

  it('verify content of header/navbar', () => {
    cy.get('header').contains('a', 'SIGNUP')
    cy.get('header').contains('a', 'RESET PASSWORD')
    cy.get('header').contains('a', 'LOGIN')
  })

  describe('Check bottom links', () => {  
    it('should contain login link', () => {
      cy.get('[id=generalContainer] a').should('have.attr', 'href', '/login/')
    })

    it('should contain reset password link', () => {
      cy.get('[id=generalContainer] a').eq(1).should('have.attr', 'href', '/reset/password/')
    })
  })

  describe('Check signup page form', () => {
    it('type in the required field(s), verify field(s) content, & signup', () => {
      cy.get('[name=email]').type(Cypress.env("EMAIL"))
      cy.get('[name=username]').type(Cypress.env("USERNAME"))
      cy.get('[name=password]').type(Cypress.env("PASSWORD"))
      cy.get('[name=confirm_password]').type(Cypress.env("CONFIRM_PASSWORD"))
      cy.get('[name=zip_code]').type(Cypress.env("ZIP_CODE"))

      cy.get('[name=email]').should('have.value', Cypress.env("EMAIL"))
      cy.get('[name=username]').should('have.value', Cypress.env("USERNAME"))
      cy.get('[name=password]').should('have.value', Cypress.env("PASSWORD"))
      cy.get('[name=confirm_password]').should('have.value', Cypress.env("CONFIRM_PASSWORD"))
      cy.get('[name=zip_code]').should('have.value', Cypress.env("ZIP_CODE"))

      cy.get('[id=generalContainer]').get('form').submit().click()
    })
  })
})
describe('Go to reset password page', () => {
  beforeEach(() => {
    cy.visit('http://localhost/reset/password/')
  })

  it('title should contain \"Event Tracking | Reset Password\"', () => {
    cy.title().should('eq', 'Event Tracking | Reset Password')
  })

  it('should contain \"RESET PASSWORD\" at the top of container', () => {
    cy.get('[id=generalContainer]').contains('RESET PASSWORD')
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

    it('should contain login link', () => {
      cy.get('[id=generalContainer] a').eq(1).should('have.attr', 'href', '/login/')
    })
  })
  
  describe('Check reset password page form', () => {
    it('should change the password of the user', () => {
      cy.get('[name=username]').type(Cypress.env("username"))
      cy.get('[name=password]').type(Cypress.env("reset_password"))
      cy.get('[name=confirm_password]').type(Cypress.env("reset_password"))

      cy.get('[name=username]').should('have.value', Cypress.env("username"))
      cy.get('[name=password]').should('have.value', Cypress.env("reset_password"))
      cy.get('[name=confirm_password]').should('have.value', Cypress.env("reset_password"))

      cy.get('[id=generalContainer]').get('form').submit().click()
    })
  })
  
  describe('Change back password of test user', () => {
    it('should reset password of the user back to the original', () => {
      cy.get('[name=username]').type(Cypress.env("username"))
      cy.get('[name=password]').type(Cypress.env("password"))
      cy.get('[name=confirm_password]').type(Cypress.env("confirm_password"))

      cy.get('[name=username]').should('have.value', Cypress.env("username"))
      cy.get('[name=password]').should('have.value', Cypress.env("password"))
      cy.get('[name=confirm_password]').should('have.value', Cypress.env("confirm_password"))
      
      cy.get('[id=generalContainer]').get('form').submit().click()
    })
  })
})
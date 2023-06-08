describe('Go to signup page', () => {
  beforeEach(() => {
    cy.visit('http://localhost/signup/')
  })

  it('title should contain \"Event Tracking | Signup\"', () => {
    cy.title().should('eq', 'Event Tracking | Signup')
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
    it('type in the required fields, verify fields content, & signup', () => {
      cy.get('[name=email]').type(Cypress.env("email"))
      cy.get('[name=username]').type(Cypress.env("username"))
      cy.get('[name=password]').type(Cypress.env("password"))
      cy.get('[name=confirm_password]').type(Cypress.env("confirm_password"))
      cy.get('[name=zip_code]').type(Cypress.env("zip_code"))

      cy.get('[name=email]').should('have.value', Cypress.env("email"))
      cy.get('[name=username]').should('have.value', Cypress.env("username"))
      cy.get('[name=password]').should('have.value', Cypress.env("password"))
      cy.get('[name=confirm_password]').should('have.value', Cypress.env("confirm_password"))
      cy.get('[name=zip_code]').should('have.value', Cypress.env("zip_code"))

      cy.get('[id=generalContainer]').get('form').submit().click()
    })
  })
})

describe('Go to login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost/login/')
  })

  it('title should contain \"Event Tracking | Login\"', () => {
    cy.title().should('eq', 'Event Tracking | Login')
  })

  it('verify content of header/navbar', () => {
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
    it('type in the required fields, verify fields content, login, & logout', () => {
      cy.get('[name=username]').type(Cypress.env("username"))
      cy.get('[name=password]').type(Cypress.env("password"))

      cy.get('[name=username]').should('have.value', Cypress.env("username"))
      cy.get('[name=password]').should('have.value', Cypress.env("password"))

      cy.get('[id=generalContainer]').get('form').submit().click()

      cy.get('header').contains('button', 'LOGOUT').click()
    })
  })
})

describe('Go to reset password page', () => {
  beforeEach(() => {
    cy.visit('http://localhost/reset/password/')
  })

  it('title should contain \"Event Tracking | Reset Password\"', () => {
    cy.title().should('eq', 'Event Tracking | Reset Password')
  })

  it('verify content of header/navbar', () => {
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
    it('should reset password of the user', () => {
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

describe('Delete test account', () => {
  beforeEach(() => {
    cy.visit('http://localhost/login/')
  })
    
  it('should go to profile page, click on profile settings, and click on delete account', () => {
    cy.get('[name=username]').type(Cypress.env("username"))
    cy.get('[name=password]').type(Cypress.env("password"))

    cy.get('[name=username]').should('have.value', Cypress.env("username"))
    cy.get('[name=password]').should('have.value', Cypress.env("password"))

    cy.get('[id=generalContainer]').get('form').submit().click()

    cy.get('header').contains('a', 'PROFILE').click()
    
    cy.title().should('eq', 'Profile | ' + Cypress.env("username"))

    cy.get('button').contains('Profile Settings').click()

    // I still have yet to implement the delete feature on the front-end and back-end
  })
})
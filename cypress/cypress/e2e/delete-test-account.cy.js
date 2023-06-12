describe('Delete test account', () => {
  it('should go to profile page, click on profile settings, type in required field, and click on delete account', () => {
    cy.visit('http://localhost/login/')

    cy.get('[name=username]').type(Cypress.env("USERNAME"))
    cy.get('[name=password]').type(Cypress.env("PASSWORD"))

    cy.get('[name=username]').should('have.value', Cypress.env("USERNAME"))
    cy.get('[name=password]').should('have.value', Cypress.env("PASSWORD"))

    cy.get('[id=generalContainer]').get('form').submit().click()

    cy.get('header').contains('a', 'PROFILE').click()
    
    cy.title().should('eq', 'Profile | ' + Cypress.env("USERNAME"))

    cy.get('button').contains('Profile Settings').click()

    cy.get('[name=password_delete_account]').type(Cypress.env("PASSWORD"))
    cy.get('[name=password_delete_account]').should('have.value', Cypress.env("PASSWORD"))

    cy.get('button').contains('DELETE ACCOUNT').click()
  })
})
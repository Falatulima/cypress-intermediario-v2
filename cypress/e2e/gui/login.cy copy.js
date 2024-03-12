/// <reference types="Cypress" />

describe('Login GitLab', function() {
  this.beforeEach(function() {
    cy.visit('http://localhost:83')
  })

  it('Realiza o login e valida se está logado', function() {
    cy.get('#user_login').type('root')
    cy.get('#user_password').type('vqu7rs3@SL9T6uK')
    cy.get('input[value="Sign in"]').click()
    cy.get('.blank-state-welcome-title').should('be.visible')
  })
})
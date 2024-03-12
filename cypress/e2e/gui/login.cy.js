describe('Login', () => {
  it('successfully', () => {
    const user = Cypress.env('user_name')    //recebendo o valor de username do arquivo cypress.env
    const password = Cypress.env('user_password')    //recebendo o valor de password do arquivo cypress.env
    const options = {cacheSession: false}  //Armazenando na variável options o cacheSessions false

    cy.login(user, password, options) //Executando o login com as informações

    cy.get('.qa-user-avatar').should('be.visible') //verificando se o avatar está visível

    //cy.logout()
  })


})

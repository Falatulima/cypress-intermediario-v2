Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),    //recebendo o valor de username do arquivo cypress.env
    password = Cypress.env('user_password'),    //recebendo o valor de password do arquivo cypress.env
    { cacheSession = true } = {},   //Para manter o cache da sessão, quando necessário 
  ) => {
    //variável login armazenando todas as ações que serão realizadas no login
    const login = () => {
      cy.visit('/users/sign_in')
  
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }

    //Variável para validar se a sessão foi desativada
    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
          .should('not.eq', '/users/sign_in')   //validando se o pathname não é igual a /users/sign_in
      }
    
    const options = {
      cacheAcrossSpecs: true,   // para compartilhar sessão entre as specs criadas no cypress
      validate, //Chamando o validade em options para ter certeza de que não estamos em uma sessão ativa
    }
  
    if (cacheSession) {     //Se existir um cachesession ativo 
      cy.session(user, login, options)  //ele irá pegar as informações em cache e utilizar na sessão
    } else {
      login()   // caso não haja uma sessão ativa em cache ele faz o login novamente
    }
  })

  Cypress.Commands.add('logout', () => {
    const logout = () => {
        cy.get('.qa-user-avatar').click()
        cy.contains('Sign out').click()
    }

    logout()
  }) 

  Cypress.Commands.add('gui_createProject', project => {
    cy.visit('/projects/new')

    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
  })

  Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

    cy.get('#issue_title').type(issue.title)
    cy.get('#issue_description').type(issue.description)
    cy.contains('Submit issue').click();
  })

  Cypress.Commands.add('gui_setLabelOnIssue', label => {
    cy.get('.qa-edit-link-labels').click()
    cy.contains(label.name).click()
    cy.get('body').click()
  })

  Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()
  })

  
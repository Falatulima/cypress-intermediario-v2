import { faker } from '@faker-js/faker'

describe('Create Project', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
  })

  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`, //Para retornar uma expressão JS. Está retornando um id aleatório (uuid)
      description: faker.random.words(5)  //utilizando o faker para inserir 5 palavras aleatórias.
    }

    cy.gui_createProject(project)

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`) //acessando a url do projeto criado
    cy.contains(project.name).should('be.visible')  //Verificando se o nome do projeto está visível
    cy.contains(project.description).should('be.visible')  //verificando se a descrição está visível
  })
})
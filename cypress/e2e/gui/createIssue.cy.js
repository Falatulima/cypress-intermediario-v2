import { faker } from "@faker-js/faker"

const issue = {
  title: `issue-${faker.datatype.uuid()}`, //Para retornar uma expressão JS. Está retornando a variável projectID
  description: faker.random.words(10), //utilizando o faker para inserir 10 palavras aleatórias.
  project: {
  name: `project-${faker.datatype.uuid()}`, //Para retornar uma expressão JS. Está retornando um id aleatório (uuid)
  description: faker.random.words(5)  //utilizando o faker para inserir 5 palavras aleatórias.
  }
}

describe('create issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createProject(issue.project) //realiza a criação do projeto via api, para depois o issue ser criado com base no projeto criado.
  })

  it('successfully', () => {
  
    cy.gui_createIssue(issue)

    cy.contains(issue.title).should('be.visible')  //Verificando se o titulo da issue está visível
    cy.contains(issue.description).should('be.visible')  //verificando se a descrição está visível

  })
    
  })
import { faker } from "@faker-js/faker"

const options = { env: { snapshotOnly: true } } //para ter visual dos testes de GUI com API

describe('create issue', options, () => {
  beforeEach(() => {
    cy.api_deleteProjects()
  })

  it('successfully', () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`, //Para retornar uma expressão JS. Está retornando a variável projectID
    description: faker.random.words(10), //utilizando o faker para inserir 10 palavras aleatórias.
    project: {
    name: `project-${faker.datatype.uuid()}`, //Para retornar uma expressão JS. Está retornando um id aleatório (uuid)
    description: faker.random.words(5)  //utilizando o faker para inserir 5 palavras aleatórias.
    }
  }

    cy.api_createIssue(issue)
    .then(response => {
      expect(response.status).to.equal(201)
      expect(response.body.name).to.equal(issue.name)
      expect(response.body.description).to.equal(issue.description)
      
    })
  })   
})
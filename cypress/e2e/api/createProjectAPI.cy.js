import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create Project', options, () => {
  beforeEach(() => cy.api_deleteProjects())
  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`, //Para retornar uma expressão JS. Está retornando um id aleatório (uuid)
      description: faker.random.words(5)  //utilizando o faker para inserir 5 palavras aleatórias.
    }
  
    cy.api_createProject(project)
    .then(response => {
      expect(response.status).to.equal(201)
      expect(response.body.name).to.equal(project.name)
      expect(response.body.description).to.equal(project.description)
      
      })
    })
})

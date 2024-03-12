import { faker } from "@faker-js/faker"

describe('Git Clone', () => {
  const project = {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
  }
      
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.api_createProject(project)
  })
 
  it('successfully', () => {
    cy.cloneViaSSH(project)

    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('contain', `# ${project.name}`)
      .and('contain', project.description)
  })
})
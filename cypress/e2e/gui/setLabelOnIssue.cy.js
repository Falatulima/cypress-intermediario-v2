import { faker } from "@faker-js/faker"

const options = { env: { snapshotOnly: true } } //para ter visual dos testes de GUI com API

describe('Set Label On Issue', options, () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }
      
      const label = {
        name: `label-${faker.random.word()}`,
        color: '#ffaabb'
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
  })
 
  it('successfully', () => {
    cy.api_createIssue(issue)
    .then(response => {
      cy.api_createLabel(response.body.project_id, label)
      cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
    })

    cy.gui_setLabelOnIssue(label)

    cy.get('.qa-labels-block').should('contain', label.name)
    cy.get('.qa-labels-block span')
      .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
  })
})
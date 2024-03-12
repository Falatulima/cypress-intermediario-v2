import { faker } from "@faker-js/faker";

const options = {env: {stapshotOnly: true}}

describe('Set milestone on issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name:`project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
        }
    }

    const milestone = {
        title: `milestone-${faker.random.word()}`,
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
    })

    it('successfully', () => {
        cy.api_createIssue(issue)
        .then(response => {
          cy.api_createMilestone(response.body.project_id, milestone)
          cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
        })
    
        cy.gui_setMilestoneOnIssue(milestone)
    
        cy.get('.block.milestone').should('contain', milestone.title)
      })
})
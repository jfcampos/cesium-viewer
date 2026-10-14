// https://on.cypress.io/api

describe('App', () => {
  it('renders the app bar title', () => {
    cy.visit('/')
    cy.contains('.v-toolbar-title', 'Cesium Viewer')
  })
})

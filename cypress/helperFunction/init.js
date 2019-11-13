/// <reference types="Cypress" />

export const setupTestState = (startURL) => {
    before(() => {
        cy.visit(startURL)
        cy.clearCookies()  
    })
}

export const beforeEachTest = (startURL) => {
    beforeEach(() => {
        //Save Cookies before every Test
        cy.visit(startURL)
        Cypress.Cookies.preserveOnce()
        cy.viewport(1920, 1080)
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
        
    })
}

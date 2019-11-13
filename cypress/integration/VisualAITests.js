/// <reference types="Cypress" />

//To Setup Test Environment - "V2" Version 2 || "" Version 1
const versionControl = "V2"
const urlLogin = `https://demo.applitools.com/hackathon${versionControl}.html`
const urlHomepage = `https://demo.applitools.com/hackathonApp${versionControl}.html`
const urlAds = `https://demo.applitools.com/hackathon${versionControl}.html?showAd=true`
const urlCharts = `https://demo.applitools.com/hackathonChart${versionControl}.html`
const urlLinkChart = `/hackathonChart${versionControl}.html`

describe('Visual Regression', () => {
    beforeEach(() => {
        //Set Chrome Viewport
        cy.viewport(1920, 1080)
        //Ignore Console Errors
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
        //Start Visuall Regression
        cy.eyesOpen({
            appName: 'The Hackathon App',
                batchName: 'Test Challange The Hackathon App with Applitools',
                browser: [
                    {width: 1920, height: 1080, name: 'firefox'}
                    //{width: 1920, height: 1080, name: 'chrome'},
                    //{width: 1920, height: 1080, name: 'ie11'}
                ] 
        }) 
    })

    afterEach(() => {
        cy.eyesClose()
    }) 

    context('1 - Login Page UI Elements Test', () => {
        /* beforeEachTest(urlLogin) */
        it('should have valid State of Elements on Login page',  () => {
            cy.visit(urlLogin)
            cy.eyesCheckWindow("Login Page without interaction")
        })   
    })
    
    context('2 - Data-Driven Test', () => {
        /* beforeEachTest(urlLogin) */
        it('should throw an error for login with empty input fields', () => {
            cy.visit(urlLogin)
            cy  
                .get('#log-in')
                .click()
            cy.eyesCheckWindow("Error Message Empty input fields")
        })
        it('should throw an error for login with empty username input field', () => {
            cy.visit(urlLogin)
            cy  
                .get('#password')
                .type('1337')
            cy  
                .get('#log-in')
                .click()
            cy.eyesCheckWindow("Error Message Empty username input field")
        })
    
        it('should throw an error for login with empty password input field', () => {
            cy.visit(urlLogin)
            cy  
                .get('#username')
                .type('1337')
            cy  
                .get('#log-in')
                .click()
                cy.eyesCheckWindow("Error Message Empty password input field")
        })
        it('should log in with valid userdata', ()=> {
            cy.visit(urlLogin)
            cy  
                .get('#password')
                .type('1337')
            cy  
                .get('#username')
                .type('1337')
            cy  
                .get('#log-in')
                .click()
            cy
                .url()
                .should('contain', urlHomepage)  
                cy.eyesCheckWindow("Homepage after login")    
        }) 
    
    })
    
    context('3 - Table Sort Test', () => {
        /* beforeEachTest(urlHomepage) */
        it('it should sort the table of costs in ascending order', () => {
            cy.visit(urlHomepage)
            const amountSorted = []
            cy
                .get('#amount')
                .click()
                .then(()=>{
                    cy.eyesCheckWindow("Sorted recent transactions table",{
                        floating: [{selector: '#transactionsTable'}]
                        })  
                    //Can't be found through visuall regression (Floating Region)    
                    cy  
                        .get('.text-right.bolder.nowrap span')
                        .each(($amount)=>{
                            amountSorted.push(+($amount.text().replace(/[^0-9.-]+/g,"")))
                        })
                        .then(() => {
                            cy.log('Sorted order is:')
                            expect(amountSorted.slice(1).every((item, i) => amountSorted[i] <= item)).to.be.true       
                        })
                    })     
        })
    })
    
    context('4 - Canvas Chart Test', () => {
        /* beforeEachTest(urlHomepage) */
        it('should navigate to Compare Expenses', () => {
            cy.visit(urlHomepage)
            cy
                .get('#showExpensesChart')
                .click()
            cy
                .url()
                .should('contain',urlCharts)
                .then(()=>{
                    cy.wait(1000)
                    cy.eyesCheckWindow("Compare Expenses Graphs")
                })
        })
        it('should add next years graph', ()=>{
            cy.visit(urlCharts)
            cy
                .get('#addDataset')
                .click()
                .then(()=>{
                    cy.wait(1000)
                    cy.eyesCheckWindow("Compare Expenses Graphs + next Year") 
                })            
        })
    
    })
    
    context('5 - Dynamic Content Test', () => {
        /* beforeEachTest(urlAds) */
        it('should go to dynmanic ads and display both ads', ()=> {
            cy.visit(urlAds)
            cy  
                .get('#password')
                .type('1337')
            cy  
                .get('#username')
                .type('1337')
            cy  
                .get('#log-in')
                .click()
            cy.eyesCheckWindow("Dynamic ads displayed",  {layout: [
                {selector: '#flashSale'}, {selector: '#flashSale2'}
              ]})   
        })
       
    })
})    

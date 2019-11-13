/// <reference types="Cypress" />

//Helper Functions
const domElementStateWithAttr = (domNode, attrType, attrValue, elementVisible) => {
    let visibleState
    if(elementVisible == true){
        visibleState = 'be.visible'
    }
    else{
        visibleState = 'not.be.visible'
    }
    cy
        .get(domNode)
        .should(visibleState)
        .invoke('attr', attrType)
        .should('contain', attrValue)
}

const domElementWithText = (domNode, text, elementVisible) => {
    let visibleState
    if(elementVisible == true){
        visibleState = 'be.visible'
    }
    else{
        visibleState = 'not.be.visible'
    }
    cy
        .get(domNode)
        .should(visibleState)
        .should('contain',text)

}

const setupTestState = (startURL) => {
    before(() => {
        cy.visit(startURL)
        cy.clearCookies()  
    })
}

const beforeEachTest = (startURL) => {
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
const versionControl = "V2"
const urlLogin = `https://demo.applitools.com/hackathon${versionControl}.html`
const urlHomepage = `https://demo.applitools.com/hackathonApp${versionControl}.html`
const urlAds = `https://demo.applitools.com/hackathon${versionControl}.html?showAd=true`
const urlCharts = `https://demo.applitools.com/hackathonChart${versionControl}.html`
const urlLinkChart = `/hackathonChart${versionControl}.html`




context('1 - Login Page UI Elements Test', () => {
    setupTestState(urlLogin)
    beforeEachTest(urlLogin)
    it('should have valid password input',  () => {
        domElementStateWithAttr('#password',  'placeholder', 'Enter your password', true)
    })
    it('should have valid username input', function () {
        domElementStateWithAttr('#username', 'placeholder', 'Enter your username', true) 
    })    
    it('should should have valid logo link', function () {
        domElementStateWithAttr('.logo-w a','href', 'index.html', true)   
    })     
    it('should have valid logo img', function () {
        domElementStateWithAttr('.logo-w a img','src', 'img/logo-big.png', true)
    })
    it('should have valid headline', function () {
        domElementWithText('h4.auth-header', 'Login Form', true)
    })   
    it('should show empty alert empty', function () {
        domElementStateWithAttr('#alertEmpty', 'style', 'display:block', true) 
    })
    it('should not show alert primary', function () {
        domElementStateWithAttr('.alert.alert-primary', 'style', 'display:none', false)
    })
    it('should have valid username label', function () {
        cy  
            .get(' form .form-group label')
            .first()
            .should('be.visible')
            .should('contain', 'Username')        
    })
    it('should have valid password label', function () {
        cy  
            .get(' form .form-group label')
            .eq(1)
            .should('be.visible')
            .should('contain', 'Password')         
    })
    it('should have valid username icon', function () {
         //Here can not be tested easily the pseudo element of the icons. 
        //The content depends on fonts that are not loaded in cypress. In order to save effort, it only checks that the element is not empty 
        //So this is not a 100% valid Test 
        cy
            .get('.pre-icon.os-icon.os-icon-user-male-circle')
            .then($element => {
              const window = $element[0].ownerDocument.defaultView
              const before = window.getComputedStyle($element[0], ':before')
              cy.log(before)
              const contentPseudoelement = before.getPropertyValue('content')
              expect(contentPseudoelement).to.not.be.empty
            })
    })
    it('should have valid password icon', function () {
        cy
            .get('.pre-icon.os-icon.os-icon-fingerprint')
            .then($element => {
              const window = $element[0].ownerDocument.defaultView
              const before = window.getComputedStyle($element[0], ':before')
              cy.log(before)
              const contentPseudoelement = before.getPropertyValue('content')
              expect(contentPseudoelement).to.not.be.empty
            })
    })
    it('should have valid login button', function () {
        domElementWithText('#log-in', 'Log In', true) 
    })
    it('should have valid remember me label', function () {
        domElementWithText('.form-check-label', 'Remember Me', true)
    })
    it('should have valid remember me checkbox', function () {
        cy
        .get('input.form-check-input')
        .should('be.visible')
    })
    //Following Social media links & Icons:
    //The available selectors in the dom does not explicitly allow you to log within the test which items are defective
    it('should have valid twitter icon img', function () {
       
        cy
                .get('.buttons-w img')
                .first()
                .should('be.visible')
                .invoke('attr', 'src')
                .should('contain', 'img/social-icons/twitter.png')    
    })
    it('should have valid twitter icon link', function () {
        cy
        .get('.buttons-w a')
        .first()
        .should('be.visible')
        .invoke('attr', 'href')
        .should('contain', '#')        
    })
    it('should have valid facebook icon img', function () {
        cy
        .get('.buttons-w img')
        .eq(1)
        .should('be.visible')
        .invoke('attr', 'src')
        .should('contain', 'img/social-icons/facebook.png')          
    })
    it('should have valid facebook icon link', function () {
        cy
        .get('.buttons-w a')
        .eq(1)
        .should('be.visible')
        .invoke('attr', 'href')
        .should('contain', '#')          
    })
    it('should have valid linkedin icon img', function () {
        cy
        .get('.buttons-w img')
        .eq(2)
        .should('be.visible')
        .invoke('attr', 'src')
        .should('contain', 'img/social-icons/linkedin.png')  
        
    })
    it('should have valid linkedin icon link', function () {
        cy
        .get('.buttons-w a')
        .eq(2)
        .should('be.visible')
        .invoke('attr', 'href')
        .should('contain', '#')    
        
    })    
})

context('2 - Data-Driven Test', () => {
    setupTestState(urlLogin)
    beforeEachTest(urlLogin)
    it('should throw an error for login with empty input field', () => {
        domElementStateWithAttr('#alertEmpty', 'style', 'display:block', true) 
        domElementStateWithAttr('.alert.alert-primary', 'style', 'display:none', false)
        cy  
            .get('#log-in')
            .click()
        domElementStateWithAttr('#alertEmpty', 'style', 'display: none', false)    
        domElementWithText('.alert.alert-warning', "Both Username and Password must be present ", true)
    })
    it('should throw an error for login with empty username input field', () => {
        domElementStateWithAttr('#alertEmpty', 'style', 'display:block', true) 
        domElementStateWithAttr('.alert.alert-primary', 'style', 'display:none', false)
        cy  
            .get('#password')
            .type('1337')
        cy  
            .get('#log-in')
            .click()
        domElementStateWithAttr('#alertEmpty', 'style', 'display: none', false)    
        domElementWithText('.alert.alert-warning', "Username must be present", true)
    })

    it('should throw an error for login with empty password input field', () => {
        domElementStateWithAttr('#alertEmpty', 'style', 'display:block', true) 
        domElementStateWithAttr('.alert.alert-primary', 'style', 'display:none', false)
        cy  
            .get('#username')
            .type('1337')
        cy  
            .get('#log-in')
            .click()
        domElementStateWithAttr('#alertEmpty', 'style', 'display: none', false)    
        domElementWithText('.alert.alert-warning', "Password must be present", true)
    })
    it('should log in with valid userdata', ()=> {
        domElementStateWithAttr('#alertEmpty', 'style', 'display:block', true) 
        domElementStateWithAttr('.alert.alert-primary', 'style', 'display:none', false)
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
            domElementWithText('#logged-user-name', "Jack Gomez", true)  
            domElementWithText('.logged-user-role', "Customer", true)      
    }) 

})

context('3 - Table Sort Test', () => {
    setupTestState(urlHomepage)
    beforeEachTest(urlHomepage)
    it('it should sort the table of costs in ascending order', () => {
        const amountSorted = []
        cy
            .get('#amount')
            .click()
            .then(()=>{
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
    it('should keep data in each row after sorting recent transactions table', ()=> {
        //Here a shortcut would be done via http request for login. 
        //At this point not necessary, as it is possible to call the page directly. 
        //Save current State 
        const tableDataStart = []
        const tableDataSorted = []
        cy  
            .get('#transactionsTable tbody tr')
            .each(($row)=>{
                tableDataStart.push($row.text().replace(/\n/g,"").trim())
            })
        cy
            .get('#amount')
            .click()
            .then(()=> {
                cy  
                    .get('#transactionsTable tbody tr').each(($row)=>{
                        tableDataSorted.push($row.text().replace(/\n/g,"").trim())
            }).then(()=>{
                tableDataSorted.forEach(($sortedRow)=>{
                    expect(tableDataStart).to.include($sortedRow)
                })
            })
        })      
    })
})

context('4 - Canvas Chart Test', () => {
    setupTestState(urlHomepage)
    beforeEachTest(urlHomepage)
    it('should navigate to Compare Expenses', () => {
        //Here a shortcut would be done via http request for login. 
        //At this point not necessary, as it is possible to call the page directly. 
        domElementStateWithAttr('#showExpensesChart', 'href', urlLinkChart, true)
        cy
            .get('#showExpensesChart')
            .click()
        cy
            .url()
            .should('contain',urlCharts)    

    })
    it('should show all graphs', () => {
        cy.visit(urlCharts)
        //Without Visual Regression Testing it is not possible to test Canvas elements
    })
    it('should add next years graph', ()=>{
        cy.visit(urlCharts)
        //Without Visual Regression Testing it is not possible to test Canvas elements
        domElementWithText('#addDataset', 'Show data for next year', true)
        cy
            .get('#addDataset')
            .click()
    })

})

context('5 - Dynamic Content Test', () => {
    setupTestState(urlAds)
    beforeEachTest(urlAds)
    it('should go to dynmanic ads and display first ad', ()=> {
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
            .get('#flashSale img')
            .should('be.visible')
            .invoke('attr', 'src')
            .should('not.be.empty')
    })
    it('should go to dynmanic ads and display second ad', ()=> {
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
            .get('#flashSale2 img')
            .should('be.visible')
            .invoke('attr', 'src')
            .should('not.be.empty')
    })
})

  
export const domElementStateWithAttr = (domNode, attrType, attrValue, elementVisible) => {
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

export const domElementWithText = (domNode, text, elementVisible) => {
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
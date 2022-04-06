describe("React TodoMVC", () => {

    const TODO_ITEM_ONE = "Buy Milk"
    const TODO_ITEM_TWO = "Pay Rent"
    const TODO_ITEM_THREE = "Puckup Dry Cleaning"


    beforeEach(() => {
        cy.visit('http://localhost:8888')
    })

    it("adds a single todo", () => {
        cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
        cy.get('.todo-list li').should('have.length', 1)
    })

    it("adds three todos", () => {
        cy.get('.new-todo')
            .type(`${TODO_ITEM_ONE}{enter}`)
            .type(`${TODO_ITEM_TWO}{enter}`)
            .type(`${TODO_ITEM_THREE}{enter}`)
        cy.get('.todo-list li').should('have.length', 3)
    })
})
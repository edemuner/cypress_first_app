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
        cy.get('.todo-list li').eq(0).find('label').should('contain', TODO_ITEM_ONE)
    })

    it("adds three todos", () => {
        cy.get('.new-todo')
        cy.createDefaultTodos().as('todos')
        cy.get('@todos').should('have.length', 3)
    })

    it('should append new items to the bottom of the list', () => {
        cy.createDefaultTodos().as('todos')
        cy.get('.todo-list li').eq(0).find('label').should('contain', TODO_ITEM_ONE)
        cy.get('.todo-list li').eq(1).find('label').should('contain', TODO_ITEM_TWO)
        cy.get('.todo-list li').eq(2).find('label').should('contain', TODO_ITEM_THREE)
        cy.get('@todos').should('have.length', 3)
        cy.get('.todo-count').contains('3 items left')
    })

    it('does NOT display the footer when there are no todos', () => {
        cy.get('.footer').should('not.exist')
        cy.get('.todo-list').should('not.exist')
    })
})
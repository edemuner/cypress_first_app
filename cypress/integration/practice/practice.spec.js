beforeEach(() => {
  cy.visit('http://localhost:8888')
})

describe('React TodoMVC practice', () => {

  const TODO_ITEM_ONE = "Buy Milk"
  const TODO_ITEM_TWO = "Pay Rent"
  const TODO_ITEM_THREE = "Puckup Dry Cleaning"

  it('adds five todos', () => {
    // Without using the cy.createDefaultTodos() custom command
    // write a test that asserts you can add 5 todos
    // Hint: make sure to assert the length is equal to 5

    cy.get('.new-todo')
      .type('Buy milk{enter}')
      .type('Wash the dishes{enter}')
      .type('Pay rent{enter}')
      .type('Go to the doctor{enter}')
      .type('Study{enter}')
    cy.get('.todo-list li').should('have.length', 5)

  })

  it('focuses on the todo input field, when the app is first opened', () => {
    // Write a test that asserts that the input field
    // is focused automatically when the app is first loaded.
    // Hint: you will need to use cy.focused()
    // https://docs.cypress.io/api/commands/focused

    cy.focused().should('have.class', 'new-todo')
  })

  it('should clear text input field when an item is added', () => {
    // Write a test that ensures that the input field is cleared
    // after adding a todo

    cy.get('.new-todo').type('buy milk{enter}').should('have.text', '')
  })

  it('can mark a todo as "completed"', () => {
    // Write a test that ensures that a todo can be "completed"
    // Hint: You will need to verify the class name of the completed todo

    cy.get('.new-todo').type('hello{enter}')
    cy.get('.new-todo').type('goodbye{enter}')
    cy.get('.todo-list li').eq(0).find('.toggle').click()
    cy.get('.todo-list li').eq(0).should('have.class', 'completed')
  })

  it('the "Clear completed" button clears all completed todos', () => {
    // Write a test that ensures that the "Clear completed" removes
    // all completed todos from the app
    // Hint: You will need to verify the class name of the completed todo


    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
    cy.get('.new-todo').type(`${TODO_ITEM_TWO}{enter}`)
    cy.get('.todo-list li').eq(0).find('.toggle').click()
    cy.get('.clear-completed').click()
    cy.get('.todo-list').eq(0).should('contain', TODO_ITEM_TWO)
  })

  it('allows you to edit a todo', () => {
    // Write a test that ensures that you can edit a todo
    // Hint: You will need to use cy.dblclick()
    // https://docs.cypress.io/api/commands/dblclick

    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
    cy.get('.todo-list li').eq(0).dblclick()
    cy.get('.todo-list li').eq(0).should('have.class', 'editing')
    
  })

  it('should save edits on blur', () => {
    // Write a test that ensures that an edited todo is saved when it is blurred
    // Hint: You will need to use cy.blur()
    // https://docs.cypress.io/api/commands/blur

    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
    cy.get('.todo-list li').eq(0).dblclick().clear().type(TODO_ITEM_TWO)
    cy.focused().blur()
    cy.get('.todo-list li').eq(0).should('contain', TODO_ITEM_TWO)
  })

  it('should display the current number of todo items', () => {
    // Write a test that ensures that the app counts the correct number of todos
    // left to be completed, i.e "3 items left" in the bottom left corner.

    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
    cy.get('.new-todo').type(`${TODO_ITEM_TWO}{enter}`)
    cy.get('.new-todo').type(`${TODO_ITEM_THREE}{enter}`)
    cy.get('.todo-list li').eq(0).find('.toggle').click()
    cy.get('.todo-count').should('contain', 2)

  })

  it('should persist its data after a page refresh', () => {
    // Write a test that ensures that the todos are persisted in the app
    // after the browser refreshes the page
    // Hint: You will need to use cy.reload()
    // https://docs.cypress.io/api/commands/reload

    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
    cy.reload()
    cy.get('.todo-list li').eq(0).should('contain', TODO_ITEM_ONE)


  })

  it.only('can display only completed todos', () => {
    // Write a test that ensures that only the completed todos are
    // displayed when the "Completed" button is clicked at the bottom

    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
    cy.get('.new-todo').type(`${TODO_ITEM_TWO}{enter}`)
    cy.get('.new-todo').type(`${TODO_ITEM_THREE}{enter}`)
    cy.get('.todo-list li').eq(0).find('.toggle').click()
    cy.get('.filters li').eq(2).click()
    cy.get('.todo-list').should('have.length', 1)

  })
})

describe('employee list',()=>{

  describe('should add a employee successfully', () => {
    beforeEach(()=>{
      cy.viewport('macbook-15')
      cy.visit('/')
      cy.get('#add-button').click()
    })
  
    it('added a employee successfully', () => {
      cy.get('#first_name').type('firstname')
      cy.get('#last_name').type('lastname')
      cy.get('#email').type(`testemail_${Date.now()}@gmail.com`)
      cy.get('#number').type('07712345678')
      cy.get('#gender').click().get('#female').click()
  
      cy.get('#add-button-form').click()
      cy.get('#emp-form-snackbar').should('have.text','Employee Saved.')
    })
  
  
    it('validation should trigger for invalid fields', () => {
      cy.get('#first_name').type('firstname')
      // invalid
      cy.get('#last_name').type('lastname_')
      cy.get('#email').type(`testemail_${Date.now()}@gmail.com`)
      // invalid
      cy.get('#number').type('123412345678')
      cy.get('#gender').click().get('#female').click()
  
      cy.get('#add-button-form').click()
      cy.get('#number-helper-text').should('have.text','Must be a valid number')
      cy.get('#last_name-helper-text').should('have.text','Must be only alphabets')
  
    })

    it('validation should trigger for duplicate emails', () => {
      cy.get('#first_name').type('firstname')
      // invalid
      cy.get('#last_name').type('lastname')
      cy.get('#email').type(`afarrin19@reference.com`)
      // invalid
      cy.get('#number').type('0771234567')
      cy.get('#gender').click().get('#female').click()
  
      cy.get('#add-button-form').click()      
      cy.get('#emp-form-snackbar').should('have.text','email already exists')

    })
  })
  
})

export {}
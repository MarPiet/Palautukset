describe('Note ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: "Matti Meikäläinen",
      username: "Matti123",
      password: "salasana"
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('input:first').type('Matti123')
      cy.get('input:last').type('salasana')
      cy.get('#loginBtn').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('logout').click()
      cy.contains('login').click()
      cy.get('input:first').type('Matti1234')
      cy.get('input:last').type('salasana')
      cy.get('#loginBtn').click()
      cy.get('.notification').should('contain', 'wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('Blog app', function() {
    // ...

    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('input:first').type('Matti123')
        cy.get('input:last').type('salasana')
        cy.get('#loginBtn').click()
      })

      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('React patterns')
        cy.get('#author').type('Michael Chan')
        cy.get('#url').type('https://reactpatterns.com/')
        cy.get('#submit').click()
        cy.contains('React patterns Michael Chan')
      })

      it('A blog can be liked', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('React patterns')
        cy.get('#author').type('Michael Chan')
        cy.get('#url').type('https://reactpatterns.com/')
        cy.get('#submit').click()
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('A blog can be deleted', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('React patterns')
        cy.get('#author').type('Michael Chan')
        cy.get('#url').type('https://reactpatterns.com/')
        cy.get('#submit').click()
        cy.contains('view').click()
        cy.contains('remove').click()
      })

      it('Blogs are arranged based on likes', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('React patterns')
        cy.get('#author').type('Michael Chan')
        cy.get('#url').type('https://reactpatterns.com/')
        cy.get('#submit').click()
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('create new blog').click()
        cy.get('#title').type('Angular patterns')
        cy.get('#author').type('Michael Chan')
        cy.get('#url').type('https://angularpatterns.com/')
        cy.get('#submit').click()
        cy.contains('view').click()
        cy.contains('https://angularpatterns.com/')
          .contains('like').click()
          .contains('like').click()

        cy.get('.blog:first')
          .should('contain', 'likes 2')
        cy.get('.blog:last')
          .should('contain', 'likes 1')
      })
    })

  })
})
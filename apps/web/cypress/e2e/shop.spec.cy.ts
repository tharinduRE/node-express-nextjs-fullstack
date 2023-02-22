describe("shop features", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
    cy.visit("/");
  });

  it("should load products", () => {
    cy.get('#shop-now-btn').click()
    cy.url().should('contain','shop')
  });

  it("should search products", () => {
    cy.get('#shop-now-btn').click()
    cy.get('[aria-label="search"]').click().type('tuna')
    cy.get('[aria-label="search-btn"]').click()

    cy.get('#search-query').should('contain','tuna')
  });

  it("should add products to cart", () => {
    cy.get('#shop-now-btn').click()
    cy.get('.grid > :nth-child(1) > .MuiButtonBase-root').first().click()

    cy.get('#cart-badge').should('contain',1)
  });

  it("should go to checkout page when items are in cart", () => {
    cy.get('#shop-now-btn').click()
    cy.get('.grid > :nth-child(1) > .MuiButtonBase-root').first().click()

    cy.get('#cart-badge').should('contain',1)
    cy.get('#bag-icon').click()
    cy.get('#checkout-btn').click()
    cy.url().should('contain','/shop/bag')
  });
  

  it("should go to login page when proceed to checkout", () => {
    cy.get('#shop-now-btn').click()
    cy.get('.grid > :nth-child(1) > .MuiButtonBase-root').first().click()

    cy.get('#cart-badge').should('contain',1)
    cy.get('#bag-icon').click()
    cy.get('#checkout-btn').click()
    cy.url().should('contain','/shop/bag')

    cy.get('#checkout-btn').click()
    cy.url().should('contain','/auth/signin')
  });

  
  it("should display disabled checkout button", () => {
    cy.get('#shop-now-btn').click()

    cy.get('#bag-icon').click()
    cy.get('#checkout-btn').should('have.attr','disabled')

  });
});

export {};

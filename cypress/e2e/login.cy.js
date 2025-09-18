describe('Login Form Test', () => {
  beforeEach(() => {
    cy.visit("http://localhost:5175/")
  })
  it("Başarılı form doldurulduğunda success sayfasına gider", () => {
    cy.get('[data-testid="email-input"]').type("test@wit.com");
    cy.get('[data-testid="password-input"]').type("12345678");
    cy.get('[data-testid="terms-checkbox"]').check();

    cy.get('[data-testid="submit-button"]').should("not.be.disabled").click();
    cy.url().should("include", "/success");
  });
  it("Email yanlış girildiğinde hata mesajı ve buton disabled", () => {
    cy.get('[data-testid="email-input"]').type("yanlis@email");
    cy.get('[data-testid="password-input"]').type("12345678");
    cy.get('[data-testid="terms-checkbox"]').check();

    cy.contains('Please enter a valid email address').should('be.visible');
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });
  it("Email ve password yanlış girildiğinde iki hata mesajı ve buton disabled", () => {
    cy.get('[data-testid="email-input"]').type("yanlis@email");
    cy.get('[data-testid="password-input"]').type("123"); // kısa password
    cy.get('[data-testid="terms-checkbox"]').check();

    cy.contains('Please enter a valid email address').should('be.visible');
    cy.contains('Password must be at least 4 characters long').should('be.visible');
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });
  it("Email ve password doğru ama checkbox işaretlenmemiş, buton disabled", () => {
    cy.get('[data-testid="email-input"]').type("test@wit.com");
    cy.get('[data-testid="password-input"]').type("12345678");

    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });
})
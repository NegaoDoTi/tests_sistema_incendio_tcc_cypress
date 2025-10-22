/// <reference types="cypress" />

describe("Teste de login no Medida de incendio", () => {
    it("Deve ser realizado o login de todos os usuarios", () => {
        cy.visit("http://medidasincendio.test/login")

        cy.get('input[id="email"]').type("teste@email.com")

        cy.get('input#password').type('teste123456789@teste')

        cy.get('button[type="submit"]').click()

        cy.wait(5000)

    })
})
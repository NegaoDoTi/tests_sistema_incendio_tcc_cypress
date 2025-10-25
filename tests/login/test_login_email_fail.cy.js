/// <reference types="cypress" />

import usuarios from '../../cypress/fixtures/invalid_email_users.json'

describe("Teste de login com email incorreto", () => {

    it("Teste de login com email incorreto", () => {
        
        var duracoes = []

        cy.wrap(usuarios).each((usuario, index, lista) => {

            var inicio = 0

            cy.then(() => {
                inicio = Date.now()
            })

            cy.visit("http://medidasincendio.test/login")

            cy.get('input#email').type(usuario.email)

            cy.get('input#password').type(usuario.senha)

            cy.get('button[type="submit"]').click()

            cy.wait(500)

            cy.get("body").then(($body) => {
                if ($body.find('ul[class="text-sm text-red-600 space-y-1 mt-2"] li').length > 0) {
                    cy.get('ul[class="text-sm text-red-600 space-y-1 mt-2"] li').should("have.text", 'auth.failed')
                }
                else {
                    cy.get('input#email').then(($email) => {
                        const isInvalid = $email[0].checkValidity()
                        expect(isInvalid).to.be.false
                    })
                }
            })

            cy.reload()
            
            cy.then(() => {
                var fim = Date.now()

                var duracaoTesteSegundos = (fim - inicio) / 1000

                duracoes.push(duracaoTesteSegundos)
            })

            cy.wait(1000)

        })

        cy.then(() => {
            cy.log(`Tempo de cada teste em segundos: ${duracoes.join(", ")}`)
        })

    })
    
})
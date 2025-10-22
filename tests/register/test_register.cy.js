/// <reference types="cypress" />

import usuarios from '../../cypress/fixtures/valid_users.json'

describe("Teste de registro de usuario", () => {

    it("Registando usuarios", () => {
        
        var duracoes = []

        cy.wrap(usuarios).each((usuario, index, lista) => {

            var inicio = 0

            cy.then(() => {
                inicio = Date.now()
            })

            cy.visit("http://medidasincendio.test/register")

            cy.get('input[id="name"]').type(usuario.nome)

            cy.get('input#email').type(usuario.email)

            cy.get('input#password').type(usuario.password)

            cy.get('input#password_confirmation').type(usuario.password)

            cy.get('button[type="submit"]').click()

            cy.get('div.hidden.sm\\:flex.sm\\:items-center.sm\\:ml-6 > div > div:nth-child(1) > button > div:nth-child(1)').should('be.visible')

            cy.get('div.hidden.sm\\:flex.sm\\:items-center.sm\\:ml-6 > div > div:nth-child(1) > button > div:nth-child(1)').should("have.text", `${usuario.nome}`)

            cy.url().should("eq", "http://medidasincendio.test/dashboard")

            cy.get('a[href="http://medidasincendio.test/logout"]').then(($elemento) => {
                $elemento[0].click()
            })
            
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


/*1.777, 1.788, 1.75, 1.799, 1.822, 1.841, 1.843, 1.851, 1.918, 1.901 */
/// <reference types="cypress" />

import usuarios from '../../cypress/fixtures/valid_users.json'

describe("Teste de deletar contas dos usuarios", () => {

    it("Teste de deletar contas dos usuarios", () => {
        
        var duracoes = []

        cy.wrap(usuarios).each((usuario, index, lista) => {

            var inicio = 0

            cy.then(() => {
                inicio = Date.now()
            })

            cy.visit("http://medidasincendio.test/login")

            cy.get('input#email').type(usuario.email)

            cy.get('input#password').type(usuario.password)

            cy.get('button[type="submit"]').click()

            cy.visit('http://medidasincendio.test/profile')

            cy.get('body > div > main > div > div > div:nth-child(3) > div > section > button').then(($delete) => {
                $delete[0].click()
            })

            cy.get('form[action="http://medidasincendio.test/profile"] input[id="password"]').then(($input_password) => {
                $input_password[0].value = `${usuario.password}`
            })

            cy.get('form[action="http://medidasincendio.test/profile"] div[class="mt-6 flex justify-end"] button:nth-child(2)').click()

            cy.wait(3)
            
            cy.url().should('eq', 'http://medidasincendio.test/')

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
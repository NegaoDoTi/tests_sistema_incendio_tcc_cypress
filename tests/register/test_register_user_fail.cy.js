/// <reference types="cypress" />

import usuarios from '../../cypress/fixtures/valid_users.json'

describe("Teste tentando cadastrar duas vezes o mesmo usuario", () => {

    it("Teste tentando cadastrar duas vezes o mesmo usuario", () => {
        
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
            
            cy.get('ul.text-sm.text-red-600.space-y-1.mt-2 li').should('have.text', 'validation.unique')
            
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
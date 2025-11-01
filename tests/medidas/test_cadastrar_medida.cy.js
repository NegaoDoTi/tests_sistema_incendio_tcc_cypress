/// <reference types="cypress" />

import medidas from '../../cypress/fixtures/valid_medidas.json'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Teste cadastro de medidas", () => {

    it("Teste cadastro de medidas", () => {

        cy.visit("http://medidasincendio.test/login")

        cy.get('input#email').type("teste@email.com")

        cy.get('input#password').type("teste123456789@teste")

        cy.get('button[type="submit"]').click()

        var duracoes = []

        cy.wrap(medidas).each((medida, index, lista) => {
            var inicio = 0

            cy.then(() => {
                inicio = Date.now()
            })

            cy.wait(1500)

            cy.visit('http://medidasincendio.test/locais/83')

            cy.get('h2:nth-child(5) > a > button').click()

            cy.wait(2500)

            cy.get('select[id="tipo_id"]').select("novo")

            cy.get('input#tipo_medida_select').type(medida.nome)

            cy.get('textarea[name=descricao]').type(medida.descricao)

            cy.get('input#foto').selectFile(`images/${medida.foto}`, {force : true})

            cy.wait(500)

            cy.get('input#icone').selectFile(`images/${medida.icone}`, {force : true})

            cy.get('form#tipoMedidaForm button[type=submit]').click()

            cy.wait(2000)

            cy.get('pre').should('be.visible').invoke('text').then(texto => {
                const resultado = JSON.parse(texto)

                expect(resultado.nome).to.equal(medida.nome.charAt(0).toUpperCase() + medida.nome.slice(1))
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
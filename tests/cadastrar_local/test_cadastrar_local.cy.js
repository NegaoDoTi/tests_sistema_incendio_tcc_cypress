/// <reference types="cypress" />

import locais from '../../cypress/fixtures/valid_locals.json'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Teste cadastro de locais", () => {

    it("Teste cadastro de locais", () => {

        cy.visit("http://medidasincendio.test/login")

        cy.get('input#email').type("teste@email.com")

        cy.get('input#password').type("teste123456789@teste")

        cy.get('button[type="submit"]').click()

        var duracoes = []

        cy.wrap(locais).each((local, index, lista) => {
            var inicio = 0

            cy.then(() => {
                inicio = Date.now()
            })

            cy.wait(3000)

            cy.visit("http://medidasincendio.test/locais/cadastrar")

            cy.get('input[id="nome"]').type(local.nome)

            cy.wait(500)

            cy.get('select[name="tipo_id"]').select(local.tipo)

            cy.get('input[name="capacidade"]').type(local.capacidade)

            cy.get(`button[onclick="openOverlay('overlayAddImagem')"]`).click()

            cy.get('input[id="nova_foto"]').selectFile(`images/${local.foto_local}`, {force: true})
            
            // .then(($nova_foto) => {
            //     $nova_foto[0].value = `C:/Users/Home/Documents/tests_sistema_incendio_tcc_cypress/images/${local.foto_local}`
            // })

            cy.get(`div[class="overlay active"] button[onclick="closeOverlay('overlayAddImagem')"]`).click()

            cy.get('input[id="mapa"]').selectFile(`images/${local.foto_mapa}`, {force: true})

            cy.get('div[class="mt-2"] button[type="submit"]').click()

            cy.wait(3000)

            cy.url().should('include', '/medidas/cadastrar')

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
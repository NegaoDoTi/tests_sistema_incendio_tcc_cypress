/// <reference types="cypress" />

import locais from '../../cypress/fixtures/invalid_local.json'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Teste cadastro de locais com paramentros vazios", () => {

    it("Teste cadastro de locais com paramentros vazios", () => {

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

            if (local.nome != null){
                cy.get('input[id="nome"]').type(local.nome)
            }

            cy.wait(500)
            
            if (local.tipo != null){
                cy.get('select[name="tipo_id"]').select(local.tipo)
            }

            if (local.capacidade != null){
                cy.get('input[name="capacidade"]').type(local.capacidade)
            }

            if (local.foto_local != null){
                cy.get(`button[onclick="openOverlay('overlayAddImagem')"]`).click()

                cy.get('input[id="nova_foto"]').selectFile(`images/${local.foto_local}`, {force: true})

                cy.get(`div[class="overlay active"] button[onclick="closeOverlay('overlayAddImagem')"]`).click()
            }

            if (local.foto_mapa != null){
                cy.get('input[id="mapa"]').selectFile(`images/${local.foto_mapa}`, {force: true})
            }

            cy.get('div[class="mt-2"] button[type="submit"]').click()

            cy.wait(500)

            if (local.tipo == null && local.capacidade == null){
                cy.get('body').then(($corpo) => {
                    if ($corpo.find('select[name="tipo_id"]').length > 0) {
                        cy.get('select[name="tipo_id"]').then(($tipo) => {
                            const isInvalid = $tipo[0].checkValidity()

                            if (!isInvalid) {
                                expect(isInvalid).to.be.false
                            }
                        })
                    }
                })
            }

            if (local.foto_mapa != null && local.foto_local != null){
                cy.get('div.p-4.sm\:p-8.bg-white.shadow.sm\:rounded-lg > form > div > section > div:nth-child(4) > label > span').should('contain.text', 'Mapa do local é obrigatório para prosseguir')
            }
            
            if (local.foto_mapa != null && local.foto_local != null && local.nome != null){
                cy.get('div.p-4.sm\:p-8.bg-white.shadow.sm\:rounded-lg > form > div > aside > span').should('contain.text', 'Escolha uma foto existente ou cadastre uma nova para prosseguir')
            }

            if (local.nome == null && local.tipo != null){
                cy.get('body').then(($corpo) => {
                    if ($corpo.find('input[id="nome"]').length > 0) {
                        cy.get('input[id="nome"]').then(($nome) => {
                            const isInvalid = $nome[0].checkValidity()

                            if (!isInvalid) {
                                expect(isInvalid).to.be.false
                            }
                        })
                    }
                })
            }

            if (local.capacidade == null && local.tipo != null) {
                cy.get("label[for='capacidade'].block.font-medium.text-sm.text-gray-700").should('contain.text', 'A capacidade deve ser informada para esse tipo de local')
            }

            if (local.nome == null && local.tipo == null && local.capacidade == null && local.foto_local == null && local.foto_mapa == null){
                cy.get('body').then(($corpo) => {
                    if ($corpo.find('input[id="nome"]').length > 0) {
                        cy.get('input[id="nome"]').then(($nome) => {
                            const isInvalid = $nome[0].checkValidity()

                            if (!isInvalid) {
                                expect(isInvalid).to.be.false
                            }
                        })
                    }
                })
            }

            if (local.nome == null && local.tipo == null && local.capacidade == null && local.foto_local == null && local.foto_mapa != null){
                cy.get('body').then(($corpo) => {
                    if ($corpo.find('input[id="nome"]').length > 0) {
                        cy.get('input[id="nome"]').then(($nome) => {
                            const isInvalid = $nome[0].checkValidity()

                            if (!isInvalid) {
                                expect(isInvalid).to.be.false
                            }
                        })
                    }
                })
            }

            // cy.get('div.alert.alert-danger').should("contain.text",  "Já existe um local com esse nome")

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
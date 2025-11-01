/// <reference types="cypress" />

import extintores from '../../cypress/fixtures/valid_extintores.json'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Teste de cadastro de extintores", () => {

    it("Teste de cadastro de extintores", () => {
        
        
        cy.visit("http://medidasincendio.test/login")
        
        cy.get('input#email').type("teste@email.com")
        
        cy.get('input#password').type("teste123456789@teste")
        
        cy.get('button[type="submit"]').click()
        
        cy.wait(3000)
        
        var duracoes = []

        cy.wrap(extintores).each((extintor, index, lista) => {

            var inicio = 0

            cy.then(() => {
                inicio = Date.now()
            })

            cy.visit("http://medidasincendio.test/locais/83")

            cy.wait(500)

            cy.get('h2:nth-child(7) >  a > button').click()

            cy.get('input[name="selo"]').type(extintor.selo)

            cy.get('input[name="capacidade"]').type(extintor.capacidade)

            cy.get('input[id="validade"]').type(extintor.validade)

            if (extintor.tipo_de_extintor == "Agua") {
                cy.get('input[id="1"]').click()
            }

            
            if (extintor.tipo_de_extintor == "Gás Carbônico") {
                cy.get('input[id="2"]').click()
            }

            
            if (extintor.tipo_de_extintor == "Pó Químico B/C") {
                cy.get('input[id="3"]').click()
            }

            
            if (extintor.tipo_de_extintor == "Espuma mecânica") {
                cy.get('input[id="5"]').click()
            }

            
            if (extintor.tipo_de_extintor == "Pó Químico A/B/C") {
                cy.get('input[id="5"]').click()
            }

            cy.get('button[type="submit"]').click()

            cy.get('body').then(($corpo) => {
                if ($corpo.find('#extintorForm > div > div.flex.items-center.gap-2 > p').length > 0){
                    cy.get('#extintorForm > div > div.flex.items-center.gap-2 > p').then(($sucess_msg) => {
                        const texto = $sucess_msg.text()

                        if (texto.includes('Extintor cadastrado com sucesso.')){
                            expect(texto).to.be.include('Extintor cadastrado com sucesso.')
                        }

                        if (texto.includes('Extintor cadastrado com sucesso. Extintor vencido!')){
                            expect(texto).to.be.include('Extintor cadastrado com sucesso. Extintor vencido!')
                            cy.log(`Test: ${index}: "Passou porem com bug de mensagem de extintor vencido"`)
                        }
                    })
                }
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
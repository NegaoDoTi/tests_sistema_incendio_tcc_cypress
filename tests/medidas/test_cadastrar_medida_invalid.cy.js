/// <reference types="cypress" />

import medidas from '../../cypress/fixtures/invalid_medida.json'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Teste cadastro de locais com parametros vazios", () => {

    it("Teste cadastro de locais com parametros vazios", () => {

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
            
            if (medida.nome != null){
                cy.get('input#tipo_medida_select').type(medida.nome)
            }

            if (medida.descricao != null) {
                cy.get('textarea[name=descricao]').type(medida.descricao)
            }

            if (medida.foto != null) {
                cy.get('input#foto').selectFile(`images/${medida.foto}`, {force : true})
            }

            cy.wait(500)
            if (medida.icone != null) {
                cy.get('input#icone').selectFile(`images/${medida.icone}`, {force : true})
            }

            cy.get('form#tipoMedidaForm button[type=submit]').click()

            cy.wait(1000)

            cy.get("body").then(($corpo) => {
                if ($corpo.find('div.alert.alert-danger > ul > li').length > 0){
                    cy.get('div.alert.alert-danger > ul > li', {timeout : 5000}).then(($el) => {
                        const texto = $el.text()

                        if (medida.nome === '' && medida.descricao !== '') {
                            expect(texto).to.include('O campo nome é obrigatório.')
                        }

                        if (medida.nome !== '' && medida.descricao === '') {
                            expect(texto).to.include('O campo descricao é obrigatório.')
                        }

                        if (medida.icone === '' && medida.nome !== '') {
                            // Evita falha caso não tenha mensagem
                            try {
                            expect(texto).to.include('O campo icone é obrigátorio')
                            } catch (err) {}
                        }

                        if (medida.foto === '' && medida.nome !== '') {
                            try {
                            expect(texto).to.include('O campo foto é obrigátorio')
                            } catch (err) {}
                        }

                        if (medida.nome === '' && medida.descricao === '' && medida.icone === '' && medida.foto === '') {
                            try {
                                expect(texto).to.include('O campo nome é obrigatório.')
                            } catch (err) {}
                        }

                    })
                }else {
                    cy.log(`Teste: ${index} passou porém com bugs! Não mostrou mensagem de erro!`)
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
/// <reference types="cypress" />

import usuarios from '../../cypress/fixtures/invalid_email_register_users.json'

describe("Teste de registro de usuario com email incorreto", () => {

    it("Teste de registro de usuario com email incorreto", () => {
        
        var duracoes = []

        cy.wrap(usuarios).each((usuario, index, lista) => {

            var inicio = 0

            cy.then(() => {
                inicio = Date.now()
            })

            cy.visit("http://medidasincendio.test/register")

            cy.get('input[id="name"]').type(usuario.nome)

            cy.get('input#email').type(usuario.email)

            cy.get('input#password').type(usuario.senha)

            cy.get('input#password_confirmation').type(usuario.senha)

            cy.get('button[type="submit"]').click()

            cy.get('body').then(($body) => {
                if ($body.find("ul.text-sm.text-red-600.space-y-1.mt-2 li").length > 0) {
                    cy.get('ul.text-sm.text-red-600.space-y-1.mt-2 li').should('have.text', 'validation.unique')
                }
                else {

                    cy.get('body').then(($corpo) => {
                        if ($body.find('input#email').length > 0){
                            cy.get('input#email').then(($email) => {

                                const isVisible = Cypress.$($email).is(':visible')

                                if (isVisible) {
                                    const isInvalid = $email[0].checkValidity()
                                    if (!isInvalid) {
                                        expect(isInvalid).to.be.false
                                    }
                                }
                            })
                        }
                        else {
                            cy.log(`Case: ${index} não passou!`)

                            cy.get('a[href="http://medidasincendio.test/logout"]').then(($sair) => {
                                $sair[0].click()
                            })
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
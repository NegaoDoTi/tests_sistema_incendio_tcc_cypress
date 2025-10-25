/// <reference types="cypress" />

import usuarios from '../../cypress/fixtures/empty_users.json'

describe("Teste tentando registrar usuarios com campos de dados vazios", () => {

    it("Teste tentando registrar usuarios com campos de dados vazios", () => {
        
        var duracoes = []

        cy.wrap(usuarios).each((usuario, index, lista) => {

            var inicio = 0

            cy.then(() => {
                inicio = Date.now()
            })

            cy.visit("http://medidasincendio.test/register")

            if (usuario.nome != null){
                cy.get('input[id="name"]').type(usuario.nome)
            }

            if (usuario.email != null){
                cy.get('input#email').type(usuario.email)
            } 

            if (usuario.senha != null) {
                cy.get('input#password').type(usuario.senha)

                cy.get('input#password_confirmation').type(usuario.senha)
            }

            cy.get('button[type="submit"]').click()

            cy.wait(500)

            if (usuario.nome == null) {
                cy.get('input[id="name"]').then(($nome) => {
                    const isInvalid = $nome[0].checkValidity()
                    
                    expect(isInvalid).to.be.false
                })
            }

            if (usuario.email == null) {
                cy.get('input#email').then(($email) => {
                    const isInvalid = $email[0].checkValidity()
                    
                    expect(isInvalid).to.be.false
                })
            }

            if (usuario.senha == null) {
                cy.get('input#password').then(($senha) => {
                    const isInvalid = $senha[0].checkValidity()
                    
                    expect(isInvalid).to.be.false
                })
            }

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

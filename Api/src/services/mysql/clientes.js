
const clientes = deps => {
    return {
        all: () => {

            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT * FROM cliente', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falhou ao listar os clientes', reject)
                        return false;
                    }
                    resolve({ cliente: results })
                })
            })

        },
        save: (cliente) => {


            cliente = JSON.parse(cliente)/*obj Javascript */

            var nome = cliente.nome
            var cpf = cliente.cpf
            var email = cliente.email
            var situacao = cliente.situacao
            var cli = ({ nome, cpf, email, situacao })



            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                connection.query('INSERT INTO cliente set ?', [cli], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao salvar o cliente ${cli.nome} `, reject)

                        return false;
                    }
                    resolve({ cliente: { cliente, id: results.insertId } })
                    cliente.telefone.forEach(numtelefone => {
                        let clientecpf = cpf
                        let tel = ({ clientecpf, numtelefone })
                        console.log("passou do cliente")
                        connection.query('INSERT INTO telefone set ?', [tel], (error, results) => {
                            if (error) {
                                errorHandler(error, `Falhou ao salvar o(s) telefone(s) cliente ${cli.nome} `, reject)

                                return false;
                            }
                            resolve({ cliente: { cliente, id: results.insertId } })
                        })
                    })
                });
            })

            console.log("passou pelo telefone")

            /* return new Promise((resolve, reject) => {
                 const { connection, errorHandler } = deps
                 connection.query('INSERT INTO cliente set ?', [cli], (error, results) => {
                     if (error) {
                         errorHandler(error, `Falhou ao salvar o cliente ${cli.nome} `, reject)
 
                         return false;
                     }
                     resolve({ cliente: { cliente, id: results.insertId } })
                 })
 
             })*/



        },
        update: (cliente) => {
            cliente = JSON.parse(cliente)
            console.log("chegou ao PUT")

            var nome = cliente.nome
            var cpf = cliente.cpf
            var email = cliente.email
            var situacao = cliente.situacao
            var cli = ({ nome, cpf, email, situacao })

            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('UPDATE cliente SET ? WHERE id=?', [cli, cliente.id], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao atualizar  o cliente ${cliente} `, reject)
                        return false;
                    }
                    resolve({ cliente: { cliente, id: results.insertId } })
                })
            })
        },
        del: (id) => {


            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('DELETE FROM cliente  WHERE id=?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao remover  o cliente ${cliente.id} `, reject)
                        return false;
                    }
                    resolve({ message: 'Cliente removido com sucesso!' })
                })

            })

        },

    }
}


module.exports = clientes






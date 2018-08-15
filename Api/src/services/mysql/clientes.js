
const clientes = deps => {
    return {
        all: () => {

            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT distinct c.id as id,c.nome as nome,c.cpf as cpf,c.email as email,c.situacao as situacao FROM cliente c', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falhou ao listar os clientes', reject)
                        return false;
                    }
                    connection.query('SELECT t.id AS idtelefone, t.clientecpf AS clientecpf,t.numtelefone as numtelefone FROM telefone t ', (error, resTel) => {
                        if (error) {
                            errorHandler(error, 'Falhou ao listar os telefones', reject)
                            return false;
                        }
                        //cria uma resposta com dois objetos que podem ser usados separadamente , poderia ser feito um atributo array dentro de cliente
                        resolve({ cliente: results, telefones: resTel })
                    })                    
                })
            })
        },

        save: (cliente) => {


            cliente = JSON.parse(cliente)/*obj Javascript */

            var nome = cliente.nome                         //            
            var cpf = cliente.cpf                           //           
            var email = cliente.email                       //    foi separado assim para poder inserir primeiro o cliente e depois os telefones      
            var situacao = cliente.situacao                 //    se fosse outro CRUD para telefones poderia ter outra requisição para inserir no banco 
            var cli = ({ nome, cpf, email, situacao })      //    



            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                connection.query('INSERT INTO cliente set ?', [cli], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao salvar o cliente ${cli.nome} `, reject)

                        return false;
                    }
                    resolve({ cliente: { cliente, id: results.insertId } })
                    cliente.numtelefone.forEach(numtelefone => {

                        let clientecpf = cpf                        // pega para salvar na foreign key da tabela de telefones
                        let tel = ({ clientecpf, numtelefone })     //

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
        },
        update: (cliente) => {
            cliente = JSON.parse(cliente)

            var nome = cliente.nome
            var cpf = cliente.cpf                      // segue a mesma logica que o insert
            var email = cliente.email                  // so que para fazer o Update dos telefones teria que se pegar ID,clientecpf e numtelefone para atualizar(tentar fazer um outro momento).
            var situacao = cliente.situacao            // Lembrete: não esquece das validações para ver se terá uma atualização de numero
            var cli = ({ nome, cpf, email, situacao }) // cria o objeto para ser salvo no update sem os telefones
            

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
        del: (cliente) => {

            var id = cliente.id
            var cpf = cliente.cpf
          
            //como no banco os updates e deletes são em cascade , deletar o cliente apga todos os numeros, não foi passado restrição se era esse o objetivo ou era pra manter o histórico
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(' DELETE FROM cliente  WHERE  cliente.cpf=? ', [cpf], (error, results) => {
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






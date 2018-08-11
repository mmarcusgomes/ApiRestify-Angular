
const clientes = deps => {
    return {
        all: () => {


  


         
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT distinct c.id as id,c.nome as nome,c.cpf as cpf,c.email as email,c.situacao as situacao,t.numtelefone as numtelefone FROM cliente c INNER JOIN telefone  t ON cpf = t.clientecpf', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falhou ao listar os clientes', reject)
                        return false;
                    }
                   
                    
                   
                   /*var obj =JSON.stringify(results)
                   console.log(obj)
                   var t = JSON.parse(obj)
                   console.log(t)*/
                  /*obj.forEach(e => {
                       console.log('foreach')
                       if(e.cpf==results.cpf && contador==0){
                           console.log('primeiro if')
                       body = {cpf :e.cpf,nome :e.nome}
                       console.log(contador)
                       contador++;
                       }if(e.cpf==results.cpf && contador==1){
                        body.numtelefone.push(e.numtelefone)
                       }
                   });
                   /*console.log("teste do results")
                   console.log(body)
                   console.log("teste do results")
                   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')*/
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
        del: (cliente) => {

            var id = cliente.id 
            var cpf = cliente.cpf
            console.log(cliente)
            console.log("chegou ao del")

            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('DELETE FROM cliente,telefone using cliente,telefone  WHERE cpf=? AND clientecpf=?', [cpf,cpf], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao remover  o cliente ${cliente.id} `, reject)
                        return false;
                    }
                    resolve({ message: 'Cliente removido com sucesso!' })
                })

            })

           /*remover tudo se um cliente for removido */
              /*return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(' DELETE FROM cliente , telefone USING cliente , telefone WHERE  cliente.id=? AND clientecpf=?', [id,cpf], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao remover  o cliente ${cliente.id} `, reject)
                        return false;
                    }
                    resolve({ message: 'Cliente removido com sucesso!' })
                })

            })*/

        },

    }
}


module.exports = clientes






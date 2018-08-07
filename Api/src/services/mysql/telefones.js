



const telefones = deps => {
    return { 
        /*all: () => {

            return new Promise((resolve, reject) => {
                const { connection,errorHandler } = deps
                connection.query('SELECT * FROM cliente', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falhou ao listar os clientes', reject)
                        return false;
                    }
                    resolve({ cliente: results })
                })
            })

        },*/
        save: (telefones) => {

            var telefones = []
               //console.log(cliente.numtelefone)
               
              var nome = cliente.nome
              var cpf = cliente.cpf
              var email = cliente.email
              var cli =({nome,cpf,email})
              //console.log(cliente)

            /*var tel =  Object.keys(cliente).map(function(key) {
                  if(key=='numtelefone'){
                   telefones = cliente[key]
                  }               
            });*/
            //console.log(tel)

              /*for (var c in cliente) {
                if (cliente.hasOwnProperty(c)) {
                    if(c.numtelefone){
                        console.log(c.numtelefone)
                    }
                }
            }*/

                
              /*cliente.forEach(function (item, indice, array) {
                 telefones[indice] = item.numtelefone
                 console.log(telefones[indice])
              });*/
             //console.log(teste)
           



            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('INSERT INTO telefone set ?',[telefones], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao salvar o cliente ${cli.nome} `, reject)
                        
                        return false;
                    }

                    resolve({ cliente: { cliente, id: results.insertId } })
                    
                })       
             
                /*connection.query('INSERT INTO telefone VALUES(?,?) ',[cliente.cpf,cliente.telefone], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao salvar o telefone cliente ${cliente.nome} `, reject)
                        
                        return false;
                    }

                    resolve({ cliente: { cliente, id: results.insertId } })
                
                })*/



            })
        },
        update: (cliente) => {           
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('UPDATE cliente SET ? WHERE id=?', [cliente, cliente.id], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao atualizar  o cliente ${cliente} `, reject)
                        return false;
                    }
                    resolve({ cliente: { cliente, id: results.insertId } })
                })

            })
        },
        del: (id) => {
            //console.log(id)
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('DELETE FROM cliente  WHERE id=?', [ id], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falhou ao remover  o cliente ${cliente.id} `, reject)
                        return false;
                    }
                    resolve({message:'Cliente removido com sucesso!' })
                })

            })

        },

    }
}


module.exports = telefones







const db = require('../services/mysql')

const routes = (server) => {
    /*async diz ao node que vai ter uma chamado asyncrona  */
    server.get('/cliente', async (req, res, next) => {
        try {
            /*await faz com que espere pelos resultados */
            res.send(await db.clientes().all())
           // console.log(res)
            next()
        } catch (error) {
            res.send(error)
            next()
        }
    })

    server.post('/cliente', async (req, res, next) => {

        const cliente = req.body
        console.log(cliente)
        try {
            /*await faz com que espere pelos resultados */
            //console.log('teste')
            res.send(await db.clientes().save(cliente))
            next()
        } catch (error) {
            console.log('error router')
            res.send(error)
            next()
        }
    })

    server.put('/cliente', async (req, res, next) => {

        const cliente = req.body
        // console.log(cliente)
        try {
            /*await faz com que espere pelos resultados */
            res.send(await db.clientes().update(cliente))
            next()
        } catch (error) {
            res.send(error)
            next()
        }
    })
    server.del('/cliente/:cpf', async (req, res, next) => {
        const cpf = req.params
        //const cliente = req.body
        //console.log(cliente)
        console.log(cpf)
        try {
            /*await faz com que espere pelos resultados */
            res.send(await db.clientes().del(cpf))
            next()
        } catch (error) {
            res.send(error)
            next()
        }
    })

    server.get('/', async (req, res, next) => {
        res.send(['1', 'testando'])

        next()
    })
}

module.exports = routes
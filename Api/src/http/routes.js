
const db = require('../services/mysql')

const routes = (server) => {
    /*async diz ao node que vai ter uma chamado asyncrona  */
    server.get('/cliente', async (req, res, next) => {
        try {
            /*await faz com que espere pelos resultados */
            res.send(await db.clientes().all())
            next()
        } catch (error) {
            res.send(error)
            next()
        }
    })

    server.post('/cliente', async (req, res, next) => {

        const cliente = req.params      

        try {
            /*await faz com que espere pelos resultados */
            res.send(await db.clientes().save(cliente))
            next()
        } catch (error) {
            res.send(error)
            next()
        }
    })

    server.put('/cliente', async (req, res, next) => {
       
        const cliente = req.params
        try {
            /*await faz com que espere pelos resultados */
            res.send(await db.clientes().update(cliente))
            next()
        } catch (error) {
            res.send(error)
            next()
        }
    })
    server.del('/cliente', async (req, res, next) => {
        const { id } = req.params
        try {
            /*await faz com que espere pelos resultados */
            res.send(await db.clientes().del(id))
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
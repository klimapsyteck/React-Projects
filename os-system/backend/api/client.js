
module.exports = app => {

    const save = (req, res) => {
        const client = {...req.body}
        if(req.params.id) client.id = req.params.id

        if(client.id){
            app.db('clients')
                .update(client)
                .where({id: client.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('clients')
                .insert(client)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const getClients = (req, res) => {
         app.db('clients')
            .select('*')
            .then(clients => res.json(clients))
            .catch(err => res.status(500).send(err))
    }

    const getClient = (req, res) => {
        app.db('clients')
            .select('*')
            .where({id: req.params.id})
            .first()
            .then(client => res.json(client))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = (req, res) => {
        app.db('clients')
            .where({id: req.params.id})
            .del()
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return {save, getClients, getClient, remove}
}
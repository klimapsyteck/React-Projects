
module.exports = app =>{


    const save = (req, res) => {
        const os = {...req.body}
        if(req.params.id) os.id = req.params.id
        
        if(os.id){
            app.db('os')
                .update(os)
                .where({id: os.id})
                .then(_ =>  res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('os')
                .insert(os)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                
        }
    }   
    const getLast = (req, res) =>{
        const data = {...req.body}
        console.log(data)
        app.db('os')                       
            .max('id as idOs')            
            .then(os => app.db('cllient_os').insert({idOs: os[0].idOs, idClient: data.idClient, idUser: data.idUser }).then(_ => console.log('Passei')))           
        }

    const getAll = (req, res) => {
        app.db('os')
            .select('*')
            .then(oss => res.json(oss))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        const id = req.params.id
        app.db('os')
            .select('*')
            .where({id: id})
            .first()
            .then(os => res.json(os))
            .catch(err => res.status(500).send(err))
    }

    const remove = (req, res) => {
        const id = req.params.id
        app.db('os')
            .where({id: id}).del()
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return {save, getAll, getById, remove, getLast}
}

module.exports = app => {
    const save = (req, res) =>{
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        if(user.id){
            app.db('users')
                .update(user)
                .where({id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status().send(err))
        }else{
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status().send(err))
        }
    }
    const getUsers = (req, res) =>{
        app.db('users')
            .select('*')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))

    }
    const getUser = (req, res) =>{
        app.db('users')
            .where({id: req.params.id})
            .then(user => res.json(user))
    }
    const remove = (req, res) =>{
        app.db('users')
            .where({id: req.params.id})
            .del()
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
    return {save, getUsers, getUser, remove}
}

module.exports = app => {

    const {existsOrError} = app.api.validation

    const save = (req, res) => {
        const task = {...req.body}
        if(req.params.id) task.id = req.params.id
        
        try {
            existsOrError(task.name, 'Nome não informado.')
            existsOrError(task.description, 'Descrição não informada.')
        } catch (msg) {
            return res.status(500).send(msg)
        }

        if(task.id){
           app.db('tasks')
            .update(task)
            .where({id: req.params.id})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('tasks')
            .insert(task)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }
    const getTasks = (req, res) => {
        app.db('tasks')
            .select('*')
            .orderBy('tasks.id', 'asc')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(500).send(err))
    }
    const getTask = (req, res) => {
        app.db('tasks')
            .select('*')
            .where({id: req.params.id})
            .first()
            .then(task => res.json(task))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('tasks')
                .where({id: req.params.id})
                .del()
            try {
                existsOrError(rowsDeleted, 'Tarefa não encontrada.')
            } catch (msg) {
                return res.status(400).send(msg)
            }
            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const updateStatus = (req, res) => {
        app.db('tasks')
            .update({status: req.body.status})
            .where({id: req.params.id})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(erro))
    }

    return {save, getTasks, getTask, remove, updateStatus}
}
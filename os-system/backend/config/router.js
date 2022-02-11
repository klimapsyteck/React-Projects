
module.exports = app => {
    //Routes to OS
    app.route('/os')
        .get(app.api.os.getAll)
        .post(app.api.os.save)
    
    app.route('/os/testes')
        .post(app.api.os.getLast)

    app.route('/os/testes/:id')
        .get(app.api.os.getThings)

    app.route('/os/:id')
        .get(app.api.os.getById)
        .put(app.api.os.save)
        .delete(app.api.os.remove)
    
    //Routes to Client
    app.route('/client')
        .get(app.api.client.getClients)
        .post(app.api.client.save)
    
    app.route('/client/:id')
        .get(app.api.client.getClient)
        .put(app.api.client.save)
        .delete(app.api.client.remove)

    //Routes to User
    app.route('/user')
        .get(app.api.user.getUsers)
        .post(app.api.user.save)
    
    app.route('/user/:id')
        .get(app.api.user.getUser)
        .put(app.api.user.save)
        .delete(app.api.user.remove)
       
}
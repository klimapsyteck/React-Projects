
module.exports = app => {
    app.route('/os')
        .get(app.api.os.getAll)
        .post(app.api.os.save)
    
    app.route('/os/testes')
        .get(app.api.os.getLast)

    app.route('/os/:id')
        .get(app.api.os.getById)
        .put(app.api.os.save)
        .delete(app.api.os.remove)
    
    app.route('/os/testes')
        .post(app.api.os.getLast)
       
}
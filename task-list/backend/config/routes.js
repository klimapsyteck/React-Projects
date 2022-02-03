
module.exports = app => {
    app.route('/tasks')
        .post(app.api.task.save)
        .get(app.api.task.getTasks)
    
    app.route('/tasks/:id')
        .put(app.api.task.save)
        .get(app.api.task.getTask)
        .delete(app.api.task.remove)
    app.route('/tasks/status/:id')
        .put(app.api.task.updateStatus)

}
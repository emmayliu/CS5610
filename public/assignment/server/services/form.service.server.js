/**
 * Created by emma on 3/13/16.
 */
module.exports = function(app, formModel) {

    app.get("/api/assignment/user/:userId/form", getFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);



    function getFormsByUserId (req, res) {
        var userId = req.params.userId;
        res.json(formModel.findFormsByUserId(userId));
    }

    function getFormById (req, res) {
        var id = req.params.id;
        res.json(formModel.findFormById(id));
    }

    function deleteFormById (req, res) {
        var id = req.params.id;
        res.json(formModel.deleteFormById(id));
    }

    function createForm (req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form.userId = userId;
        res.json(formModel.createForm(form));
    }

    function updateFormById (req, res) {
        var id = req.params.id;
        var form = req.body;
        res.json(formModel.updateForm(id, form));
    }

};
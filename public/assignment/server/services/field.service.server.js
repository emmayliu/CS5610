/**
 * Created by emma on 3/13/16.
 */
module.exports = function(app, formModel) {

    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByIds);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function getFieldsByFormId(req, res) {
        var formId = req.params.formId;
        res.json(formModel.findAllFields(formId));
    }

    function getFieldByIds(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        res.json(formModel.findFieldByIds(formId, fieldId));
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        res.json(formModel.deleteField(formId, fieldId));
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;

        res.json(formModel.createField(formId, field))
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        var field = req.body;
        res.json(formModel.updateField(formId, field, fieldId));

    }
};
/**
 * Created by emma on 3/13/16.
 */

"use strict";

module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormField);
    app.post("/api/assignment/form/:formId/field", addFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);

    function findFieldsForForm(req, res) {
        var formId = req.params.formId;
        formModel.findAllFields(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFieldByIds(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function deleteFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteField(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }



    function addFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel.createField(formId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            )
    }

    function updateFormField(req, res) {
        console.log("field updating in server");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        formModel.updateField(formId, fieldId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};
/**
 * Created by emma on 4/07/16.
 */
"use strict";

module.exports = function (mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    // use mongoose to declare a form schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: { type: String, default: 'New Form' },
        fields: [FieldSchema],
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    }, {collection: 'form'});
    return FormSchema;
};
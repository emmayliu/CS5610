/**
 * Created by emma on 3/13/16.
 */

module.exports = function(app, mongoose, db) {

    // pass db and mongoose reference to model
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var formModel   = require("./models/form.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);

};
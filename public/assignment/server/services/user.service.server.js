/**
 * Created by emma on 3/13/16.
 */



module.exports = function(app, userModel){
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUser);
    //app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    //app.get("/api/assignment/user?username=username", getUserByUsername);
    //app.get("/api/assignment/user?username=username&password=password", getUserByCredential);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    // functions
    function createUser (req, res) {
        var user = req.body;
        user.roles = ['student'];
        res.json(userModel.createUser(user));
    }

    function getUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username != null && password !=null) {
            getUserByCredential(req, res);
        }
        else if(username != null) {
            getUserByUsername(req, res);
        }
        else {
            getAllUsers(req, res);
        }

    }


    function getAllUsers (req, res) {
            userModel.findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
    }

    function getUserById (req, res) {
        var id = req.params.id;
        //console.log("user id is " +id);
        var user = userModel.findUserById(id);
        if(user){
            res.json(user);
        }
        res.json({message: "user not found"});
    }

    function getUserByUsername (req, res) {
        var username = req.query.username;
       // console.log("username is " +username);
        for(var m in mock) {
            if(mock[m].username === username) {
                res.json(mock[m]);
                return;
            }
        }
        res.json({message: "user not found"});
    }

    function getUserByCredential(req, res) {
        //console.log("user service server");
        var credentials = {};
        credentials.username = req.query.username;
        credentials.password = req.query.password;
        userModel
            .findUserByCredentials(credentials)
            .then(function(user) {
                res.json(user);
            });
    }

    function updateUser (req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(userModel.updateUser(id, user));
    }

    function deleteUser (req, res) {
        var id = req.params.id;
        res.json(userModel.deleteUser(id));
    }
};
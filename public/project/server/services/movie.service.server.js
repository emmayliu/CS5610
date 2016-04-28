/**
 * Created by emma on 4/20/16.
 */
module.exports = function(app, movieModel, userModel) {
    app.post("/api/project/user/:userId/details/:imdbID", userLikesMovie);
    app.get("/api/project/details/:imdbID/user", findUserLikes);

    function findUserLikes (req, res) {
        var imdbID = req.params.imdbID;

        var movie = null;
        movieModel
            .findMovieByImdbID(imdbID)
            .then (
                function (doc) {
                    movie = doc;
                    if (doc) {
                        return userModel.findUsersByIds(movie.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    movie.userLikes = users;
                    res.json(movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userLikesMovie(req, res) {
        var movieOmdb  = req.body;
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;
        var movie;

        movieModel
            .userLikesMovie(userId, movieOmdb)
            // add user to details likes
            .then(
                function (movie) {
                    return userModel.userLikesMovie(userId, movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add details to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
/**
 * Created by emma on 4/29/16.
 */
module.exports = function (app, reviewModel) {

    app.post("/api/project/user/:userId/review", createReview);



    function createReview(req, res) {
        var review = req.body;
        var userId = req.params.userId;
        reviewModel
            .userReviewMovie(userId, review)
            .then(function (err, doc) {
                if (err) {
                    res.status(400).send(err);
                }
                if (doc) {
                    res.json(doc);
                }
            });
    }

};
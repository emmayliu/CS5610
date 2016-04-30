/**
 * Created by emma on 4/20/16.
 */
module.exports = function (mongoose) {
    var MovieSchema = new mongoose.Schema({
        imdbID: String,
        title: String,
        poster: String,
        likes: [String],
        userLikes: [
            {username: String}
        ],
    }, {collection: "project.movie"});
    return MovieSchema;
};
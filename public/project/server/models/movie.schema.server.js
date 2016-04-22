/**
 * Created by emma on 4/20/16.
 */
module.exports = function (mongoose) {
    var MovieSchema = new mongoose.Schema({
        Id: Number,
        Name: String,
        Year: Number,
        ImageUrl: String,
        Rating: Number,
        Description: String,
        Director: String,
        Actors: String,
        Genre: String
    }, {collection: "project.movie"});
    return MovieSchema;
}
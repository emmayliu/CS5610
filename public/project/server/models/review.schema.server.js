/**
 * Created by emma on 4/22/16.
 */
module.exports = function (mongoose) {
    var ReviewSchema = new mongoose.Schema({
        id: String,
        movieId: Number,
        userId: String,
        content: String,
        time: Date
    }, {collection: "project.review"});
    return ReviewSchema;
}
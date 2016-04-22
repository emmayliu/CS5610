/**
 * Created by emma on 4/22/16.
 */
module.exports = function(mongoose) {
    var FollowSchema = mongoose.Schema({
        id: String,
        username: String
    });

    return FollowSchema;
};
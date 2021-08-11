//importing mongodb
const mongo = require("../shared/mongo");

const { ObjectId } = require("mongodb");

const service = {
  getPosts() {
    return mongo.db.collection("posts").find().toArray();
  },
  getPost(id) {
    return mongo.db.collection("posts").findOne({ _id: ObjectId(id) });
  },
  addPosts(data) {
    return mongo.db.collection("posts").insert(data);
  },
  updatePosts(id, data) {
    return mongo.db
      .collection("posts")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: data },
        { returnDocument: "after" }
      );
  },
  deletePost(id){
      return mongo.db.collection("posts").deleteOne({_id : ObjectId(id)});
  }
};

module.exports = service;

const mongoose = require("mongoose");
const config = require("../keys/config");
mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect(config.mongoURI);
  mongoose.connection.once("open", () => done()).on("error", error => {
    console.warn("Warning", error);
  });
});

beforeEach(done => {
  const { posts } = mongoose.connection.collections;
  posts.drop().then(() => done()).catch(() => done());
});

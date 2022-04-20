import mongoose from "mongoose";

mongoose.connect(
  'mongodb://us_streamchat_db:nyepMThBy2WPNP7aQvC7ZezxL3U5CVCr@localhost:27017/stramchatdb?authSource=admin'
);

const db = mongoose.connection;
export default db;
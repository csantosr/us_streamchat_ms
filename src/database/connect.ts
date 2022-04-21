import mongoose from "mongoose";

mongoose.connect(
  'mongodb://us_streamchat_db:nyepMThBy2WPNP7aQvC7ZezxL3U5CVCr@172.18.0.2:27017/stramchatdb?authSource=admin'
);

const db = mongoose.connection;
export default db;
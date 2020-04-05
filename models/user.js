const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email:    String,
  password: String,
  profilePic: String,
  articles: [{type: Schema.Types.ObjectId, ref: 'Article'}],
  playlists: [{type: Schema.Types.ObjectId, ref: 'Playlist'}]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

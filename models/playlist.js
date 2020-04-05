const mongoose = require('mongoose');
const {Schema}   = mongoose;
const User = require('./user.js');

const PlaylistSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  title: { type: String, required: true },
  overview: String, /* résumé de l'article */
  picFeatured: String, /* image de Une */
  picCaption: String, /* légende image de Une */
  picCredit: String, /* crédit image de Une */
  picPlaylist: String, /* SI PLAYLIST, image */
  playlistSpotify: String, /* SI PLAYLIST */
  playlistDeezer: String, /* SI PLAYLIST */
  playlistYoutube: String, /* SI PLAYLIST */
  author: { type: String, required: true },
  authorTwitter: String,
  authorIG: String,
  chapo: String,
  articleContent: { type: String, required: true }, /* contenu de l'article */
  lang: String, /* langue pour filtrer plus tard */
  cat: String, /* catégorie */
  tags: Array
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;
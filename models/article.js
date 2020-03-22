const mongoose = require('mongoose');
const {Schema}   = mongoose;
const User = require('./user.js');

const ArticleSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  overview: String, /* résumé de l'article */
  picFeatured: String, /* image de Une */
  picCaption: String, /* légende image de Une */
  picCredit: String, /* crédit image de Une */
  picPlaylist: String, /* SI PLAYLIST, image */
  playlistSpotify: String, /* SI PLAYLIST */
  playlistDeezer: String, /* SI PLAYLIST */
  playlistYoutube: String, /* SI PLAYLIST */
  author: String,
  authorTwitter: String,
  authorIG: String,
  chapo: String,
  articleContent: String, /* contenu de l'article */
  lang: String, /* langue pour filtrer plus tard */
  cat: String, /* catégorie */
  tags: Array
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
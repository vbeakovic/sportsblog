const mongoose = require('mongoose');

// Category schema
const articleSchema = mongoose.Schema({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  category: {
    type: String
  },
  author: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  comment: [{
    comment_subject: {
      type: String
    },
    comment_body: {
      type: String
    },
    comment_author: {
      type: String
    },
    comment_email: {
      type: String
    },
    comment_date: {
      type: String
    }
  }]
});

const Article = module.exports = mongoose.model('Article', articleSchema);

// Get articles
module.exports.getArticles = function(callback, limit) {
  Article.find(callback).limit(limit).sort([['title', 'ascending']]);
}

// Add article
module.exports.addArticle = function(article, callback) {
  Article.create(article, callback);
}

// Get single article by Id
module.exports.getArticleById = function(id, callback) {
  Article.findById(id, callback);
}

// Update article
module.exports.updateArticle = function(query, update, options, callback) {
  Article.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeArticle = function(query, callback) {
  Article.remove(query, callback);
}

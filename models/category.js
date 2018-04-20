const mongoose = require('mongoose');

// Category schema
const categorySchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  }
});

const Category = module.exports = mongoose.model('Category', categorySchema);

// Get categories
module.exports.getCategories = function(callback, limit) {
  Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}

// Add category
module.exports.addCategory = function(category, callback) {
  Category.create(category, callback);
}

// Get single category by Id
module.exports.getCategoryById = function(id, callback) {
  Category.findById(id, callback);
}

// Update category
module.exports.updateCategory = function(query, update, options, callback) {
  Category.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeCategory = function(query, callback) {
  Category.remove(query, callback);
}

define([
  'underscore',
  'backbone',
  'models/photo'
], function(_, Backbone, PhotoModel){
  var PhotoCollection = Backbone.Collection.extend({
    model: PhotoModel
  });
  return PhotoCollection;
});
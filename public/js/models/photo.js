define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var PhotoModel = Backbone.Model.extend({
    defaults: {
      id: "0",
	  title: "",
	  server: "",
	  farm: "0",
	  secret: ""
    }
  });
  return PhotoModel;
});
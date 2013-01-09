define([
  'jquery',
  'underscore',
  'backbone',
  'collections/photos',
  'views/photoListElement',
], function($, _, Backbone,PhotoCollection,photolistItemView){
  var photolistView = Backbone.View.extend({
    el: $('.sidebar .list'),
	initialize: function(list,photoId){
		this.collection = new PhotoCollection();
		for(var i=0;i<list.length;i++)
		{
			list[i]['selected']	=	(photoId && photoId==list[i].id);
			this.collection.add(list[i]);
		}
		//logAlert(this.collection);
	},
    render: function(){
      var data = {};
	  this.$el.html('');
		for(var i=0;i<this.collection.models.length;i++)
		{
			var img	=	this.collection.models[i];
			//var imgView	=	new photolistItemView(img);
			this.$el.append(new photolistItemView(img).render().el);
		}
      //this.$el.append( compiledTemplate );
    }
  });
  return photolistView;
});
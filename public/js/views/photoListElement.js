define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  var photolistView = Backbone.View.extend({
    tagName: 'li',
	initialize: function(){
	},
	 events: {
      "click .lnk"   : "selectPic"
    },
    render: function(){
      var data = {};
		this.$el.html('<a class="lnk" href="/photo/'+this.id+'"><img alt="'+this.attributes.title+'" src="'+getFlickrSrc(this.attributes, 't')+'"></a>');
		if(this.attributes.selected)
			this.$el.addClass('selected');
		//logAlert(this.$el);
	return this;
      //this.$el.append( compiledTemplate );
    },
	selectPic: function(e) {
		e.preventDefault();
      //logAlert(this);
	  Backbone.history.navigate("photo/"+this.id,{trigger:true});
	  this.$el.parent().children('li').removeClass('selected');
	  this.$el.addClass('selected');
	}
  });
  return photolistView;
});
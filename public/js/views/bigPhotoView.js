define([
  'jquery',
  'underscore',
  'backbone',
  'models/photo',
], function($, _, Backbone,PhotoModel){
  var bigPhotoView = Backbone.View.extend({
    el: $('.floatWrap>.content'),
	initialize: function(params){
		this.model = new PhotoModel(params);
	},
	 events: {
    },
    render: function(){
		var data = {};
		//logAlert(this.model);
		var iAttr	=	this.model.attributes;
		var cnt	=	this.$el;
		$('.sidebar .list #'+this.model.id).addClass('selected');
		this.$el.attr('id','bigPhoto'+this.model.id);
		this.$el.addClass('isset');
		$('.title',cnt).html(iAttr.title._content);
		$('.descr',cnt).html(iAttr.description._content);
		$('.plink',cnt).remove();
		if(iAttr.urls && iAttr.urls.url)
			for(var i=0;i<iAttr.urls.url.length;i++)
				$('.lnks',cnt).append('<li class="plink"><a href="'+iAttr.urls.url[i]._content+'">'+iAttr.urls.url[i].type+'</a></li>');

		$('.bigImg',cnt).attr('src',getFlickrSrc(iAttr, 'z'));
		  //this.$el.append( compiledTemplate );
		return this;
	}
  });
  return bigPhotoView;
});
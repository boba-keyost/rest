define([
	"jquery",
	'underscore',
	"backbone",
	"models/user",
	"views/bigPhotoView",
	"views/photolist",
	"views/userform",
], function($, _, Backbone,UserModel,bigPhotoView,photolistView,searchUserView){

var form	=	new searchUserView();
form.render();
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'user/:id': 'showUser',
      'photo/:id': 'showPhoto',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    app_router.on('route:showUser', function(id,photoId){
		if(id)
		{
			var user = new UserModel({
					'name':id
				});
			var url = getFlickrUrl('user', id);
			ajahIt(url,null,function(data){
				if(data.stat == 'ok')
				{
					if(!photoId)
						$('title').html( $('title').attr('persist') + ': photos by "'+data.user.username._content+'"' );
					form.id	=	data.user.username._content;
					form.render();
					user.id = data.user.id;
					var photoUrl	=	getFlickrUrl('photos', user.id);
					ajahIt(photoUrl,null,function(data){
						if(data.stat == 'ok')
						{
							var photoList	=	new photolistView(data.photos.photo,photoId);
							photoList.render();
							if(!$('.floatWrap>.content').hasClass('isset'))
							{
								app_router.trigger('route:showPhoto',data.photos.photo[0].id);
							}
						}
						else
							alert(data.message);
					});
				}
				else
				{
					alert(data.message);
					$('title').html( $('title').attr('persist'));
				}
			});
			//logAlert(user);
		}
    });
    app_router.on('route:showPhoto', function(id){
		//var bigPhoto = new PhotoModel({id:id});
		var url = getFlickrUrl('photoDetails', id);
		ajahIt(url,null,function(data){
			if(data.stat == 'ok')
			{
				var pInfo	=	data.photo;

				$('title').html( $('title').attr('persist') + ': photos by "'+pInfo.owner.username+'" - "'+pInfo.title._content+'"' );

				if(!$('.sidebar li').length)
				{
					app_router.trigger('route:showUser',pInfo.owner.username,id);
				}
				var bigPhoto = new bigPhotoView(pInfo);
				bigPhoto.render();
			}
			else
				alert(data.message);
		});
    });
    app_router.on('route:defaultAction', function(actions){
      // We have no matching route, lets just log what the URL was
      logAlert('No route:'+ actions);
    });
    Backbone.history.start({pushState: true});
  };
  return {
    initialize: initialize
  };
});
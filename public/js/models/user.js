define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var UserModel = Backbone.Model.extend({
    defaults: {
      id: "0",
	  name:""
    },
	initialize:function()
	{
		//logAlert(this.id);
	}
  });
  return UserModel;
});
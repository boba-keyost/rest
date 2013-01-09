define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  var searchUserView = Backbone.View.extend({
    el: $('.sidebar form'),
	initialize: function(params){
		this.id = "";
	},
	 events: {
      "submit"   : "selectUser"
    },
    render: function(){
      var data = {};
	  $('input[name=username]',this.$el).val(this.id);
      //this.$el.append( compiledTemplate );
    },
	selectUser: function(e){
		e.preventDefault();
		Backbone.history.navigate('user/'+$('input[name=username]',this.$el).val(),{'trigger':true});
	}
  });
  return searchUserView;
});
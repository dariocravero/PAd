PAd.Views.App = Backbone.View.extend({
  el: '#PAd .container',
  render: function() {
    $(this.el).html(_.jst('app'));
    //this.modules_view = 
  }
});

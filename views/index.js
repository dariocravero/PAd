PAd.Views.Index = Backbone.View.extend({
  el: '#PAd .container',
  render: function() {
    $(this.el).html(_.jst('index'));
  }
});

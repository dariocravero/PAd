PAd.Views.Shortcuts = Backbone.View.extend({
  el: '#PAd .toolbar .shortcuts',
  template: _.jst('shortcut'),
  render: function(shortcuts) {
    var s = this.parse(shortcuts);
    $(this.el).html(s);
    return this;
  },
  parse: function(shortcuts) {
    return (_(shortcuts).map(_.bind(function(s) {
      return this.template(s);
    },this))).join('');
  }
});


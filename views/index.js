PAd.Views.Index = Backbone.View.extend({
  el: '#PAd .container',
  render: function() {
    $(this.el).html(_.jst('index'));
    this.trigger('shortcuts', this.shortcuts);
    return this;
  },
  shortcuts: [
    {shortcut: 'Tab', description: 'Move to next field'},
    {shortcut: 'Return', description: 'Login'}
  ] 
});

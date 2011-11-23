PAd.Views.Index = Backbone.View.extend({
  el: '#PAd .container',
  render: function() {
    $(this.el).html(_.jst('index'));
    $('.session').popover({trigger: "manual", placement: 'above',
      offset: 10,
      html: true,
      content: function(){return _.jst('login')({});},
      template: _.jst('session_popover')({})});
    $('.session').popover('show');
  }
});

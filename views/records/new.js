PAd.Views.ModulesIndex = Backbone.View.extend({
  el: '#modules',
  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('add', this.render);
    return this;
  },
  render: function() {
    return this;
  }
});

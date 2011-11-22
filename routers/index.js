PAd.Routers.Index = Backbone.Router.extend({
  view: null,
  routes: {
    '': 'index'
  },
  initialize: function() {
    this.view = new PAd.Views.Index();
    return this;
  },
  index: function() {
    this.view.render();
    return this;
  }
});

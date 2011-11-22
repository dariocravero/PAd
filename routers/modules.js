PAd.Routers.Modules = Backbone.Router.extend({
  view: null,
  routes: {
    ':module': 'module_view',
    ':module/new': 'module_create',
    ':module/:id/edit': 'module_update'
  },
  initialize: function() {
    this.view = new PAd.Views.Modules.Index({collection: PAd.modules});
    return this;
  },
  module_view: function(module) {
    this.view.render({module: module});
    return this;
  },
  module_create: function(module) {
    this.view.render({module: module, create: true});
    return this;
  },
  module_update: function(module, id) {
    this.view.render({module: module, update: true, id: id});
    return this;
  }
});

PAd.Routers.Modules = Backbone.Router.extend({
  view: null,
  routes: {
    '': 'index',
    ':module': 'module_view',
    ':module/new': 'module_create',
    ':module/:id/edit': 'module_update'
  },
  initialize: function() {
    this.view = new PAd.Views.Modules.Index({collection: PAd.modules});
    return this;
  },
  index: function() {
    this.view.render();
    return this;
  },
  module_view: function(module) {
    this.view.list({module: module});
    return this;
  },
  module_create: function(module) {
    this.view.create({module: module});
    return this;
  },
  module_update: function(module, id) {
    this.view.update({module: module, id: id});
    return this;
  }
});

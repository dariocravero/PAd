var PAd = {
  Models: {},
  Collections: {},
  Views: {
    Modules: {},
    Records: {}
  },
  Routers: {},
  routers: {},
  init: function(data) {
    this.modules = data.modules;
    this.routers.index = new PAd.Routers.Index();
    Backbone.history.start();
  }
};

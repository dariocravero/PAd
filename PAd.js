var PAd = {
  Models: {},
  Collections: {},
  Views: {
    Modules: {},
    Records: {}
  },
  Routers: {},
  init: function(data) {
    this.modules = data.modules;
    this.router = new PAd.Routers.Modules();
    Backbone.history.start();
  }
};

var PAd = {
  Models: {},
  Collections: {},
  Views: {
    Records: {}
  },
  Routers: {},

  routers: {},
  views: {},

  init: function(data) {
    this.current_user = new PAd.Models.CurrentUser(data.current_user);
    this.modules = data.modules;
    this.views.app = new PAd.Views.App().render();
    this.routers.index = new PAd.Routers.Index({view: this.views.app});
    Backbone.history.start();
  }
};

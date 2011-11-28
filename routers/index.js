PAd.Routers.Index = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login': 'login',
    'logout': 'logout'
  },
  initialize: function(options) {
    this.view = options.view;
    return this;
  },
  index: function() {
    //this.view.render();
    return this;
  },
  login: function() {
    this.view.login();
    console.log('login');
  },
  logout: function() {
    console.log('logout');
  }
});

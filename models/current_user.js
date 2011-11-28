PAd.Models.CurrentUser = Backbone.Model.extend({
  initialize: function(attributes) {
    _.bindAll(this, 'login_success', 'login_error', 'logout_success', 'logout_error');
    this.logged_in = _.isUndefined(attributes);
    return this;
  },
  login: function(user, password) {
    if (!this.logged_in) {
      this.fetch({url: '/sessions/login',
        data: {user: user, password: password},
        success: this.login_success,
        error: this.login_error
      });
    }
    return this;
  },
  logout: function() {
    if (this.logged_in) {
      this.fetch({url: '/sessions/logout',
        success: this.logout_success,
        error: this.logout_error
      });
    }
    return this;
  },
  login_success: function(model, xhr) {
    this.logged_in = true;
    console.log('login_success', model, xhr);
    this.trigger('login:success', this);
  },
  login_error: function(model, xhr) {
    this.logged_in = false; 
    console.log('login_error', model, xhr);
    this.trigger('login:error', this);
  },
  logout_success: function(model, xhr) {
    this.logged_in = false; 
    console.log('logout_success', model, xhr);
    this.trigger('logout:success', this);
  },
  logout_error: function(model, xhr) {
    this.logged_in = true; 
    console.log('logout_error', model, xhr);
    this.trigger('logout:error', this);
  }
});

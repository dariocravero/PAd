PAd.Views.Session = Backbone.View.extend({
  el: '#PAd .toolbar .session',
  template: _.jst('session_popover')({}),
  render: function() {
    if (!PAd.current_user.logged_in) this.ask_for_login();

    PAd.current_user.bind('login:success', this.login_success);
    PAd.current_user.bind('login:error', this.login_error);
    PAd.current_user.bind('logout:success', this.logout_success);
    PAd.current_user.bind('logout:error', this.logout_error);
    
    return this;
  },
  ask_for_login: function() {
    $(this.el).popover({trigger: 'manual', placement: 'above',
      offset: 10, html: true,
      content: function(){return _.jst('login')({});},
      template: this.template
    });
    $(this.el).popover('show');
    return this;
  },
  ask_for_logout: function() {
    $(this.el).popover({trigger: 'manual', placement: 'above',
      offset: 10, html: true,
      content: function(){return _.jst('logout')({});},
      template: this.template
    });
    $(this.el).popover('show');
    return this;
  },
  login_success: function(current_user) {
                   console.log('login_success', 'toolbar');
    $(this.el).popover('hide');
  },
  login_error: function(current_user) {
                   console.log('login_error', 'toolbar');
  },
  logout_success: function(current_user) {
                   console.log('logout_success', 'toolbar');
    $(this.el).popover('hide');
  },
  logout_error: function(current_user) {
                   console.log('login_error', 'toolbar');
  }
});

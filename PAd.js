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
    new PAd.Routers.Modules();
    Backbone.history.start();
  }
};

/*
$(function() {
  var PAd = {
    el: '#PAd',
    modules: {
      selected: function() {
        return $(PAd.el + ' .module.selected');
      },
      active: function() {
        return $(PAd.el + ' .module.active');
      },
      prev: function() {
        var selected = this.selected();
        if (selected.length == 0) {
          this.list.first().addClass('selected');
        } else {
          selected.removeClass('selected').next().addClass('selected');
        }
        //_.scroll_to(this.selected());
      },
      next: function() {
        var selected = this.selected();
        if (selected.length == 0) {
          this.list.last().addClass('selected');
        } else {
          selected.removeClass('selected').prev().addClass('selected');
        }
        //_.scroll_to(this.selected());
      },
      none: function() {
        this.selected().removeClass('selected');
        this.active().removeClass('active');
      },
      activate: function() {
        this.active().removeClass('active');
        this.selected().addClass('active').removeClass('selected');
        //key.setScope('module');
      },
      keys: {
        up: function(ev, handler) { PAd.modules.next(); },
        down: function(ev, handler) { PAd.modules.prev(); },
        enter: function(ev, handler) { PAd.modules.activate(); },
        esc: function(ev, handler) { PAd.modules.none(); }
      }
    }
  };

  // Refactor into a view
  create_sample_modules(PAd);

  // Modules list shortcuts
  _.each(['up', 'down', 'enter', 'esc'], function(k) { key(k, 'modules', PAd.modules.keys[k]); });
  key.setScope('modules');

  PAd.modules.list = $(PAd.el + ' .module');
});*/

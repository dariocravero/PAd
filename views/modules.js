/**
 * Handles the interaction between modules
 */
PAd.Views.Modules = Backbone.View.extend({
  el: '#PAd .container ul.modules',
  views: {},
  modules: null,
  initialize: function() {
    _.bindAll(this, '__add', 'select_module', 'select_prev_module', 'select_next_module', 
      'open_module', 'close_module');

    _.each(PAd.modules, this.__add);

    this.modules = this.$('.module');
    var sample_module = this.modules.first();
    this.$('.content').width(sample_module.width() - sample_module.children('.sidebar').width());

    this.bindKeys();
    this.scope();

    return this;
  },
  render: function(options) {
    this.modules.removeClass('active selected');

    if (typeof options !== 'undefined') {
      if (options.hasOwnProperty('module')) {
        if (_.include(_.keys(this.views), options.module)) {
          this.views[options.module].render();
          return this;
        }
      }
    }
    this.scope();
    _.scroll_to(this.modules.first());
    return this;
  },
  __add: function(module) {
    // Attach the list view handler for that module
    this.views[module.toLowerCase()]= new PAd.Views[module].
      Index({collection: new PAd.Collections[module]()});
  },
  events: {
    'click .module:not(.active)': 'select_module',
    'dblclick .module.selected:not(.active)': 'open_module'
  },
  keys: {
    'up': 'select_prev_module',
    'down': 'select_next_module',
    'enter': 'open_module',
    'esc': 'close_module'
  },
  select_module: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    this.modules.removeClass('selected');
    $(ev.currentTarget).addClass('selected');

    this.scope();
  },
  select_prev_module: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    var selected = this.$('.selected');
    if (selected.length == 0) {
      this.modules.last().addClass('selected');
    } else {
      selected.removeClass('selected').prev().addClass('selected');
    }
  },
  select_next_module: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    var selected = this.$('.selected');
    if (selected.length == 0) {
      this.modules.first().addClass('selected');
    } else {
      selected.removeClass('selected').next().addClass('selected');
    }
  },
  open_module: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    PAd.router.navigate(this.$('.selected').attr('data-module'), true);
  },
  close_module: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    PAd.router.navigate('', true);
  }
});

_.extend(PAd.Views.Modules.prototype, Backbone.Locksmith);

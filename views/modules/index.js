/**
 * Handles the interaction between modules
 */
PAd.Views.Modules.Index = Backbone.View.extend({
  el: 'ul.modules',
  views: {},
  modules: null,
  active_module: 600,
  initialize: function() {
    _.bindAll(this, '__add', 'select_module', 'select_prev_module', 'select_next_module', 
      'select_prev_column_in_module', 'select_next_column_in_module', 'activate', 
      'activate_key', 'deactivate');

    _.each(PAd.modules, this.__add);

    this.modules = this.$('.module');
    var sample_module = this.modules.first();
    this.active_module = {
      width: sample_module.width() - sample_module.children('.sidebar').width(),
      height: $(window).height() - sample_module.height()
    };

    this.bindKeys();
    this.scope();

    return this;
  },
  __add: function(module) {
    // Attach the list view handler for that module
    this.views[module]= new PAd.Views[module].Index(
        {collection: new PAd.Collections[module]()});
    return this;
  },
  events: {
    'click .module:not(.active)': 'select_module',
    'dblclick .module.selected:not(.active)': 'activate'
  },
  keys: {
    'up': 'select_prev_module',
    'down': 'select_next_module',
    'left module': 'select_prev_column_in_module',
    'right module': 'select_next_column_in_module',
    'enter': 'activate_key',
    'esc': 'deactivate'
  },
  select_module: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    this.modules.removeClass('selected');
    $(ev.currentTarget).addClass('selected');
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
  select_prev_column_in_module: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    console.log('select_prev_column_in_module');
  },
  select_next_column_in_module: function(ev) {
    ev.nextentDefault();
    ev.stopPropagation();

    console.log('select_next_column_in_module');
  },
  activate: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    this.modules.removeClass('active selected');
    $(ev.currentTarget).addClass('active');
    this.$('.active .content').width(this.active_module.width);

    this.views[this.$('.active').attr('data-module')].render();

    // TODO key.setScope to disable these keys and enable the subview's keys.
    // Perhaps have an even being triggered and caught by the records' view?
    //this.scope('somethingelse');
  },
  activate_key: function(ev) {
                  // TODO Unify with the other method.
    ev.preventDefault();
    ev.stopPropagation();

    var selected = this.$('.selected');
    if (selected.length > 0) {
      selected.addClass('active').removeClass('selected');
    }
    this.$('.active .content').width(this.active_module.width);
    this.views[this.$('.active').attr('data-module')].render();
    // TODO key.setScope to disable these keys and enable the subview's keys.
    // Perhaps have an even being triggered and caught by the records' view?
    //this.scope('somethingelse');
  },
  deactivate: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    var active = this.$('.active');
    this.modules.removeClass('active selected');
    active.addClass('selected');
    // TODO key.setScope to enable these keys and disable the subview's keys.
    // Perhaps have an even being triggered and caught by the records' view?
    //
    this.scope();
  }
});

_.extend(PAd.Views.Modules.Index.prototype, Backbone.Locksmith);

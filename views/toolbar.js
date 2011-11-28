PAd.Views.Toolbar = Backbone.View.extend({
  el: '#PAd .toolbar',
  initialize: function() {
    this.session = (new PAd.Views.Session()).render();
    this.shortcuts = (new PAd.Views.Shortcuts()).render();

    return this;
  },
  render: function() {
            return this;
  },
  /**
   * The context changed on the main view, therefore we've to
   * set the shorcuts on the toolbar
   *
   * @param shortcuts Array e.g.:
   *  [{shortcut: 'ctrl+e', description: 'edit the current record'}]
   */
  update_shortcuts: function(shortcuts) {
    this.shortcuts.render(shortcuts);
  }
});

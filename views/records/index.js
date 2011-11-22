PAd.Views.Records.Index = Backbone.View.extend({
  //el: '#PAd .modules .module[data-module="MODULE"]',
  opened: false,
  initialize: function() {
    _.bindAll(this, '__add', 'select_text', 'autosave', 'quit', 'load_more',
      'select_prev_record', 'select_next_record', 'update_current_record',
      'create');
    this.list = this.$('table tbody');

    this.collection.fetch(
      {success: function(collection, response) {
        if (collection.length < 10) collection.dummy(Math.floor(Math.random()*1000));
      }, error: function(collection, response, error) {
        console.error("Couldn't load the data", collection, response, error);
      }
    });

    this.collection.bind('add', this.__add);

    this.$('.content').scroll(this.load_more);
    $('td.editable.error').twipsy({live: true});

    this.bindKeys();

    return this;
  },
  render: function() {
    _.scroll_to($(this.el));
    $(this.el).addClass('active');

    if (!this.opened) {
      this.collection.next_page(this.__add);
      this.opened = true;
    }

    this.scope();
    return this;
  },
  __add: function(record) {
    // Render the record 
    var template = _.jst('record', {record: record});
    if (record.isNew()) {
      this.list.prepend(template).fadeIn();
    } else {
      this.list.append(template).fadeIn();
    }
    return this;
  },
  events: {
    'click .title .action.create': 'create',
    'click table tbody td.action.update': 'update',
    'click table tbody td.action.delete': 'del',
    'blur table tbody td.editable[contenteditable="true"]': 'autosave'
  },
  keys: {
    'shift+tab,tab': 'select_text',
    'esc': 'quit',
    'up': 'select_prev_record',
    'down': 'select_next_record',
    '⌘+e,ctrl+e': 'update_current_record',
    '⌘+n,ctrl+n': 'create'
  },
  select_text: function(ev) {
    _.selectElementContents($(ev.target)[0]);
  },
  autosave: function(ev) {
    var el = $(ev.currentTarget);
    el.removeClass('error').attr('style', '');
    // TODO Remove twipsy? It locks itself there!
    var property = $(el).closest('table').find('th').eq(el[0].cellIndex-1).attr('data-property'),
      model = this.collection.getByCid(el.parent('tr').attr('data-cid')),
      new_value = el.text();
    if (model.get(property) !== new_value) {
      var data = {};
      data[property] = new_value;
      model.save(data, {
        success: function(model, response) {
          el.effect('highlight', {color: '#ebef91'}, 2000);
        },
        error: function(model, error, response) {
          el.animate({backgroundColor: '#fbbc9b'}, 2000);
          el.addClass('error').attr('data-original-title', error[property]);
        }
      });
    }
  },
  quit: function(ev) {
    this.list.find('td.editable').removeAttr('contenteditable');
    return this;
  },
  create: function(ev) {
    this.collection.add({});
    /**
     * New record:
     * 1. Create a model instance and attach it to the collection.
     * 2. Render a blank line at the top of the table. All of this should get
     * the classes .editable.new (to distinguish them from existing records).
     * 3. Wait until the user finishes entering all of the properties
     * and saves the record.
     * 3.1. Success: highlight all the fields with a green bg, change it to be
     * and 'editable' field only (DONE changes to EDIT now) and fill it in
     * with whatever came back from the backend.
     * 3.2. Error: highlight all the fields indicating what happened
     * as we do in update mode. The field remains in new mode.
     * 4. If the user tabbed at the very end, add a new one and repeat.
     * 5. If the user hit ESC they should now be in edit mode.
     * 5.1. If there're any errors ask if the user wants to continue anyway, if
     * they do delete the record.
     * 6. If the user hits ESC again they should exit edit mode and the row
     * they were editing becomes selected only.
     * 6.1. If there're any errors ask if the user wants to continue anyway, if
     * they do revert the record to a valid state.
     *
     *
     * > Keyboard shortcuts:
     * I think that the easiest way to handle this is through scopes since the same
     * key can be binded to different scopes (like create, update, etc.). That
     * will be really easy to implement.
     *
     * > Mouse:
     * This will be a bit trickier since the user can go anywhere and screw the whole
     * thing up. I reckon that a good way to do it is to show DONE instead of EDIT on
     * the row to tell we're done adding.
     */
    return this;
  },
  update: function(ev) {
    var row = $(ev.currentTarget).parent('tr');
    this.list.find('td.editable').attr('contenteditable', true);
    var f = row.children('[contenteditable="true"]').first();
    f.focus();
    _.selectElementContents(f[0]);
    //this.collection.getByCid(row.attr('data-cid'));
    return this;
  },
  update_current_record: function() {
  },
  del: function(ev) {
    var row = $(ev.currentTarget).parent('tr');

    this.collection.getByCid(row.attr('data-cid')).destroy({
      success: function(model, response) {
        row.children().effect('highlight', {color: '#ebef91'}, 2000);
        row.fadeOut(1800, function() { $(this).remove(); });
      },
      error: function(model, response, error) {
        console.error(error);
        row.children().effect('highlight', {color: '#fbbc9b'}, 2000); 
      }
    });

    return this;
  },
  load_more: function(ev) {
    if(_.isScrollBottom(this.$('.content'), this.$('table'))) {
      this.collection.next_page(this.__add);
    }
  },
  select_prev_record: function() {
    ev.preventDefault();
    ev.stopPropagation();

    var selected = this.$('.selected');
    if (selected.length == 0) {
      this.modules.last().addClass('selected');
    } else {
      selected.removeClass('selected').prev().addClass('selected');
    }
  },
  select_next_record: function() {
    ev.preventDefault();
    ev.stopPropagation();

    var selected = this.$('.selected');
    if (selected.length == 0) {
      this.modules.first().addClass('selected');
    } else {
      selected.removeClass('selected').next().addClass('selected');
    }
  }
});

_.extend(PAd.Views.Records.Index.prototype, Backbone.Locksmith);

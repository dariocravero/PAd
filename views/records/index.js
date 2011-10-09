PAd.Views.Records.Index = Backbone.View.extend({
  //el: '#PAd .modules .module[data-module="MODULE"]',
  opened: false,
  initialize: function() {
    _.bindAll(this, '__add', 'select_text', 'autosave', 'quit', 'load_more');
    this.list = this.$('table tbody');

    this.collection.fetch(
      {success: function(collection, response) {
        if (collection.length == 0) collection.dummy(Math.floor(Math.random()*1000));
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
    $(this.el).addClass('active');
    _.scroll_to($(this.el));

    if (!this.opened) {
      this.collection.next_page(this.__add);
      this.opened = true;
    }


    this.scope();
    return this;
  },
  __add: function(record) {
    // Render the record 
    this.list.append(_.jst('record', {record: record})).fadeIn();
    return this;
  },
  events: {
    'click table tbody th.action.create': 'create',
    'click table tbody td.action.update': 'update',
    'click table tbody td.action.delete': 'del',
    'blur table tbody td.editable[contenteditable="true"]': 'autosave'
  },
  keys: {
    'shift+tab,tab': 'select_text',
    'esc': 'quit'
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
  }
});

_.extend(PAd.Views.Records.Index.prototype, Backbone.Locksmith);

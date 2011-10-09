PAd.Views.Records.Index = Backbone.View.extend({
  //el: '#PAd .modules .module[data-module="MODULE"]',
  opened: false,
  initialize: function() {
    _.bindAll(this, '__add', 'select', 'save', 'quit');
    this.list = this.$('table tbody');

    this.collection.dummy(Math.floor(Math.random()*1000));

    this.collection.bind('add', this.__add);

    this.bindKeys();

    return this;
  },
  render: function() {
    if (!this.opened) {
      _.each(this.collection.first(30), this.__add);
      this.opened = true;
    }

    this.scope();
    return this;
  },
  __add: function(record) {
    // Render the record 
    this.list.append(_.jst('record', {record: record}));
    return this;
  },
  events: {
    'click table tbody th.action.create': 'create',
    'click table tbody td.action.update': 'update',
    'click table tbody td.action.delete': 'del',
    //'focus table tbody td.editable[contenteditable="true"]': 'before',
    'blur table tbody td.editable[contenteditable="true"]': 'save'
  },
  keys: {
    'shift+tab,tab': 'select',
    'esc': 'quit'
  },
  select: function(ev) {
    _.selectElementContents(ev.target);
  },
  save: function(ev) {
    var el = $(ev.currentTarget);
    var property = $(el).closest('table').find('th').eq(el.get(0).cellIndex-1).attr('data-property');
    var model = this.collection.getByCid(el.parent('tr').attr('data-cid'));
    var data = {};
    data[property] = el.text();
    model.save(data, {
      success: function(model, response) {
        el.effect('highlight', {color: 'green'}, 2000);
      },
      error: function(model, response, error) {
        console.error(error);
        el.effect('highlight', {color: 'red'}, 2000); 
      }
    });
  },
  quit: function(ev) {
    this.list.find('td.editable').removeAttr('contenteditable');
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
        row.children().effect('highlight', {color: 'green'}, 2000);
        row.fadeOut(1800, function() { $(this).remove(); });
      },
      error: function(model, response, error) {
        console.error(error);
        row.children().effect('highlight', {color: 'red'}, 2000); 
      }
    });

    return this;
  }
  // TODO Implement lazy loading 
});

_.extend(PAd.Views.Records.Index.prototype, Backbone.Locksmith);

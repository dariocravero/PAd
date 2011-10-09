PAd.Views.Records.Index = Backbone.View.extend({
  //el: '#PAd .modules .module[data-module="MODULE"]',
  opened: false,
  initialize: function() {
    _.bindAll(this, '__add');
    this.list = this.$('table tbody');

    this.collection.dummy(Math.floor(Math.random()*1000));

    this.collection.bind('add', this.__add);
    return this;
  },
  render: function() {
    if (!this.opened) {
      _.each(this.collection.first(30), this.__add);
      this.opened = true;
    }
    return this;
  },
  __add: function(record) {
    // Render the record 
    this.list.append(_.jst('record', {id: record.cid, values: record.attributes})); // TODO Replace cid for id*/
    return this;
  },
  events: {
    'click table tbody th.action.create': 'create',
    'click table tbody td.action.update': 'update',
    'click table tbody td.action.delete': 'del'
  },
  create: function(ev) {
    this.list.prepend(_.jst('record', 
          {id: (new Date()).getTime(), values: new Array(this.__properties_count())}));
    return this;
  },
  update: function(ev) {
    return this;
  },
  del: function(ev) {
    var row = $(ev.currentTarget).parent('tr');

    this.collection.getByCid(row.attr('data-id')).destroy({
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
  },
  __properties_count: function() {
    return this.collection.model.properties.length();
  }
  // TODO Implement lazy loading 
});

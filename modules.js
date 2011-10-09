function sample_modules() {
  var list = [
    {name: {model: 'User', collection: 'Users'}, properties: [{name: 'id', editable: false}, {name: 'name', editable: true}, 
      {name: 'surname', editable: true}, {name: 'email', editable: true}, {name: 'created_at', editable: false}, 
      {name: 'updated_at', editable: false}]},
    {name: {model: 'Image', collection: 'Images'}, properties: [{name: 'id', editable: false}, {name: 'name', editable: true}, 
      {name: 'file_type', editable: true}, {name: 'path', editable: true}, 
      {name: 'created_at', editable: false}, {name: 'updated_at', editable: false}]},
    {name: {model: 'Category', collection: 'Categories'}, properties: [{name: 'id', editable: false}, 
      {name: 'name', editable: true}, {name: 'created_at', editable: false}, {name: 'updated_at', editable: false}]},
    {name: {model: 'News', collection: 'News'}, properties: [{name: 'id', editable: false}, {name: 'title', editable: true}, 
      {name: 'content', editable: true}, {name: 'user_id', editable: true}, {name: 'created_at', editable: false}, 
      {name: 'updated_at', editable: false}]},
    {name: {model: 'Podcast', collection: 'Podcasts'}, properties: [{name: 'id', editable: false}, {name: 'title', editable: true}, 
      {name: 'description', editable: true}, {name: 'url', editable: true}, {name: 'user_id', editable: true}, 
      {name: 'created_at', editable: false}, {name: 'updated_at', editable: false}]},
    {name: {model: 'Event', collection: 'Events'}, properties: [{name: 'id', editable: false}, {name: 'title', editable: true}, 
      {name: 'starts', editable: true}, {name: 'ends', editable: true}, {name: 'venue', editable: true}, 
      {name: 'description', editable: true}, {name: 'created_at', editable: false}, {name: 'updated_at', editable: false}]},
    {name: {model: 'Sport', collection: 'Sports'}, properties: [{name: 'id', editable: false}, {name: 'name', editable: true}, 
      {name: 'description', editable: true}, {name: 'created_at', editable: false}, {name: 'updated_at', editable: false}]},
    {name: {model: 'House', collection: 'Houses'}, properties: [{name: 'id', editable: false}, {name: 'rooms', editable: true}, 
      {name: 'floors', editable: true}, {name: 'doors', editable: true}, {name: 'tables', editable: true}, {name: 'bathrooms', editable: true}, 
      {name: 'people_living_in', editable: true}, {name: 'address', editable: true}, {name: 'neighborhood_id', editable: true}, 
      {name: 'created_at', editable: false}, {name: 'updated_at', editable: false}]},
    {name: {model: 'Neighborhood', collection: 'Neighborhoods'}, properties: [{name: 'id', editable: false}, {name: 'name', editable: true}, 
      {name: 'description', editable: true}, {name: 'city_id', editable: true}, {name: 'created_at', editable: false}, 
      {name: 'updated_at', editable: false}]},
    {name: {model: 'City', collection: 'Cities'}, properties: [{name: 'id', editable: false}, {name: 'name', editable: true}, 
      {name: 'province_id', editable: true}, {name: 'created_at', editable: false}, {name: 'updated_at', editable: false}]},
    {name: {model: 'Province', collection: 'Provincies'}, properties: [{name: 'id', editable: false}, {name: 'name', editable: true}, 
      {name: 'country_id', editable: true}, {name: 'created_at', editable: false}, {name: 'updated_at', editable: false}]},
    {name: {model: 'Country', collection: 'Countries'}, properties: [{name: 'id', editable: false}, {name: 'name', editable: true}, 
      {name: 'created_at', editable: false}, {name: 'updated_at', editable: false}]}
  ];

  _.each(list, function(module) {
    PAd.Models[module.name.model] = Backbone.Model.extend({
      data: function() {
        return _.map(this.collection.model.properties, $.proxy(function(property) {
          return {name: property.name, value: this.get(property.name), editable: property.editable};
        }, this));
      }
    }, {properties: module.properties});
    PAd.Collections[module.name.collection] = Backbone.Collection.extend({
      model: PAd.Models[module.name.model],
      //url: '/' + module.name.collection.toLowerCase(),
      localStorage: new Store(module.name.collection),
      dummy: function(n) {
        var add = [], properties = _.pluck(this.model.properties, 'name');
        _.each(_.range(1, n), function(i) {
          var o = {};
          _.each(properties, function(p) { o[p] = p + ' ' + i; });
          add.push(o);
        });
        this.add(add);
        this.last().save();
      }
    });
    PAd.Views[module.name.collection] = {Index: PAd.Views.Records.Index.extend({
      el: '#PAd .modules .module[data-module="' + module.name.collection + '"]'
    })};
    // Render the module
    $('#PAd .modules').append(_.jst('module', 
          { module: module.name.collection,
            properties: _.pluck(module.properties, 'name')}));

  });

  return _.map(list, function(e) { return e.name.collection; });
}

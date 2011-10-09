function sample_modules() {
  var list = [
    {name: {model: 'User', collection: 'Users'}, properties: ['id', 'name', 'surname', 'email', 'created_at', 'updated_at']},
    {name: {model: 'Image', collection: 'Images'}, properties: ['id', 'name', 'file_type', 'path', 'created_at', 'updated_at']},
    {name: {model: 'Category', collection: 'Categories'}, properties: ['id', 'name', 'created_at', 'updated_at']},
    {name: {model: 'News', collection: 'News'}, properties: ['id', 'title', 'content', 'user_id', 'created_at', 'updated_at']},
    {name: {model: 'Podcast', collection: 'Podcasts'}, properties: ['id', 'title', 'description', 'url', 'user_id', 'created_at', 'updated_at']},
    {name: {model: 'Event', collection: 'Events'}, properties: ['id', 'title', 'starts', 'ends', 'venue', 'description', 'created_at', 'updated_at']},
    {name: {model: 'Sport', collection: 'Sports'}, properties: ['id', 'name', 'description', 'created_at', 'updated_at']},
    {name: {model: 'House', collection: 'Houses'}, properties: ['id', 'rooms', 'floors', 'doors', 'tables', 'bathrooms', 'people_living_in', 'address', 'neighborhood_id', 'created_at', 'updated_at']},
    {name: {model: 'Neighborhood', collection: 'Neighborhoods'}, properties: ['id', 'name', 'description', 'city_id', 'created_at', 'updated_at']},
    {name: {model: 'City', collection: 'Cities'}, properties: ['id', 'name', 'province_id', 'created_at', 'updated_at']},
    {name: {model: 'Province', collection: 'Provincies'}, properties: ['id', 'name', 'country_id', 'created_at', 'updated_at']},
    {name: {model: 'Country', collection: 'Countries'}, properties: ['id', 'name', 'created_at', 'updated_at']}
  ];

  _.each(list, function(module) {
    PAd.Models[module.name.model] = Backbone.Model.extend({}, {properties: module.properties});
    PAd.Collections[module.name.collection] = Backbone.Collection.extend({
      model: PAd.Models[module.name.model],
      //url: '/' + module.name.collection.toLowerCase(),
      localStorage: new Store(module.name.collection),
      dummy: function(n) {
        var add = [], properties = this.model.properties;
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
            properties: module.properties}));

  });

  return _.map(list, function(e) { return e.name.collection; });
}

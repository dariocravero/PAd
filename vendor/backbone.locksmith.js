// backbone.locksmith.js 0.1
// (c) 2011 Darío Javier Cravero
// backbone.locksmith.js may be freely distributed under the MIT license.

;(function() {
  /**
   * Binds keymaster's key shortcuts to any (Backbone) object.
   * 
   * @params obj Object
   * E.g.:
   * 
   * function c() { console.log('c'); }
   *
   * obj = {
   *   keys: {
   *    'a': 'a_fn',
   *    'b scope': function() { console.log('b'); },
   *    'c': c
   *   },
   *   a_fn: function() { console.log('a'); },
   *   cid: 'elementX' // scope
   * }
   *
   * A key can also be activated in a particular scope inside the general scope.
   * I.e., in the example b will only be triggered if the scope 'elementX.scope'
   * is set, the rest of them will be triggered when 'elementX' is set.
   *
   * Use this in with Backbone Views/Models/Routers/Collections/Whatever you like :)
   */
  function bindKeys(obj) {
    if (typeof obj === 'undefined') obj = this;

    _.each(obj.keys, function(fn, selector) {
      var match = selector.match(/^(\S+)\s*(.*)$/);
      var k = match[1], scope = obj.cid + match[2];

      switch (typeof fn) {
        case 'string':
          key(k, scope, obj[fn]);
          break;
        case 'function':
          key(k, scope, fn);
          break;
        default:
          break;
      }
    });
  }

  function scope(scope) {
    if (typeof scope !== 'string') scope = '';
    scope = this.cid + scope;
    key.setScope(scope);
    this.trigger('scope:changed', {scope: scope}); 
    return this;
  }

  Backbone.Locksmith = {
    bindKeys: bindKeys,
    scope: scope
  };
})(this);

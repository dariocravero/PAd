_.mixin({
  jst: function(template, params) {
    return _.template($('#template_' + template).text(), params);
  },
  /**
   * Scroll the window to a particular element if needed.
   * @params el jQuery selector
   * @param options Object
   *  {
   *    margin: integer, // pixels to position the user above the element. default: 20
   *    speed: integer // how fast the animation goes. default: 2000
   *  } 
   */
  scroll_to: function (el, options) {
    if (typeof options === 'undefined') options = {}; 
    _.defaults(options, {margin: 20, speed: 1000});

    var current_top = $(document).scrollTop(), window_height = $(window).height();
    var scroll_to = $(el).offset().top - options.margin;

    $('body, html').animate({scrollTop: scroll_to}, options.speed, 'easeInQuad');
    return el;
  },
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  },
  replace_and_capitalize: function(string, separator, space) {
    if (typeof separator === 'undefined') separator = '-';
    if (typeof space === 'undefined') space = false;
    return _.map(string.split(separator), function(s,i) { return _.capitalize(s); }).join(space ? ' ' : '');
  },
  /**
   * Returns a random integer with a limit
   * @limit Integer defaults to 1000
   */
  rand: function(limit) {
    if (typeof limit !== 'number') limit = 1000;
    return Math.ceil(Math.random()*limit);
  },
  // http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element/6150060#6150060
  selectElementContents: function(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  },
  isScrollBottom: function(el, inner_el) { 
    var elementHeight = $(inner_el).height(); 
    var scrollPosition = $(el).height() + $(el).scrollTop(); 
    return (elementHeight == scrollPosition); 
  }
});

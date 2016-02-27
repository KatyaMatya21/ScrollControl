(function(){

  /**
   * Keys to intercept:
   * left: 37, up: 38, right: 39, down: 40,
   * spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
   */
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  /**
   * Constructor ScrollControl
   * @constructor
   */
  var ScrollControl = function ScrollControl() {};

  /**
   * Disables user scroll
   */
  ScrollControl.prototype.scrollDisable = function() {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', this._preventDefault, false);
    }
    window.onwheel = this._preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this._preventDefault; // older browsers, IE
    window.ontouchmove  = this._preventDefault; // mobile
    document.onkeydown  = this._preventDefaultForScrollKeys;
  };

  /**
   * Enables user scroll
   */
  ScrollControl.prototype.scrollEnable = function() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', this._preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  };

  /**
   * Cancel all user events
   * @private
   */
  ScrollControl.prototype._preventDefault = function(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  };

  /**
   * Cancel all user key events
   * @returns {boolean}
   * @private
   */
  ScrollControl.prototype._preventDefaultForScrollKeys = function(e) {
    if (keys[e.keyCode]) {
      this._preventDefault(e);
      return false;
    }
  };

  window.ScrollControl = ScrollControl;

})();

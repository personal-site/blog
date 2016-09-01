/**
 * Represents an HTTP request.
 * @constructor
 * @param {string} path - The path of the data endpoint.
 */
function HttpSocket(path) {
  /**
   * @type {string}
   * @property {string} path The path of the HTTP endpoint to fetch.
   */
  this.path = path;
}
HttpSocket.prototype = {
  /**
   * Data object container.
   * @type {Object}
   */
  data: {},

  /**
   * Wrapper around {jQuery#ajax}.
   * @param  {function} cb - Callback function, on completion.
   * @return {boolean}
   */
  get: function(cb) {
    $.ajax({
      'url': this.path,
      'success': function(data) {
        this.data = data;
      }
    }).done(cb);
  }
}

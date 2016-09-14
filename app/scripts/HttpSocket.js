/**
 * Represents an HTTP request.
 * @constructor
 * @this {HttpSocket}
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
   * Data container.
   * @type {object}
   */
  data: {},

  /**
   * Data path.
   * @type {string}
   */
  path: '',

  /**
   * Wrapper around {jQuery#ajax}.
   * @param  {function} success Success callback function.
   * @param  {function} failure Failure callback function.
   * @return {boolean}
   */
  get: function(success, failure) {
    $.ajax({
      'url': this.path,
      'success': function(data) {
        this.data = data;
      }
    }).done(success).fail(failure);
  }
}

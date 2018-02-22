/**
 * Represents an HTTP request.
 * @constructor
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
   * @param  {function} onSuccess Success callback function.
   * @param  {function} onFailure Failure callback function.
   * @return {boolean}
   */
  get(onSuccess, onFailure) {
    $.ajax({
      url: this.path,
      success: function(data) {
        this.data = data;
      }
    })
    .done(onSuccess)
    .fail(onFailure);
  }
}

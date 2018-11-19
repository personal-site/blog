/**
 * Represents an HTTP request.
 * @constructor
 * @param {string} path The path to query.
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
   */
  get(onSuccess, onFailure) {
    function handleSuccess(data) {
      this.data = data;
    }

    $.ajax({
      url: this.path,
      success: handleSuccess
    }).done(onSuccess).fail(onFailure);
  }
};

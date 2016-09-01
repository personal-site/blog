function HttpSocket(path) {
  this.path = path;
}

HttpSocket.prototype = {
  data: {},
  get: function(cb) {
    $.ajax({
      'url': this.path,
      'success': function(data) {
        this.data = data;
      }
    }).done(cb);
  }
}

(function(root) {

  var PhotoApp = root.PhotoApp = (root.PhotoApp || {});

  var PhotoListView = PhotoApp.PhotoListView = function() {
    this.$el = $("<div></div>");
  };

  _.extend(PhotoListView.prototype, {
    render: function() {
      var that = this.$el;
      this.$el.empty();
      this.$el.append($("<ul id='photo_list'></ul>"))
      PhotoApp.Photo.all.forEach( function (photo) {
        that.append("<li>" + photo.get("title") + "</li>");
      });
      return this;
    }
  });

})(this);
(function(root) {

  var PhotoApp = root.PhotoApp = (root.PhotoApp || {});

  var PhotoListView = PhotoApp.PhotoListView = function() {
    this.$el = $("<div></div>");
    PhotoApp.Photo.on('addPhoto', this.render.bind(this));
  };

  _.extend(PhotoListView.prototype, {
    render: function() {
      var that = this.$el;
      this.$el.empty();
      this.$el.append($("<ul id='photo_list'></ul>"))
      this.$el.on('click', '.link', function(event) {
        event.preventDefault();
        console.log($(event.currentTarget).data('id'))
      })
      PhotoApp.Photo.all.forEach( function (photo) {
        that.append("<a class='link' data-id=" + photo.get('id') + " href=#><li>" + photo.get("title") + "</li></a>");
      });
      return this;
    }
  });

})(this);
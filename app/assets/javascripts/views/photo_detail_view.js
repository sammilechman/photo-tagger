(function(root) {

  var PhotoApp = root.PhotoApp = (root.PhotoApp || {});

  var PhotoDetailView = PhotoApp.PhotoDetailView = function(photo) {
    this.$el = $("<div></div>");
    this.photo = photo;
  };

  _.extend(PhotoDetailView.prototype, {
      render: function() {
        this.$el.append(JST["photo_detail"]);
        //this.$el.submit('#photo_form', this.handlePhotoCreate.bind(this))
        return this;
      },

      // handlePhotoCreate: function (event) {
   //      event.preventDefault();
   //      var $form = $(event.target);
   //      var photoData = $form.serializeJSON();
   //      var newPhoto = new PhotoApp.Photo(photoData['photo']);
   //      $form.find('input').val('');
   //      newPhoto.create();
   //    }
    })



})(this);
(function(root) {

  var PhotoApp = root.PhotoApp = (root.PhotoApp || {});

  var PhotoFormView = PhotoApp.PhotoFormView = function() {
    this.$el = $("<div></div>");
  };

  _.extend(PhotoFormView.prototype, {
      render: function() {
        this.$el.append(JST["photo_form"]);
        this.$el.submit('#photo_form', this.handlePhotoCreate.bind(this))
        return this;
      },

      handlePhotoCreate: function (event) {
        event.preventDefault();
        var $form = $(event.target);
        var photoData = $form.serializeJSON();
        var newPhoto = new PhotoApp.Photo(photoData['photo']);
        $form.find('input').val('');
        newPhoto.create();
      }
    })



})(this);
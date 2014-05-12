// This is a manifest file that'll be compiled into application.js,
// which will include all the files listed below.
//
// Any JavaScript/Coffee file within this directory,
// lib/assets/javascripts, vendor/assets/javascripts, or
// vendor/assets/javascripts of plugins, if any, can be referenced
// here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll
// appear at the bottom of the the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE
// PROCESSED, ANY BLANK LINE SHOULD GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.serializeJSON
//= require underscore
//
//= require_tree ./models
//= require_tree ./views
//= require_tree ../templates
//
//= require_tree .

(function(root) {
  var PhotoApp = root.PhotoApp = (root.PhotoApp || {});
  var Photo = PhotoApp.Photo = function(attrs) {
    this.attributes = attrs || {};
  };

  _.extend(Photo.prototype, {

    get: function (key) {
      return this.attributes[key];
    },
    set: function (key, value) {
      this.attributes[key] = value;
    },
    create: function(callback) {
      var that = this;
      $.ajax({
        method: 'POST',
        url: 'api/photos.json',
        data: {
          photo: this.attributes
        },
        success: function (response) {
          //invoke callback here
          console.log("It created!");
          _.extend(that.attributes, response);
        }
      });
    },
    save: function(callback) {
      var that = this;
      if (typeof this.get("id") == "undefined") {
        //Create
        this.create(callback);
      } else {
        //Update
        $.ajax({
          method: 'PATCH',
          url: 'api/photos/' + this.get("id") + ".json",
          data: {
            photo: this.attributes
          },
          success: function (response) {
            //invoke callback here
            console.log("It updated!");
            _.extend(that.attributes, response);
          }
        });
      }
    }
  });

  _.extend(Photo, {
    fetchByUserId: function(userId, callback){
      $.ajax({
        method: 'GET',
        url: 'api/users/' + userId + '/photos',
        success: function (response) {
          console.log("It did a GET from Index!");
          Photo.all = [];
          response.forEach(function (photoObject) {
            var newPhoto = new PhotoApp.Photo(photoObject);
            Photo.all.push(newPhoto);
          })
          callback();
        }
      });
    },
  });

  PhotoApp.initialize = function() {
    Photo.fetchByUserId(CURRENT_USER_ID, function() {
      var list = new PhotoApp.PhotoListView();
      var renderedList = list.render();
      console.log("YOOOOOO");
      var $contents = $('#content')
      console.log($contents);
      $contents.append(renderedList.$el);
    });

  };

})(this);

var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');

var $ = require('jquery');
var Backbone = require('backbone');
var handlebars = require('handlebars');

var ContactModel = Backbone.Model.extend({

});

var ContactCollection = Backbone.Collection.extend({
  model: ContactModel,
   }
);

var ContactListItemView = Backbone.View.extend({

  tagName: "li",

  className: "contact-list-items",

  events: {
    // "click .contact-list-items": "open",
    // "click .contact-list-items.edit": "openEditDialog",
    // "click .contact-list-items.delete": "destroy"
  },

  initialize: function() {

  },

  render: function() {

  }

});

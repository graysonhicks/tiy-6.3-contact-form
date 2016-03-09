var $ = require('jquery');
var Backbone = require('backbone');
var handlebars = require('handlebars');

//==============================================================================
//                        Templates
//==============================================================================
var formTem = require('../templates/formtemplate.handlebars');
var contactsTem = require('../templates/contactlist.handlebars');

//==============================================================================
//                        Models
//==============================================================================

var ContactModel = Backbone.Model.extend({

});

var ContactCollection = Backbone.Collection.extend({
  model: ContactModel,
   }
);

//==============================================================================
//                        Views
//==============================================================================

var ContactListItemView = Backbone.View.extend({
  tagName: "li",
  className: "contact-list-items",
  events: {
    // "click .contact-list-items": "open",
    // "click .contact-list-items.edit": "openEditDialog",
    // "click .contact-list-items.delete": "destroy"
  },
  initialize: function() {
    $('.contact-form').html(formTem({}));
  },
  render: function() {

  }
});

var contactFormView = Backbone.View.extend({
  tagName: "form",
  className: "contact-form",
  events: {
  },
  initialize: function() {
    this.$el.html(formTem({}));
  },
  render: function() {

  }
});

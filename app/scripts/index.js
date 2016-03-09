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
    // $('.contact-form').html(formTem({}));
  },
  render: function() {

  }
});

var ContactFormView = Backbone.View.extend({
  tagName: "form",
  className: "contact-form form-horizontal",
  events: {
    "submit .contact-form": "formSubmission"
  },
  initialize: function() {
    $('.contact-form-container').html(this.$el.html(formTem({})));

  },
  render: function() {
    $('.contact-form-container').html(this.$el.html(formTem({})));
  },
  formSubmission: function(event){
    event.preventDefault();
    var contactData = $(this).serializeArray();
    console.log(contactData);
  }
});

var formView = new ContactFormView();

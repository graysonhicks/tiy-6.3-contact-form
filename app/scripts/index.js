var $ = require('jquery');
var Backbone = require('backbone');
var handlebars = require('handlebars');
var dummyinfo = [
  { "first-name": "Dale", "last-name": "Fenton", "email":"test@test.com", "phone": "867-5309", "twitter": "@soso", "linked-in":"hire me" },
  { "first-name": "Grayson", "last-name": "Hicks", "email":"test@test.com", "phone": "867-5309", "twitter": "@soso", "linked-in":"hire me"}
];

//==============================================================================
//                        Templates
//==============================================================================
var formTem = require('../templates/formtemplate.handlebars');
var contactsTem = require('../templates/contactlist.handlebars');

//==============================================================================
//                        Models
//==============================================================================



var ContactModel = Backbone.Model.extend({
  initialize: function(){
    // this.name = (config.name || '' );
  }
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
    this.render();
  },
  render: function() {
    $('.contact-list').html( contactsTem( this.collection.toJSON() ) );
  }
});

var ContactFormView = Backbone.View.extend({
  tagName: "form",
  className: "contact-form form-horizontal",
  events: {
    "submit .contact-form": "formSubmission"
  },
  initialize: function() {
    this.render();
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
var contacts = new ContactCollection( dummyinfo );
var contactView = new ContactListItemView( { collection: contacts });

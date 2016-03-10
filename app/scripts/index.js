var $ = require('jquery');
var _ = require('underscore');
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
var contactTem = require('../templates/contact.handlebars');
//==============================================================================
//                        Models
//==============================================================================

var ContactModel = Backbone.Model.extend({
  idAttribute: '_id'
});


var ContactCollection = Backbone.Collection.extend({
  model: ContactModel,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/pizzaContacts'
});

// ==============================================================================
//                        Views
// ==============================================================================

var ContactListItemView = Backbone.View.extend({
  tagName: "div",
  className: "table table-striped table-hover contact-table",
  template: contactsTem,
  events: {
    "add this.collection": "render",
    "destroy this.collection": "render"
  },
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render );
    this.render();
  },
  render: function() {
    $('.contact-table-container').html(this.$el.html( this.template( {} ) ) );
    this.collection.each(function(contact){
      var contactView = new ContactView({ model: contact });
      this.$el.find('.list-holder').append( contactView.render().el );
    }, this );
    return this;
  }
});

var ContactView = Backbone.View.extend({
  tagName: "div",
  className: "contact-holder",
  template: contactTem,
  events: {
    "click .delete-contact": "delete-contact",
    "click .edit-contact": "edit-contact",
    "click .cancel-edit": "close-edit",
    "click .submit-contact-edit": "submit-edit",
    "submit": "do-edit-contact"
  },
  "close-edit": function(event){
    event.preventDefault();
    this.render();
  },
  "do-edit-contact": function(event){
    event.preventDefault();
    var contactData = $(event.target).serializeArray();
    var update = {};
    $.each(contactData, function(index, prop){
      update[ prop.name ] = prop.value;
    });
    this.model.save( update );
    this.render();
  },
  "submit-edit": function(event){
    this.$el.find(".contact-edit").trigger('submit');
  },
  "delete-contact": function(){
    this.model.destroy();
    this.remove();
  },
  "edit-contact": function(){
    var atts = _.clone(this.model.attributes);
    delete atts._id;
    atts.edit = 'true';
    this.$el.html( this.template( atts ));
  },
  render: function( ){
    var atts = _.clone(this.model.attributes);
    delete atts._id;
    atts.filler = 'true';
    this.$el.html( this.template( atts ) );
    return this;
  }
});

var ContactFormView = Backbone.View.extend({
  tagName: "form",
  className: "contact-form form-horizontal",
  events: {
    "submit": "formSubmission"
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    $('.contact-form-container').html(this.$el.html(formTem({})));
  },
  formSubmission: function(event){
    event.preventDefault();
    var contactData = this.$el.serializeArray().reduce(function(acum, i) {
      acum[i.name] = i.value;
      return acum;
    }, {});
    this.collection.create(contactData);
    this.render();
  }
});

//==============================================================================
//                       Execution
//==============================================================================

var contacts = new ContactCollection();
contacts.fetch().done(function(){
  var formView = new ContactFormView( { collection: contacts });
  var contactView = new ContactListItemView( { collection: contacts });
});

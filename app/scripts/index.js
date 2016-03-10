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
var contactTem = require('../templates/contact.handlebars');
//==============================================================================
//                        Models
//==============================================================================

var ContactModel = Backbone.Model.extend({

});


var ContactCollection = Backbone.Collection.extend({
  model: ContactModel,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/pizzaContacts'
});
//
// var ContactView = Backbone.View.extend({
//   el: ".contact-table-container",
//
//   events: {
//     "click this.el": "delete"
//   },
//
//   render: function(){
//     console.log(this.collection);
//     $(this.el).html( contactsTem( this.collection.toJSON() ) );
//   },
//
//   delete: function(e){
//     e.preventDefault();
//     console.log(this);
//   }
//
// });
// var collection = new ContactCollection();
// collection.fetch().done(function(){
//   console.log(collection);
//   var view = new ContactView( { collection: collection });
//   view.render();
// });


// ==============================================================================
//                        Views
// ==============================================================================

var ContactListItemView = Backbone.View.extend({
  el: '.contact-table-container',
  tagName: "table",
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
    console.log(this.template({}));
    $('.contact-table-container').html(this.$el.html( this.template( {} ) ) );
    this.collection.each(function(contact){
      console.log(contact);
      var contactView = new ContactView({ model: contact });
      this.$el.find('tbody').append( contactView.render().el );
    }, this );
    return this;
    // $('.contact-table-container').html( this.template( this.collection.toJSON() ) );
    // this.listenTo(this.collection, 'add', this.render);
    // this.listenTo(this.el, 'click', this.clear );
    // this.listenTo(this.model, 'destroy', this.remove);

  }
});

var ContactView = Backbone.View.extend({
  tagName: "tr",
  template: contactTem,
  events: {
    "click .delete-contact": "delete-contact"
  },
  "delete-contact": function(){
    this.model.destroy();
    this.remove();
  },
  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );
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
    console.log(contactData);
    this.collection.create(contactData);
    this.render();
    console.log(this.collection);
  }
});

//==============================================================================
//                       Execution
//==============================================================================

var contacts = new ContactCollection();
contacts.fetch().done(function(){
  var formView = new ContactFormView( { collection: contacts });
  var contactView = new ContactListItemView( { collection: contacts });

  console.log(contactView.$el);
});

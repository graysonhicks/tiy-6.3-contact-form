var $ = require('jquery');
var Backbone = require('backbone');
var handlebars = require('handlebars');

var ContactModel = Backbone.Model.extend({

});

var ContactCollection = Backbone.Collection.extend({
  model: ContactModel,
   }
);

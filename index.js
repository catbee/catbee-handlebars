var Handlebars = require('./lib/vendors/handlebars');
var TemplateProvider = require('./lib/TemplateProvider');

module.exports = {
  register: function (locator, config) {
    config = config || {};
    locator.registerInstance('handlebars', Handlebars);
    locator.register('templateProvider', TemplateProvider, config, true);
  },
  Handlebars: Handlebars,
  TemplateProvider: TemplateProvider
};
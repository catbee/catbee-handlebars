/**
 * Creates new instance of Handlebars template provider.
 * @param {Handlebars} $handlebars Handlebars factory.
 * @constructor
 */
class TemplateProvider {
  constructor ($handlebars) {
    this._handlebars = $handlebars;
    this._templates = Object.create(null);
  }

  /**
   * Current Handlebars factory.
   * @type {Handlebars}
   * @private
   */
  _handlebars = null;

  /**
   * Current set of registered templates.
   * @type {Object}
   * @private
   */
  _templates = null;

  /**
   * Registers compiled (precompiled) Handlebars template.
   * http://handlebarsjs.com/reference.html
   * @param {string} name Template name.
   * @param {string} compiled Compiled template source.
   */
  registerCompiled (name, compiled) {
    var specs = new Function('return ' + compiled + ';');
    this._templates[name] = this._handlebars.template(specs());
  }

  /**
   * Renders template with specified data.
   * @param {string} name Name of template.
   * @param {Object} data Data context for template.
   * @returns {Promise<string>} Promise for rendered HTML.
   */
  render (name, data) {
    if (!(name in this._templates)) {
      return Promise.reject(new Error('No such template'));
    }
  
    var promise;
    try {
      promise = Promise.resolve(this._templates[name](data));
    } catch (e) {
      promise = Promise.reject(e);
    }
    return promise;
  }
}

module.exports = TemplateProvider;


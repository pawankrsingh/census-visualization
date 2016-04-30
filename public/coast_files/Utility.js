/**
 * IMA Utility Class
 * @class Utility
 * @constructor
 *
 * @property {Array} classes Array to hold style classes
 *
 */
IMA.Component.Utility = function() {};

IMA.Component.Utility.Styles = function() {
	this.classes = [];
	this.classes['root'] = (new IMA.Component.Styles).classes['root'] + '-Utility';
};
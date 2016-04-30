/**
 * @description IMA Component Class
 * @class Component
 * @constructor
 * 
 * @property {Array} events Array to keep track of event listeners
 */
IMA.Component = function() {
	this.events = [];
};

/**
 * IMA Component Styles Class
 * @class Component Styles
 * @constructor
 * @public {Array} classes Array to hold style classes
 */
IMA.Component.Styles = function() {
	this.classes = [];
	this.classes['root'] = 'IMA-Components';
};


// Derrived From: http://www.nonobtrusive.com/2009/07/24/custom-events-in-javascript-by-making-your-own-dispatcher-class/
IMA.Component.prototype.addEventListener = function(event,callback,caller) {
	this.events[event] = this.events[event] || [];
	if ( this.events[event] ) {
		this.events[event].push([callback,caller]);
	}
}
IMA.Component.prototype.removeEventListener = function(event,callback) {
	if ( this.events[event] ) {
		var listeners = this.events[event];
		for ( var i = listeners.length-1; i>=0; --i ){
			if ( listeners[i][0] === callback ) {
				listeners.splice( i, 1 );
				return true;
			}
		}
	}
	return false;
}
IMA.Component.prototype.dispatch = function(event, object) {
	if ( this.events[event] ) {
		var listeners = this.events[event], len = listeners.length;
		while ( len-- ) {
			listeners[len][0](object,listeners[len][1]);	//callback with self
		}		
	}
}
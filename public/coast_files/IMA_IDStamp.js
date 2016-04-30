/**
 * @description Index stamp object to control all objects
 * @class IDStamp
 * @constructor
 */
IMA.IDStamp = function() {
	this.currentStamp = 0;	
	this.allObjects = [];
};

/**
 *
 * @description Assigns or obtains the stamp for the object passed in
 *
 * @param objectToStamp Object to obtain (if not indexed) or retrieve (if indexed) stamp for
 * 
 * @returns {Int} Stamp of object
 */
IMA.IDStamp.prototype.getIDStamp = function( objectToStamp ) {
	var found = false;
	for( obj in this.allObjects) {
		if( this.allObjects[obj] == objectToStamp ) {
			found = true;
			return obj;	
		}
	}
	
	if( !found ) {
		this.allObjects[this.currentStamp] = objectToStamp;
		this.currentStamp++;
		return (this.currentStamp -1);
	}
};

/**
 *
 * @description Assigns an ID stamp to the object passed to it **DO NOT USE UNLESS YOU KNOW TIS OBJECT HAS NOT BEEN STAMPED BEFORE!
 *
 * @param objectToStamp Object to obtain stamp for
 * 
 * @returns {Int} Stamp of object
 */
IMA.IDStamp.prototype.assignIDStamp = function( objectToStamp ) {
	this.allObjects[this.currentStamp] = objectToStamp;
	this.currentStamp++;
	return (this.currentStamp -1);
};

/**
 *
 * @description Retrieves the object with the corresponding stamp passed to the function
 *
 * @param stamp Stamp for the object to return
 *
 * @returns {Object} Object with stamp
 *
 */
IMA.IDStamp.prototype.getObject = function(stamp) {
	return this.allObjects[stamp];	
};

var IMAMasterStamper = new IMA.IDStamp();
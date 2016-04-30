// From: http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
/**
 *
 * @description Obtains the X coord of the event based on the entire document
 *
 * @param {Event} e Event Object
 * 
 */
function getEventX(e) {
	var x;
	if (e.pageX) { 
 		x = e.pageX;
	} else { 
  		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	}
	//if( e.originalEvent ) {
	//	x = e.originalEvent.pageX;
	//}
	
	return x;
}

/**
 *
 * @description Obtains the Y coord of the event based on the entire document
 *
 * @param {Event} e Event Object
 * 
 */
function getEventY(e) {
	var y;
	if (e.pageY) { 
  		y = e.pageY;
	} else { 
  		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	}
	//if( e.originalEvent ) {
//		y = e.originalEvent.pageY;
//	}
	
	return y;
}

// From: http://www.golimojo.com/etc/js-subclass.html
/**
 *
 * @description Subclass'ing utility function for OOP Javascript
 *
 * @param {Class} constructor subclass
 * @param {Class} superConstructor superclass 
 * 
 */
function subclass(constructor, superConstructor)
{
	function surrogateConstructor()
	{
	}

	surrogateConstructor.prototype = superConstructor.prototype;

	var prototypeObject = new surrogateConstructor();
	prototypeObject.constructor = constructor;

	constructor.prototype = prototypeObject;
}

// From: http://peter.michaux.ca/articles/class-based-inheritance-in-javascript
/**
 *
 * @description Subclass'ing utility function for OOP Javascript
 *
 * @param {Class} subclass subclass
 * @param {Class} superclass superclass 
 * 
 */
function extend(subclass, superclass) {
	function Dummy(){}
	Dummy.prototype = superclass.prototype;
	subclass.prototype = new Dummy();
	subclass.prototype.constructor = subclass;
	subclass.superclass = superclass;
	subclass.superproto = superclass.prototype;
}

/**
 *
 * @description Sorting function for objects with a 'z' property
 *
 * @param {Object} a Object a
 * @param {Object} b Object b
 *
 * @returns {Int} positive or negative
 * 
 */
function zSort(a,b){ 
	return a.z - b.z
}

/**
 *
 * @description Accepts a position or style string and returns a number (strips off the 'px')
 *
 * @param {String} styleString Input string from an element's style such as: '100px'
 *
 * @returns {Number} numeral representation of the style string, such as: 100
 * 
 */
function numeralStyleToNumber(styleString) {
	return Number(styleString.replace("px",""));
}

/**
 *
 * @description Accepts an event object and returns the event's layerX and layerY (since the properties are depreciated)
 *
 * @param {Event} event to get the location of
 *
 * @returns {Dictionary} In the format: {x:layerX, y:layerY}
 * 
 */
function getOffset(evt) {
	// Directly FROM: http://stackoverflow.com/questions/3235043/last-element-of-array-in-javascript
	var el = evt.target,
	x = y = 0;

  	while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    		x += el.offsetLeft - el.scrollLeft;
    		y += el.offsetTop - el.scrollTop;
    		el = el.offsetParent;
  	}

  	x = evt.clientX - x;
  	y = evt.clientY - y;

  	return { x: x, y: y };
}


/**
*   Gets an event with all needed properties
*   @param      e           event
*   @return     event object
*/
function normalizeEvent(e) {
	// FROM: http://bytes.com/topic/javascript/insights/741435-guide-coding-cross-browser-scripts-part-2-event-normalization
	if(!e) {
    		e = window.event;
	}
	if(e.layerX) {
		e.offsetX = e.layerX;
		e.offsetY = e.layerY;
	}

	if(e.type == 'mouseover' && !e.relatedTarget) {
    		e.relatedTarget = e.fromElement;
	}
	else if(e.type == 'mouseout' && !e.relatedTarget) {
   		e.relatedTarget = e.toElement;
	}

	e.src = e.srcElement || e.target;
	e.key = e.keyCode || e.charCode;

	return e;
}

/**
*   Returns a string with commas added for thousands seperator
*   @param      nStr {String} number string without commas
*   @return     {String} number string with commas added
*/
function addCommasToNumberString(nStr) {
// from: http://www.mredkj.com/javascript/nfbasic.html
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

/**
*   Returns a shuffled version of the array
*   @param      myArray Array
*   @return     shuffledArray Array
*/

// DERRIVED FROM: http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
function getShuffledArray(array) {
	var shuffledArray = [];
	shuffledArray = shuffledArray.concat(array);
    	for (var i = shuffledArray.length - 1; i > 0; i--) {
        	var j = Math.floor(Math.random() * (i + 1));
	        var temp = shuffledArray[i];
        	shuffledArray[i] = shuffledArray[j];
	        shuffledArray[j] = temp;
    	}
	return shuffledArray;
}

/**
 *
 * @description Function to modify various base classes such as Array, String, Int, etc. 
 *
 * 
 */
function initBaseClassModifications() {

	/*
	 * @ignore
	 */
	 
	// FROM: http://stackoverflow.com/questions/3235043/last-element-of-array-in-javascript
	String.prototype.toTitleCase = function() {
		
		// From: http://stackoverflow.com/questions/6162600/how-do-you-split-a-javascript-string-by-spaces-and-punctuation
		var arrayOfWords = this.replace(/[^\w\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');
		var newString = "";
		for( word in arrayOfWords ) {
			arrayOfWords[word] = arrayOfWords[word][0].toUpperCase() + arrayOfWords[word].substring(1,arrayOfWords[word].length).toLowerCase();
			newString += arrayOfWords[word] + " ";
		}
		newString = newString.substring(0,newString.length-1);
		
		return newString;
	}
	
	/*
	// FROM: http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
	Array.prototype.shuffle = function() {
		var i = this.length, j, tempi, tempj;
		if ( i == 0 ) return false;
		while ( --i ) {
			j = Math.floor( Math.random() * ( i + 1 ) );
			tempi   = this[i];
			tempj   = this[j];
			this[i] = tempj;
			this[j] = tempi;
  		}
		return this;
	}	
	*/	
}
initBaseClassModifications();
/**
 * @description IMA CSVReader Class
 * @class CSVReader
 * @constructor
 * @extends IMA.Component
 *
 * @param {String} url String path to the csv file to parse
 * @param {Array} options Options array for items such as splitChar, endLineChar, and escapeChar
 *
 * @property {DOM Element} tag DOM Element representation of object
 * @property {String} csvUrl String path to the csv file to parse
 * @property {BOOL} loaded Boolean on whether the reader has loaded the file or not
 * 
 *
 * @example
 * // Example declaration:
 * var myCSVReader = new IMA.Component.CSVReader('myCSV.csv',{splitChar:','});
 *
 */
IMA.Component.CSVReader = function(url, options) {
	this.stamp = IMAMasterStamper.getIDStamp(this);
	this.csvUrl = url;
	this.loaded = false;
	
	// Set options
	if( options ) {
		options.splitChar ? this.splitChar = options.splitChar : this.splitChar = ","
		options.endLineChar ? this.endLineChar = options.endLineChar : this.endLineChar = "\n"
		options.escapeChar ? this.escapeChar = options.escapeChar : this.escapeChar = "\""
	} else {
		this.splitChar = ",";
		this.endLineChar = "\n";
		this.escapeChar = '"';
	}
	
	// Used to store the dataset
	this.rawDataset = null;
	this.dataset = [];
	this.allRows = [];
	this.allCols = [];
	this.allIndexes = [];
	this.allFields = [];
}

/**
 *
 * @description Function used to initiate the loading of the csv file and posts back when done
 *
 * @param {Function} postback Function that is called on once the load has been complete
 * 
 */
IMA.Component.CSVReader.prototype.load = function(postback) {
	this.postbackOnLoad = postback;
	$.ajax({
		url:this.csvUrl,
		dataType:"text",
		context: this,
		success:function(data) {
			this.rawDataset = String(data);
			this.rawDataset = this.rawDataset.replace(/\r?\n|\r/g, "\n"); // fixes problem with newline chars
			this.parseDataset();
		}
	});
}

/**
 *
 * @description Local function which is used to parse the raw csv data into usable local data and then calls a postback when done
 * 
 */
IMA.Component.CSVReader.prototype.parseDataset = function() {
	this.allRows = this.rawDataset.split(this.endLineChar);
	for( var i = 0; i < this.allRows.length; i++ ) {
		this.allIndexes.push( this.allRows[i].split(this.splitChar)[0] );
	}
	
	this.allFields = this.allRows[0].split(this.splitChar);
	
	for( var i = 0; i < this.allRows.length; i++ ) {
		this.dataset.push( this.allRows[i].split(this.splitChar) );
	}
	
	this.postbackOnLoad(this);
}

/**
 *
 * @description This creates and returns a Row Indexed dataset which is a dataset where the first column indicates the UID to find each row's data
 *
 * @returns {Array} A Row Indexed dataset *see description
 * 
 */
IMA.Component.CSVReader.prototype.getRowIndexedDataset = function() {
	// Row Indexed dataset is a dataset where the first column indicates the UID to find each row's data
	var indexedDataset = {};
	for( var i = 0; i < this.allRows.length; i++ ) {
		var tempRow = this.allRows[i].split(this.splitChar);
		tempRow = this.linkStringsInRow(tempRow);
		indexedDataset[tempRow[0]] = tempRow.splice(1,tempRow.length);
	}
	return(indexedDataset);
}

/**
 *
 * @description This creates and returns a Col Indexed dataset which is a dataset where the first row indicates the UID to find each col's data
 *
 * @returns {Array} A Col Indexed dataset *see description
 * 
 */
IMA.Component.CSVReader.prototype.getColIndexedDataset = function() {
	// Col Indexed dataset is a dataset where the first row indicates the UID to find each col's data
	var indexedDataset = {};
	for( var i = 0; i < this.allFields.length; i++ ) {
		var tempCol = [];
		for( var j = 1; j < this.allRows.length; j++ ) {
			tempCol.push( this.linkStringsInRow(this.allRows[j].split(this.splitChar))[i] );
		}
		indexedDataset[this.allFields[i]] = tempCol;
	}
	return(indexedDataset);
}

/**
 *
 * @description This creates and returns a Row Fully Indexed dataset which is a dataset where the first row indicates the UID to find each col's data via column field
 *
 * @returns {Array} A Row Fully Indexed dataset *see description
 * 
 */
IMA.Component.CSVReader.prototype.getRowFullyIndexedDataset = function() {
	// Row Fully Indexed dataset is a dataset where the first row indicates the UID to find each col's data via column field
	var indexedDataset = {};
	for( var i = 1; i < this.allRows.length; i++ ) {
		var tempRow = this.allRows[i].split(this.splitChar);
		tempRow = this.linkStringsInRow(tempRow);
		indexedDataset[tempRow[0]] = {};
		for( var j = 1; j < this.allFields.length; j++ ) {
			indexedDataset[tempRow[0]][this.allFields[j]] = tempRow[j];
		}
	}
	return(indexedDataset);
}


IMA.Component.CSVReader.prototype.linkStringsInRow = function( rowArray ) {
	// To be coded - this function takes string fields with commas and puts them together. For example:
	// [1], [aword], ["This is a string], [but it has a comma that seperates it"] which will become:
	// [1], [aword], ["This is a string, but it has a comma that seperates it"]
	// Where [<something>] is a single element in the array.
	return rowArray;	
}
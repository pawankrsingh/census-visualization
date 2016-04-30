IMA.Component.Preloader = function(container) {
	IMA.Component.Preloader.superclass.call(this);
	this.stamp = IMAMasterStamper.getIDStamp(this);
	
	if( container != null ) {
		this.tag = document.getElementById(container);
		this.tag.setAttribute('class', (new IMA.Component.Preloader.Styles).classes['container']);
		this.hide();
	}
		
	this.objectsInLoadQueue = [];
	this.totalObjectsInLoadQueue = 0;
	this.objectsLoaded = 0;
	
	this.objectsYetToLoad = [];
	
	this.loadingBar = null;
	this.loadingText = null;
}
extend(IMA.Component.Preloader, IMA.Component); // Subclassing (extending) Component


// BEGIN IMAGE LOADING
IMA.Component.Preloader.prototype.preloadImages = function(images) {
	// simply adds to que so that multiple loads can be performed simultaniously
	for( image in images ) {
		this.objectsInLoadQueue.push( images[image] );
		this.objectsYetToLoad.push( images[image] );
		this.totalObjectsInLoadQueue++;
	}
	this.initializeLoadingStatus();
	this.loadNextImage();
}

IMA.Component.Preloader.prototype.loadNextImage = function() {
	if( this.objectsInLoadQueue.length > 0 ) {
		var tmpImage = new Image();
		tmpImage.onload = (function() { this.caller.imageLoaded(this.preloadValue) }); 
		tmpImage.caller = this;	
		var preloadPath = this.objectsInLoadQueue.shift();
		tmpImage.preloadValue = preloadPath;
		tmpImage.src = preloadPath;
		this.loadNextImage();
	} 
}

IMA.Component.Preloader.prototype.imageLoaded = function(imageLoaded) {
	this.objectsLoaded++;
	var indexOfImage = null;
	for( var i = 0; i < this.objectsYetToLoad.length; i++ ) {
		if( this.objectsYetToLoad[i] === imageLoaded ) {
			indexOfImage = i;
			break;	
		}
	}
	// this.objectsYetToLoad.splice( this.objectsYetToLoad.indexOf(imageLoaded), 1 );
	this.objectsYetToLoad.splice( indexOfImage, 1 );
	this.updateLoadingStatus();
	if( this.objectsLoaded >= this.totalObjectsInLoadQueue ) {
		this.allImagesLoaded();
	}
}

IMA.Component.Preloader.prototype.allImagesLoaded = function() {
	this.resetLoadQueue();
	this.dispatch("loadcomplete",this);
}

// END IMAGE LOADING

IMA.Component.Preloader.prototype.initializeLoadingStatus = function() {
	if( this.tag != null ) {
		this.show();
		this.loadingBar = new IMA.Component.Preloader.LoadingBar(this);
		this.tag.appendChild(this.loadingBar.tag);
		this.tag.appendChild(this.loadingBar.tagBackground);
		
		this.loadingText = new IMA.Component.Preloader.LoadingText(this);
		this.tag.appendChild(this.loadingText.tag);
	}
}

IMA.Component.Preloader.prototype.updateLoadingStatus = function() {
	this.loadingBar ? this.loadingBar.update() : null
	this.loadingText ? this.loadingText.update() : null
}

IMA.Component.Preloader.prototype.resetLoadQueue = function() {
	// Checks to see if the load queue is empty, if it is, reset the counter
	if( this.objectsInLoadQueue.length == 0 ) {
		this.totalObjectsInLoadQueue = 0;
		this.objectsLoaded = 0;
		this.hide();
	}
}

IMA.Component.Preloader.prototype.show = function() {
	this.tag ? this.tag.style.display = 'block' : null
}

IMA.Component.Preloader.prototype.hide = function() {
	this.tag ? this.tag.style.display = 'none' : null
}


//
// STYLES
//

IMA.Component.Preloader.Styles = function() {
	this.classes = [];
	this.classes['root'] = (new IMA.Component.Styles).classes['root'] + '-Preloader';
	
	// objects
	this.classes['container'] = this.classes['root'] + '-Container';
	this.classes['bar'] = this.classes['root'] + '-Bar';
	this.classes['bar-background'] = this.classes['bar'] + '-Background';
	this.classes['text'] = this.classes['root'] + '-Text';
	
};

//
// LOADING BAR
//

IMA.Component.Preloader.LoadingBar = function(container) {
	this.container = container;
	
	this.barWidth = this.container.tag.offsetWidth;
	this.barHeight = this.container.tag.offsetHeight;
		
	this.tag = document.createElement('div');
	this.tag.setAttribute('class', (new IMA.Component.Preloader.Styles).classes['bar']);
	
	this.tagBackground = document.createElement('div');
	this.tagBackground.setAttribute('class', (new IMA.Component.Preloader.Styles).classes['bar-background']);
}

IMA.Component.Preloader.LoadingBar.prototype.update = function() {
	var percentComplete = (this.container.objectsLoaded / this.container.totalObjectsInLoadQueue);
	var width = this.barWidth;
	var height = this.barHeight;
	
	this.tag.style.width = String(width*percentComplete) + 'px';
	this.tag.style.height = String(height) + 'px';
	
	this.tagBackground.style.width = String(width-1) + 'px';
	this.tagBackground.style.height = String(height-1) + 'px';
}

//
// LOADING TEXT
//

IMA.Component.Preloader.LoadingText = function(container) {
	this.container = container;
	
	this.tag = document.createElement('div');
	this.tag.setAttribute('class', (new IMA.Component.Preloader.Styles).classes['text']);
}


IMA.Component.Preloader.LoadingText.prototype.update = function() {
	var percentComplete = (this.container.objectsLoaded / this.container.totalObjectsInLoadQueue);
	this.tag.innerHTML = (Math.floor(percentComplete * 100)) + '%';
}










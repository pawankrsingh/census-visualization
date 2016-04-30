// -----------------------------------
//
// Header File for IMA HTML Components
//
// Written by: Mark Rabenhorst
// Date: April 9, 2012
//
// -----------------------------------

/**
 * @description IMA Parent Class
 * @class IMA Class
 * @constructor
 */
IMA = function() {};

var scriptRootPath = '../IMA_Components/';

// From: http://www.cryer.co.uk/resources/javascript/script17_include_js_from_js.htm
function IncludeJavaScript(jsFile)
{
  document.write('<script type="text/javascript" src="' + scriptRootPath + jsFile + '"></script>'); 
}
function IncludeCSS(cssFile)
{
  document.write('<link rel="stylesheet" href="' + scriptRootPath + cssFile + '" type="text/css" />'); 
}

// -----------------------------------
//
// Javascript Imports
//
// -----------------------------------

// jQuery
IncludeJavaScript('scripts/jQuery/jquery-1.7.2.min.js');
IncludeJavaScript('scripts/jQuery/jquery-ui-1.10.2.custom.min.js');

// Other Libraries
// ---------------
// HighCharts.com
IncludeJavaScript('scripts/Libraries/highstock.js');
//IncludeJavaScript('scripts/Libraries/highcharts.js');
IncludeJavaScript('scripts/Libraries/highcharts-more.js');
IncludeJavaScript('scripts/Libraries/html2canvas.min.js');
IncludeJavaScript('scripts/Libraries/jquery.plugin.html2canvas.js');

// Utility functions
IncludeJavaScript('scripts/Utilities/util.js');

// Parent object class
IncludeJavaScript('scripts/Component.js');

// Stamper (creates an instance of IMAMasterStamper)
IncludeJavaScript('scripts/IDStamp/IMA_IDStamp.js');

// Preloaders
IncludeJavaScript('scripts/Preloader/Preloader.js');

// CSVReader
IncludeJavaScript('scripts/CSVReader/CSVReader.js');

// Utility Objects
IncludeJavaScript('scripts/Utilities/Utility.js');
IncludeJavaScript('scripts/Utilities/Leaflet/Leaflet.js');
IncludeJavaScript('scripts/Utilities/Leaflet/MapController/Utility_Leaflet_MapController.js');
IncludeJavaScript('scripts/Utilities/Leaflet/MapPrinterHelper/Utility_Leaflet_MapPrinterHelper.js');

// Sliders
IncludeJavaScript('scripts/Sliders/Slider.js');
IncludeJavaScript('scripts/Sliders/Horizontal/Slider_Horizontal.js');
IncludeJavaScript('scripts/Sliders/Horizontal/Timeline/Slider_Horizontal_Timeline.js');
IncludeJavaScript('scripts/Sliders/Horizontal/Roller/Slider_Horizontal_Roller.js');
IncludeJavaScript('scripts/Sliders/Vertical/Slider_Vertical.js');
IncludeJavaScript('scripts/Sliders/Vertical/Timeline/Slider_Vertical_Timeline.js');

// Events
IncludeJavaScript('scripts/Events/Event.js');

// Graphs
IncludeJavaScript('scripts/Graphs/Graph.js');
IncludeJavaScript('scripts/Graphs/Timeline/Graph_Timeline.js');
IncludeJavaScript('scripts/Graphs/Wordmap/Graph_Wordmap.js');
IncludeJavaScript('scripts/Graphs/Globe/Graph_Globe.js');
IncludeJavaScript('scripts/Graphs/Comparer/Graph_Comparer.js');
IncludeJavaScript('scripts/Graphs/OverlayMap/Graph_OverlayMap.js');
IncludeJavaScript('scripts/Graphs/Magnifier/Graph_Magnifier.js');
IncludeJavaScript('scripts/Graphs/BracketGame/Graph_BracketGame.js');
IncludeJavaScript('scripts/Graphs/GridController/Graph_GridController.js');

// -----------------------------------
//
// Stylesheet Imports
//
// -----------------------------------
IncludeCSS('styles/styles.css');
IncludeCSS('styles/jquery-ui-1.10.2.custom.min.css');
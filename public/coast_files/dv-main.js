$(document).ready(function(){
	var GSLOTS = 4;
	var GSIZE = $('#dv-gallery-cont ul li').size()
	var GWIDTH = GSIZE * 190;
	var GTICK = 0;
	$('#dv-gallery-cont ul').width( GWIDTH );
	
	$('.gal-car-button').click(function(){
		var button = $(this);
		var gallery = $('#dv-gallery-cont ul');
		var move = false;
		
		if(button.attr('id') == 'gc-left'){
			if(GTICK > 0){
				GTICK--;
				move = true;
			}
		} else if(button.attr('id') == 'gc-right') {
			if(GTICK != (GSIZE - GSLOTS)){
				GTICK++;
				move = true;
			}
		}
	
		if(move){
        	var pos = -(GTICK * 190);
        	$('#dv-gallery-cont ul').animate({ left: pos }, 500);
       	}
       	
		setStyles();
	});
	
	function setStyles(){
		var pos = (GTICK <= 0) ? "0px 28px" : "0px 0px"; 
		var cur = (GTICK <= 0) ? "auto" : "pointer";
		$('#gc-left').css( {backgroundPosition: pos, cursor: cur} );
		pos = (GTICK >= (GSIZE - 4)) ? "28px 0px": "28px 28px";
		cur = (GTICK >= (GSIZE - 4)) ? "auto": "pointer";
		$('#gc-right').css( {backgroundPosition: pos, cursor: cur} );
	}
	
	setStyles();
	checkBrowser();
	
});

//This JavaScript shows and hides the drop-down menus. In order for it to work, the tabs must be named with a prefix and a type.
//For example: "geoOuter" is the ID of the outer div for the Geography menu
//      "geoTab" is the ID of the li for the Geography main menu
//      "geoAnchor" is the ID for the anchor tag containing the "Geography" text
function show(id) {
	document.getElementById(id + 'Outer').style.visibility = "visible";
	document.getElementById(id + 'Tab').style.backgroundColor = "#d4e9f9";
	document.getElementById(id + 'Anchor').style.color = "#003366";
}

function hide(id) {
	document.getElementById(id + 'Outer').style.visibility = "hidden";
	document.getElementById(id + 'Tab').style.backgroundColor = "transparent";
	document.getElementById(id + 'Anchor').style.color = "#ffffff";
}

// this function determines whether the event is the equivalent of the microsoft
// mouseleave or mouseenter events.
function isMouseLeaveOrEnter(e, handler) {
	if(e.type != 'mouseout' && e.type != 'mouseover') return false;
	var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
	while(reltg && reltg != handler)
	reltg = reltg.parentNode;
	return (reltg != handler);
}

function getVersionNumber(){
  var ver = 9;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
  	ver = -1;
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      ver = parseFloat( RegExp.$1 );
  }
  return ver;
}
	
function checkBrowser(){
    if ( getVersionNumber() < 8.0 ){ 
      alert("This version of Internet Explorer is not supported. Please upgrade to Internet Explorer 8 or later.");
    }
}
	







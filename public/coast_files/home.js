(function($) {
	
    /* BEGIN: jQuery initialization function */
    $(document).ready(function() {
    	
        $("#global-subnav > li").hover(function() {
            $(this).addClass("hover").children(".menu").removeClass("hidden");
        }, function() {
            $(this).removeClass("hover").children(".menu").addClass("hidden");
        });

        $('.default-value').each(function() {
            var default_value = $(this).val();
            $(this).css('color', '#666');
            $(this).focus(function() {
                if (this.value == default_value) {
                    this.value = '';
                    $(this).css('color', '#333');
                }
            });
            $(this).blur(function() {
                if (this.value == '') {
                    $(this).css('color', '#666');
                    this.value = default_value;
                }
            });
        });
        
        
        $('#feedback-link, #feedback').click(function(e){
        	$('#feedback_comment').val('');
        	$('#feedback_email').val('')
        	$('#fb-char-count').html("800 characters remaining");
        	$('#feedback-window').show();
        });
        
        $('#feedback-close-button, #feedback-buttons a:eq(1)').click(function(e){
        	$('#feedback-window').hide();
        });
        
        $('#feedback-buttons a:eq(0)').click(function(e){
        	validate($);
        });
        
        var DEFAULT_CHAR_COUNT = 800;
        $('#feedback_comment').keydown(function(){
        	$('#fb-char-count').html( (DEFAULT_CHAR_COUNT - $(this).val().length) + " characters remaining" );
	        if($(this).val().length > DEFAULT_CHAR_COUNT) $(this).val( $(this).val().substring(0,DEFAULT_CHAR_COUNT) );
        }).keyup(function(){
        	$('#fb-char-count').html( (DEFAULT_CHAR_COUNT - $(this).val().length) + " characters remaining"  );
	        if($(this).val().length > DEFAULT_CHAR_COUNT) $(this).val( $(this).val().substring(0,DEFAULT_CHAR_COUNT) );
        });
        
        $('#alert-close-button, #alert-buttons a:eq(0)').click(function(e){
        	$('#alert-window').hide();
        });
       
       
        
        $("#st").attr("autocomplete", "off");
        
        
        $("#btnG").click(function(e){
        	$("#suggestion_form").submit();
        });
    });
    /* END: jQuery initialization function */

})(jQuery);

function validate($){
	//if( $('#feedback_name').val()!=''){
	//	$('#alert-panel p').html( 'There seems to be an error with your information.' );
	//	$('#alert-window').fadeIn(500);
	//	return false;
	//}
	
	if( $('#feedback_comment').val()==''){
		$('#alert-panel p').html( 'You must provide feedback before submitting.' );
		$('#alert-window').show();
		return false;
	}
	
	if( $('#feedback_email').val()!='' && !$('#feedback_email').val().match(/^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/i) ){
		$('#alert-panel p').html( 'Email address seems incorrect.' );
		$('#alert-window').show();
		return false;
	}

	$.post("/main/www/homepage_feedback.php", {feedback_name:$('#feedback_name').val(),feedback_comment:$('#feedback_comment').val(),feedback_email:$('#feedback_email').val()}, function(d){ 
		$('#alert-panel p').html( (d == 1) ? "Thank you for your feedback!" : "Uh oh! There seems to be a problem with your request" );
		if(d == 1) $('#feedback-window').hide();
		$('#alert-window').show();
	});
}

function updateWindowSize(screen){
	var width = screen.width();
	var height = screen.height();
	
	if((width < 605) && (width > 452)){		
		$('#aeMobile-image').css('width','450px');
		$('#aeMobile-image').css('height','225px');
		$('#aeMobile-panel').css('width','452px');
		$('#aeMobile-panel').css('height','227px');
	}else if((width < 452) && (width > 340)){
		$('#aeMobile-image').css('width','338px');
		$('#aeMobile-image').css('height','169px');
		$('#aeMobile-panel').css('width','340px');
		$('#aeMobile-panel').css('height','172px');
	}else if(width < 340){
		$('#aeMobile-image').css('width','254px');
		$('#aeMobile-image').css('height','127px');
		$('#aeMobile-panel').css('width','256px');
		$('#aeMobile-panel').css('height','129px');
	}else{
		$('#aeMobile-image').css('width','600px');
		$('#aeMobile-image').css('height','300px');
		$('#aeMobile-panel').css('width','602px');
		$('#aeMobile-panel').css('height','302px');
	}
	
	
}




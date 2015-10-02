jQuery(document).ready(function($) {

	
	function baseVote(value){
		
	}

	function enablePostVoting(){
		$('.ht-voting-links a').each(function( index ) {
            var voteActionAnchor = $(this);
            var enabled = voteActionAnchor.hasClass('enabled');
            var targetDirection = voteActionAnchor.attr('data-direction');
            var targetType = voteActionAnchor.attr('data-type');
            var targetNonce = voteActionAnchor.attr('data-nonce');
            var targetID = voteActionAnchor.attr('data-id');
            var targetAllow = voteActionAnchor.attr('data-allow');
            var targetDisplay = voteActionAnchor.attr('data-display');
            voteActionAnchor.click(function(event){
                event.preventDefault();
                if(!enabled){
                    alert(voting.log_in_required)
                    return;
                }
                var data = {
                  	action: 'ht_voting',
                   	direction: targetDirection,
		            type: targetType,
		            nonce: targetNonce,
		            id: targetID,
                    allow: targetAllow,
                    display: targetDisplay,
                };
                $.post(voting.ajaxurl, data, function(response) {
                  if(response!=''){
                    //replace the voting box with response
                    if(targetType=="post"){
                    	$('#ht-voting-post-'+targetID).replaceWith(response);
                    }else if(targetType=="comment"){
                    	$('#ht-voting-comment-'+targetID).replaceWith(response);
                    }
                    enablePostVoting();
                  }
                });
                
            }); 

        });
    }
    //onload enable buttons
    enablePostVoting();

	

});

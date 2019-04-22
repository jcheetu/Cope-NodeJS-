(function ( $ ) {
 
    $.fn.chat = function( options ) {
        var globalContainer;
        var settings = $.extend({
            // These are the defaults.
            baseUrl : "",
            accessToken : "",
			chatbotTitle : "",
			ai : ""
        }, options );
        
    
        var chat_container = '<div class="cd-cart-container empty" ><a href="#0" class="cd-cart-trigger" style="z-index: 999;position: fixed;"></a>'
        + '<div class="cd-cart" style="z-index: 999">'
          +  '<div class="wrapper">'
           + '<header style="box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.15);background: #1F8CEB;">'
                      +' <div style="color: #fff;font-size: 17px;line-height: 1.1em;'
                         +  'white-space: nowrap;text-align: center;margin: 9.5px auto;overflow: hidden;text-overflow: ellipsis;">'+ settings.chatbotTitle +'</div>'
               +' </header>'
                + '<div class="body container">'
                      + '<mybot></mybot>'
                     
                  + '</div>'
                  + '<footer id="chatHide">'
                   + '<input  type="text" id="chat-input" autocomplete="off" placeholder="Try typing here..." class="bot-form-control bot-txt"/>'
               + '</footer>'
            + '</div>'
            + '</div>'
        + '</div>';
        $(this).html(chat_container);
        var mybot = '<div class="chatCont" id="chatCont">'+
						'<!--chatCont end-->';

			mybot+='<div id="result_div" class="resultDiv"></div>'+
			'<div class="chatForm" id="chat-div">'+
				'<div class="spinner">'+
					'<div class="bounce1"></div>'+
					'<div class="bounce2"></div>'+
					'<div class="bounce1"></div>'+
				'</div>'+
			'</div>'+
        '</div>';
        
        $("mybot").html(mybot);
        
        var cartWrapper = $('.cd-cart-container');

        if( cartWrapper.length > 0 ) {
            var cartBody = cartWrapper.find('.body')
            var cartList = cartBody.find('ul').eq(0);
            var cartTotal = cartWrapper.find('.checkout').find('span');
            var cartTrigger = cartWrapper.children('.cd-cart-trigger');
          
                  //event.preventDefault();
            addToCart($(this));
           
   
           //open/close cart
           cartTrigger.on('click', function(event){
               $('#result_div').empty();
               toggleCart();
           });
   
       
       }
   
       function addToCart(trigger) {
		var cartIsEmpty = cartWrapper.hasClass('empty');
		//addProduct();
		cartWrapper.removeClass('empty');
        }
        
        function toggleCart(bool) {
            var cartIsOpen = ( typeof bool === 'undefined' ) ? cartWrapper.hasClass('cart-open') : bool;
            if( cartIsOpen ) {
                 cartWrapper.removeClass('cart-open');
                 $('#chatbot_frame').height("65px"); 
                 $(".cd-cart").hide();
            
                } else {
                    $('#chatbot_frame').height("500px"); 
                    $(".cd-cart").css("margin-bottom", "70px").fadeIn("slow");
                    cartWrapper.addClass('cart-open');
                                    send("Hi");
                 }
        }

        var session = function(param) {
            // Retrieve the object from storage
            if(sessionStorage.getItem('session') && param!=true) {
                var retrievedSession = sessionStorage.getItem('session');
            } else {
                // Random Number Generator
                var randomNo = Math.floor((Math.random() * 1000) + 1);
                // get Timestamp
                var timestamp = Date.now();
                // get Day
                var date = new Date();
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                var day = weekday[date.getDay()];
                // Join random number+day+timestamp
                var session_id = randomNo+day+timestamp;
                // Put the object into storage
                sessionStorage.setItem('session', session_id);
                var retrievedSession = sessionStorage.getItem('session');
            }
            return retrievedSession;
            // console.log('session: ', retrievedSession);
        }
    
        // Call Session init
        var mysession = session();

        // on input/text enter--------------------------------------------------------------------------------------
	$('#chat-input').on('keyup', function(e) {
		var keyCode = e.keyCode || e.which;
		var text = $("#chat-input").val();
		if (keyCode === 13) {
			if(text == "" ||  $.trim(text) == '') {
				e.preventDefault();
				return false;
			} else {
				//$("#chat-input").blur();
				setUserResponse(text);
				send(text);
				e.preventDefault();
				return false;
			}
			$("#chat-input").focus();
		}
	});


	//------------------------------------------- Send request to API.AI ---------------------------------------
	function send(text) {
			//console.log(baseUrl);
		if(text=='Hi'){
			mysession=session(true);
		}
		var data = {
			"text": text,
			"sessionId": mysession,
			"accessToken" : settings.accessToken,
        	"ai" : settings.ai,
		};
		
		$.ajax({
			type: "POST",
			url: "/AI/sendrequest",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: {
				"Authorization": "Bearer " + settings.accessToken
			},
			// data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
			success: function(data) {
                                //console.log("data");
								//console.log("results test");
								$("#chat-input").prop('disabled', false);
								               
				main(data);
				//console.log(data);				
			},
			error: function(e) {
				//console.log (e);
			}
		});
    }
    function main(data) {
		var action = data.result.action;
		//console.log(data);
		var messagesData = data.result.fulfillment.data;
		var messagesJson = data.result.fulfillment.messages;
		// use incomplete if u use required in api.ai questions in intent
		// check if actionIncomplete = false

		var incomplete = data.result.actionIncomplete;
		if (incomplete) {
			setBotResponse(data.result.fulfillment.speech);
		}else if(messagesJson) { // check if messages are there
			var time = 500
			for(var i = 0; i < messagesJson.length; i++){
				if(messagesJson[i].platform == "facebook") {
					if(messagesJson[i].speech){
						setBotResponse(messagesJson[i].speech, time);
					}else if(messagesJson[i].title){
                        addSuggestion(messagesJson[i], time);
						
					}
					else if(messagesJson[i].imageUrl){
						addImage(messagesJson[i].imageUrl, time);
					}
					time += time;
				} else if(messagesJson[i].platform != 'facebook' && messagesJson[i].platform != 'skype' && action !='send_mail') {
					setBotResponse(data.result.fulfillment.speech);
				}
			}
		}
    }
    
    //------------------------------------ Set bot response in result_div -------------------------------------
    function setBotResponse(val, time) {
             
		setTimeout(function(){
			showSpinner();
			if($.trim(val) == '') {
				val = 'I couldn\'t get that. Let\' try something else!'
				var BotResponse = '<p class="botResult">'+val+'</p><div class="clearfix"></div>';
				$(BotResponse).appendTo('#result_div');
			} else {
				val = val.replace(new RegExp('\r?\n','g'), '<br />');
				var BotResponse = '<p class="botResult">'+val+'</p><div class="clearfix"></div>';
				$(BotResponse).appendTo('#result_div');
			}
			scrollToBottomOfResults();
			hideSpinner();
		}, time);
                 $("#chat-input").attr('readonly', false);
    }
    
    function addImage(url, time) {
		setTimeout(function(){
			showSpinner();
			$('<p class="botResult"><img src='+url+' width = 50 height = 50></p><div class="clearfix"></div>').appendTo('#result_div');
			scrollToBottomOfResults();
			hideSpinner();
		}, time);
	}


	//------------------------------------- Set user response in result_div ------------------------------------
	function setUserResponse(val) {
		var UserResponse = '<p class="userEnteredText">'+val+'</p><div class="clearfix"></div>';
		$(UserResponse).appendTo('#result_div');
		$("#chat-input").val('');
		scrollToBottomOfResults();
		showSpinner();
		//$('.suggestion').remove();
	}


	//---------------------------------- Scroll to the bottom of the results div -------------------------------
	function scrollToBottomOfResults() {
		var terminalResultsDiv = document.getElementById('chatCont');
		terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
	}


	//---------------------------------------- Ascii Spinner ---------------------------------------------------
	function showSpinner() {
		$('.spinner').show();
	}
	function hideSpinner() {
		$('.spinner').hide();
	}


	//------------------------------------------- Suggestions --------------------------------------------------
	function addSuggestion(textToAdd, time) {
		setTimeout(function() {
			showSpinner();
			time = Math.ceil(Math.random()*10000000);
			var title = textToAdd.title;
			var suggestions = textToAdd.replies;
			var suggLength = textToAdd.replies.length;
                       // console.log("addSuggestion");
                        //console.log(title);
			$('<p class="suggestion suggest_'+time+'"></p><div class="clearfix"></div>').appendTo('#result_div');
			$('<div class="sugg-title">'+title+'</div>').appendTo('.suggest_'+time);
			// Loop through suggestions
			for(i=0;i<suggLength;i++) {
				$('<span class="sugg-options">'+suggestions[i]+'</span>').appendTo('.suggest_'+time);
			}
			scrollToBottomOfResults();
			$("#chat-input").prop('disabled', true);
			hideSpinner();
		}, time);
                $("#chat-input").attr('readonly', true);
	}

	// on click of suggestions get value and send to API.AI
	$(document).on("click", ".suggestion span", function() {
		var text = this.innerText;
		setUserResponse(text);
		send(text);
		// $('.suggestion').remove();
	});
	

    };
 
}( jQuery ));
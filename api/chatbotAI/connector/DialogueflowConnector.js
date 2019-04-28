var apiai = require('apiai');
  
module.exports  =   {

    sendRequest :  function(reqObj, callback) {
    // console.log(reqObj);
    // var data = {
    //     "query": reqObj.text,
    //     "lang": "en",
    //     "sessionId": reqObj.sessionId
    // };
    // var req = {
    //     url : 'https://api.api.ai/v1/query?v=20150910',
    //     method :'POST',
    //     data: JSON.stringify(data),
	// 		contentType: "application/json; charset=utf-8",
	// 		dataType: "json",
	// 		headers: {
	// 			"Authorization": "Bearer " + reqObj.accessToken
    //         }
    //     };
    // sails.request(req,function(error,response){
    //     if(error || (response.statusCode != 200)) {
    //         callback(error);
    //       } else {
    //         callback(response);
    //       }
    // })
    // return;
    var app = apiai((reqObj.accessToken == undefined || reqObj.accessToken == null)? (sails.config.ai.dialogueflow.accessToken) : reqObj.accessToken);
    // var request = app.textRequest("<Your text query>", {
    //    sessionId: "<unique session id>"
    // });
    
     var request = app.textRequest(reqObj.text, {
        sessionId: reqObj.sessionId
      });
      
    request.on("response", function(response) {
        callback(response);
    });

    request.on("error", function(error) {
        callback(error);
    });

    request.end();
  }
};


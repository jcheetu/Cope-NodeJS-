var apiai = require('apiai');
  
module.exports  =   {

    sendRequest :  function(reqObj, callback) {
    
    var app = apiai((reqObj.accessToken == undefined || reqObj.accessToken == null)? (sails.config.ai.dialogueflow.accessToken) : reqObj.accessToken);
    // var request = app.textRequest("<Your text query>", {
    //   sessionId: "<unique session id>"
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


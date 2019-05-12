var DialogueflowConnector = require('./connector/DialogueflowConnector');
var IBMWatsonConnector = require('./connector/IBMWatsonConnector')
  
module.exports  =   {

    sendRequest :  function(reqObj, callback) {
    if(reqObj.ai.toUpperCase() == (sails.config.ai.DIALOGUEFLOW))
    { 
          DialogueflowConnector.sendRequest(reqObj, function(output) {
            callback(output);
        });
    }
    if(reqObj.ai.toUpperCase() == (sails.config.ai.WATSON))
    { 
          IBMWatsonConnector.sendRequest(reqObj, function(output) {
            callback(output);
        });
    }
    
  },
  session : function(param) {
    // Retrieve the object from storage
    if(sails.session_id != undefined && param!=true) {
        var retrievedSession = sails.session_id;
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
        sails.session_id = session_id;
        var retrievedSession = session_id;
    }
    return retrievedSession;
   
}
};


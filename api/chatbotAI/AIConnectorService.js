var DialogueflowConnector = require('./connector/DialogueflowConnector');
  
module.exports  =   {

    sendRequest :  function(reqObj, callback) {
    if(reqObj.AI == sails.config.ai.name)
    { 
          DialogueflowConnector.sendRequest(reqObj, function(output) {
            callback(output);
        });
    }
    
  }
};


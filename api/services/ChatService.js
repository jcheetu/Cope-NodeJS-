var AIConnectorService =  (require('../chatbotAI/AIConnectorService'));
module.exports = {
    db : function(){
        return sails.getDatastore("db_mongo").manager;
    },

    create: function (reqData,callback) {
      var reqdata = {text: reqData.message, sessionId : "asdfg-dfgh", AI : "dialogueflow"};
        var collection = this.db().collection("chat");
        collection.insert(reqData,function(err) {
            if (err) {
                LoggerService.logError(err);
                var res = Message.fail;
                res.reason = err;
                callback(res);

            } else {
                AIConnectorService.sendRequest(reqdata, function(output) {
                    var responce = output;
                    if(responce.status["code"]!=200){

                        LoggerService.logError(responce);
                        var res = Message.fail;
                        res.reason = err;
                        callback(res);
                    }
                    else{
                        collection.insert(responce,function(err) {
                            if (err) {
                                LoggerService.logError(err);
                                var res = Message.fail;
                                res.reason = err;
                                callback(res);
                
                            } else {
                                callback(responce);
                            }
                         });
                    }
                });
            }
         });  

       
     },

     getChat: function (customerId ,clientId,callback) {
        var collection = this.db().collection("chat");
        
        collection.find({$or : [{ fromId : customerId }, {toId : customerId }], $and : {clientID : clientId}, 
            $orderby: { createdOn : -1 }})
        .toArray(function(err, documents) {
            if (err) {
                LoggerService.logError(err);
                var res = Message.fail;
                res.reason = err;
                callback(res);
            };
            callback(documents);
        });
           
     },
};
module.exports = {
    db : function(){
        return sails.getDatastore("db_mongo").manager;
    },

    create: function (reqData,callback) {
        var collection = this.db().collection("chat");
        collection.insert(reqData,function(err) {
            if (err) {
                ErrorLoggerService.logError(err);
                var res = Message.fail;
                res.reason = err;
                callback(res);

            } else {
                callback(Message.success);
            }
         });      
     },

     getChat: function (customerId ,clientId,callback) {
        var collection = this.db().collection("chat");
        
        collection.find({$or : [{ fromId : customerId }, {toId : customerId }], $and : {clientID : clientId}, 
            $orderby: { createdOn : -1 }})
        .toArray(function(err, documents) {
            if (err) {
                ErrorLoggerService.logError(err);
                var res = Message.fail;
                res.reason = err;
                callback(res);
            };
            callback(documents);
        });
           
     },
};
module.exports = {
    db : function(){
        return sails.getDatastore("db_mongo").manager;
    },
    create: function (reqData,callback) {
        var collection = this.db().collection("customerSupportUser");
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

     getUser: function (userId, clientId,callback) {
        var collection = this.db().collection("customerSupportUser");
   
        collection.find({$and : [{customerSupportId : userId }, {clientID : clientId }]})
        .toArray(function(err, documents) {
            if (err) {
                ErrorLoggerService.logError(err);
                var res = Message.fail;
                res.reason = JSON.stringify(err);
                callback(res);
            };
            callback(documents);
        });
           
     },

     deleteUser: function (userId,clientId,callback) {
        var collection = this.db().collection("customerSupportUser");
   
         collection.remove({$and : [{customerSupportId : userId }, {clientID : clientId }]},function(err, documents) {
            if (err) {
                ErrorLoggerService.logError(err);
                var res = Message.fail;
                res.reason = JSON.stringify(err);
                callback(res);
            }
            else{
                if(documents.n == 0){
                    callback(Message.success);
                }
                if(documents.n == 0){
                    callback(Message.notFound);
                }

            }
            
        });
     },

    ///not working yet
     updateUser: function (reqData,callback) {
        var collection = this.db().collection("customerSupportUser");
        collection.update({$and : [{customerSupportId : reqData.customerSupportId }, {clientID : reqData.clientId }]}, {
            $set: {
                "customerSuportName" : reqData.customerSuportName,
                "email" : reqData.email,
                "updatedOn" : reqData.updatedOn
            }
        }, function(err, documents) {
            if (err) {
                ErrorLoggerService.logError(err);
                var res = Message.fail;
                res.reason = JSON.stringify(err);
                callback(res);
            }
            if(documents.n != 0){
                callback(Message.success);
            }
            if(documents.n == 0){
                callback(Message.notFound);
            }
        });
           
     }
};
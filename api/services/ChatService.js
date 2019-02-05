module.exports = {
    db : function(){
        return sails.getDatastore("db_mongo").manager;
    },

    create: function (reqData,callback) {
        var collection = this.db().collection("chat");
        collection.insert(reqData,function(err) {
            if (err) {
                //errorDb.insert(err);
                var res = Message.fail;
                res.reason = JSON.stringify(err);
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
            if (err) throw err;
            callback(documents);
        });
           
     },
};
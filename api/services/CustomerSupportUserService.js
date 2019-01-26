module.exports = {
    db : function(){
        return sails.getDatastore("db_mongo").manager;
    },

    create: function (reqData,callback) {
        var collection = db.collection("customerSupportUser");
        collection.insert(reqData,function(err) {
            if (err) {
                callback(JSON.stringify(err));
            } else {
                callback(JSON.stringify(reqData));
            }
         });  
     }
};
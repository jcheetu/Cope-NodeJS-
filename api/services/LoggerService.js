module.exports = {
    db : function(){
        return sails.getDatastore("db_mongo").manager;
    },
    logError: async function (reqData,callback) {
        var collection = this.db().collection("errorLogger");
        collection.insert(reqData);    
     },
     logActivity: async function (reqData) {
        var collection = this.db().collection("activityLogger");
        collection.insert(reqData);    
     }
}
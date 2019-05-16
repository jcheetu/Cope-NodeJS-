module.exports = {
    // db : function(){
    //     return sails.getDatastore("db_mongo").manager;
    // },
    DBStore_MySql : function(){
        return sails.getDatastore("db_mysql");
    },
    // logError: async function (reqData,callback) {
    //     var collection = this.db().collection("errorLogger");
    //     collection.insert(reqData);    
    //  },
    //  logActivity: async function (reqData) {
    //     var collection = this.db().collection("activityLogger");
    //     collection.insert(reqData);    
    //  }
    logError: async function (reqData, errorData) {
        if(sails.config.custom.errorLogger){
            var query = "insert into logger (Request, Logtype, Error) values ('"+JSON.stringify(reqData) + "','e',"+JSON.stringify(errorData)+")";
       
            this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
                if (err) {
                  ///  LoggerService.logError(err);
                 }
              
            });
        }
       
     },
    logActivity: async function (reqData) {
        if(sails.config.custom.activityLogger){
        
        var query = "insert into logger (Request, Logtype) values ('"+JSON.stringify(reqData) + "','a')";
       
        this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
            if (err) {
                //LoggerService.logError(err);
             }
          
        });
    }

    }
}
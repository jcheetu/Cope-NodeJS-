module.exports = {
    db : function(){
        return sails.getDatastore("db_mysql").manager;
    },
    
    authoriseAccessToken: async function (reqData) {
       // var query = "Select * from clientToken where COPEToken=" + reqData.accessToken;
       var query = "Select * from clientToken where accessToken=" + reqData.accessToken;
       this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
           console.log(query + ""+ nativeResult);
            if (err) {
                LoggerService.logError(err);
             }
            if(nativeResult.rows.count == 0){
              return false; 
            }
              return true;
        });

    }
}
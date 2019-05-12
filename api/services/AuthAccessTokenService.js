module.exports = {
    DBStore_MySql : function(){
        return sails.getDatastore("db_mysql");
    },
    
    authoriseAccessToken: async function (reqData) {
        console.log("authoriseAccessToken" + JSON.stringify(reqData.allParams()));
       // var query = "Select * from clientToken where COPEToken=" + reqData.accessToken;
       var query = "Select * from clientToken where accessToken='" + reqData.allParams().accessToken+"'";
       this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
           console.log(query + " "+ JSON.stringify(nativeResult.rows));
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
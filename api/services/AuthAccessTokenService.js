module.exports = {
    DBStore_MySql : function(){
        return sails.getDatastore("db_mysql");
    },
    
    authoriseAccessToken: function (reqData, callback) {
       // var query = "Select * from clientToken where COPEToken=" + reqData.accessToken;
       var query = "Select * from clientToken where accessToken='" + reqData.allParams().accessToken+"'";
       this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
            if (err) {
                LoggerService.logError(err);
             }
             console.log(nativeResult.rows.length);
            if(nativeResult.rows.length == 0){
              callback(false); 
            }
              callback(true);
        });

    }
}
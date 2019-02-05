 module.exports = {
    DBStore_MySql : function(){
        return sails.getDatastore("db_mysql");
    },

    getClient: function (callback) {
        var query = "SELECT * FROM Client;";
       
        this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
            if (err) {
                ErrorLoggerService.logError(err);
                var res = Message.fail;
                res.reason = err;
                callback(res);   
            }
            callback(nativeResult.rows);

        });

    }
};
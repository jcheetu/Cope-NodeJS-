 module.exports = {
    DBStore_MySql : function(){
        return sails.getDatastore("db_mysql");
    },

    getClient: function (callback) {
        var query = "SELECT * FROM Client;";
       
        this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
            if (err) {
                LoggerService.logError(err);
                var res = Message.fail;
                res.reason = err;
                callback(res);   
            }
            callback(nativeResult.rows);

        });

    },

    registerWidgetClient :function (data, callback) {
        var query ="call RegisterClient('"+data.name+"','"+ data.emailId +"','"+ data.AI+"', '"+ data.accessToken+"','"+data.username+"','"+data.password+"')";
        
        this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
            if (err) {
                LoggerService.logError(data, err);
                var res = Message.fail;
                res.reason = err;
                callback(res);   
            }
            else{
              callback(JSON.stringify(nativeResult.rows[0]));
            }
        });

    }
};
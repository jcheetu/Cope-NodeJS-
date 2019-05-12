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
       console.log("call RegisterClient('"+data.name+"','"+ data.emailId +"','"+ data.AI+"', '"+ data.accessToken+"','"+data.username+"','"+data.password+"')");
        
        this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
            console.log(nativeResult);
            if (err) {
                LoggerService.logError(data, err);
                var res = Message.fail;
                res.reason = err;
                console.log("1");
                callback(res);   
            }
            else{
                console.log(nativeResult.rows[0]);
              callback(JSON.stringify(nativeResult.rows[0]));
            }
        });

    }
};
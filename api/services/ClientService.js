 module.exports = {
    DBStore_MySql : function(){
        return sails.getDatastore("db_mysql");
    },

    getClient: function (callback) {
        var query = "SELECT * FROM Client;";
       
        this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
            if (err) {
                callback(null, err);;
            }
            callback(null, JSON.stringify(nativeResult.rows));

        });

    }
};
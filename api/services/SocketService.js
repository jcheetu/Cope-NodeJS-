module.exports = {
    DBStore_MySql : function(){
        return sails.getDatastore("db_mysql");
    },

     recordUserSocket: function () {
         console.log('socket service');
        // var query = "SELECT * FROM Client;";
       
        // this.DBStore_MySql().sendNativeQuery(query).exec(function (err, nativeResult) {
        //     if (err) {
        //         callback(null, err);;
        //     }
        //     callback(null, JSON.stringify(nativeResult.rows));

        // });

        /**
         * Log Client and User Information in respective Databases
         * 
         */

    },

    AIConnect : function(){
        /**
         * Connect to AI as per Client Config 
         */

    },

    recordUserSocketData : function(){
        /**
         * Save The User Chat Data
         */
    }

};
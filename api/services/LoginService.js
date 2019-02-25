module.exports = {
  db: function() {
    return sails.getDatastore("db_mongo").manager;
  },
  authenticateUser: function(emailId,password, clientId, callback) {
    var collection = this.db().collection("customerSupportUser");
    collection.find({$and : [{email : emailId }, {password : password },{clientID : clientId}]})
        .toArray(function(err, documents) {
            if (err) {
                ErrorLoggerService.logError(err);
                var res = Message.fail;
                res.reason = JSON.stringify(err);
                callback(res);
            };
            ErrorLoggerService.logError(err);
                var res = Message.success;
                res.reason = "User Authenticated";
                callback(res);
        });
           
  }
};

module.exports = {
    getUser: function(callback) {
      User.find().exec(function(err, data) {
        if (err) return callback(err);
        callback(null, JSON.stringify(data));;
        return;
    });
  }
};


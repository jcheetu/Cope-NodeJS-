module.exports = {
    getUser: function(req, res) {
      UserService.getUser(function(error, output) {
       console.log(output);
       return res.send(output);
      });
    }  
}
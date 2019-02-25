module.exports = {
  login: function(req, res) {
    let data = req.allParams();
    
    LoginService.authenticateUser(
      data.emailid,
      data.password,
      function(output) {
        return res.send(output);
      }
    );
  }
};

module.exports = {
    getClient: function(req, res) {
      ClientService.getClient(function(error, output) {
       console.log(output);
       return res.send(output);
      });
    }  
}
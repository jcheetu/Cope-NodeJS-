module.exports = {
    getClient: function(req, res) {
      ClientService.getClient(function(error, output) {
       return res.send(output);
      });
    } ,
    registerWidgetClient : function(req,res){
      let data = req.allParams();
      
      LoggerService.logActivity(data);
      ClientService.registerWidgetClient(data,function(output) {
        return res.send(output);
       });
    }
}
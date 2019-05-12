module.exports = {
    getClient: function(req, res) {
      ClientService.getClient(function(error, output) {
       return res.send(output);
      });
    } ,
    registerWidgetClient : function(req,res){
      console.log("registerWidgetClient");
      let data = req.allParams();
      console.log(data);
      
      LoggerService.logActivity(data);
      ClientService.registerWidgetClient(data,function(output) {
        console.log(output);
        return res.send(output);
       });
    }
}
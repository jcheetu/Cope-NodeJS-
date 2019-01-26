module.exports = {
  create: function(req, res) {
    let data = req.allParams();
    CustomerSupportUserService.create(data,function(output) {
       return res.send(output);
      });
    }  
}
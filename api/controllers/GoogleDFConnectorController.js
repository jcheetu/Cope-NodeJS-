module.exports = {
    //  {
    //     messageId : "",
    //     fromId : "",
    //     toId : "",
    //     Message :"",
    //     socketId : "",
    //     fromCustomer : ""
    //     createdOn : ""
    // }
     
  
    sendRequest: function(req, res) {
      let data = req.allParams();
      GoogleDFConnectorService.sendRequest(
        req,function(output) {
          return res.send(output);
        }
      );
    }
}
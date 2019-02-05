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
     create: function(req, res) {
      
      let data = req.allParams();
      data.createdOn = new Date();
      data.updatedOn = "";
      ChatService.create(data, function(output) {
        return res.send(output);
      });
    },
  
    getChat: function(req, res) {
      let data = req.allParams();
      chatService.getChat(
        data.customerId,
        data.clientID,
        function(output) {
          return res.send(output);
        }
      );
    }
}
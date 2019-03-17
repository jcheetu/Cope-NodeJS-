module.exports = {
    //  {
    //     text : "",
    //     sessionId : "",
    //     accessToken : "",
    //      ai : "",
    // }
    sendRequest: function(req, res) {
      let data = req.allParams();
      AIService.sendRequest(data, function(output) {
        return res.send(output);
      });
    },

}
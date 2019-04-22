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
    loadBot: function(req, res) {
      let data = {};
      data.ai = req.params.ai;
      data.accessToken = req.params.accessToken;
      data.sessionId = req.params.sessionId;
      data.title = req.params.title;
      AIService.sendRequest(data, function() {
        return res.view('chatbot/Bot.ejs', data);
      });
    }

}


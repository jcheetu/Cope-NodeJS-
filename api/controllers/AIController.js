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
    loadDialogueflowBot: function(req, res) {
      console.log(req);
      let data = {};
      data.ai = req.params.ai;
      data.accessToken = req.params.accessToken;
      data.sessionId = req.params.sessionId;
      data.title = req.params.title;


      return res.view('chatbot/dialogueflow/Bot.ejs', data);
      
      // AIService.sendRequest(data, function() {
      //   return res.view('chatbot/Bot.ejs', data);
      // });
    },

    loadWatsonBot: function(req, res) {
      let data = {};
      data.ai = req.params.ai;
      data.accessToken = req.params.accessToken;
      data.username = req.params.username;
      data.password = req.params.password;
      data.title = req.params.title;

      return res.view('chatbot/watson/Bot.ejs', data);

      // AIService.sendRequest(data, function() {
      //   return res.view('chatbot/Bot.ejs', data);
      // });
    }

}


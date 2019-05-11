var AIConnectorService = require("../chatbotAI/AIConnectorService");
module.exports = {

  mysession : AIConnectorService.session(),
  sendRequest: function(reqData, callback) {
    var reqdata = {
      text: reqData.message,
      sessionId: AIConnectorService.session(),
      AI: "dialogueflow"
    };
    
    if (text == "Hi") {
      this.mysession = AIConnectorService.session(true);
    }
    var data = {
      query: text,
      lang: "en",
      sessionId: this.mysession
    };
    AIConnectorService.sendRequest(reqdata, function(output) {
      var responce = output
      if (responce.status["code"] != 200) {
        LoggerService.logError(responce);
        var res = Message.fail;
        res.reason = err;
        callback(res);
      } else {
        callback(responce);
      }
    });
  }
 
};

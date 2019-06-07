// <!DOCTYPE html>
// <html>
//   <head>
//     <title></title>
//   </head>
//   <body>
//         <div id="generic-chat-container" chatbot-title="V J" 
//         access-token="eec1d68cdfa148edb700e7bbfc58b6c0">
//         </div>
//             <script
//             src="url + '/js/chat.loader.js"></script>
 
// </body>
// </html>

var PRODUCTION = {
    url : "https://copebots.herokuapp.com"
}
var DEVELOPMENT = {
    url : "http://localhost:1337"

}
window.environment = DEVELOPMENT

console.log(window.location.hostname);

var url = window.environment.url;
var JavaScriptCode = document.createElement("script");
JavaScriptCode.setAttribute('type', 'text/javascript');
JavaScriptCode.setAttribute("src", url + '/js-org/AI/dialogueflow/widget_allchat.js');

document.getElementById('generic-chat-container').appendChild(JavaScriptCode);

JavaScriptCode = document.createElement("script");
JavaScriptCode.setAttribute('type', 'text/javascript');
JavaScriptCode.setAttribute("src", url + '/js/config/env.js');
document.getElementById('generic-chat-container').appendChild(JavaScriptCode);

var CssCode = document.createElement("link");
CssCode.setAttribute('rel', 'stylesheet');
if(document.getElementById('generic-chat-container').getAttribute("custom-css")== undefined || document.getElementById('generic-chat-container').attr("custom-css")===null){
    document.write("<link rel='stylesheet' type='text/css' href='" + url + "/css/allBot.css' />");
}
else{
    document.write(document.getElementById('generic-chat-container').getAttribute("custom-css"));
}

//document.write("<link rel='stylesheet' type='text/css' href=url + '/css/font-awesome.min.css' />");
document.write("<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>");



window.onload = function() {
    $( "#generic-chat-container" ).chat({
        accessToken : document.getElementById('generic-chat-container').getAttribute("access-token"), //"eec1d68cdfa148edb700e7bbfc58b6c0",
        chatbotTitle : document.getElementById('generic-chat-container').getAttribute("chatbot-title"),
        initialMessage :  document.getElementById('generic-chat-container').getAttribute("initial-message") == (null) || (document.getElementById('generic-chat-container').getAttribute("initial-message") == "" )  ? "Hi" : document.getElementById('generic-chat-container').getAttribute("initial-message") ,
        ai : 'DIALOGUEFLOW'//document.getElementById('generic-chat-container').getAttribute("chatbot-ai")
    }); 
};

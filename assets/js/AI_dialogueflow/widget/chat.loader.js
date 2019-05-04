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
//             src="http://localhost:1337/js/chat.loader.js"></script>
 
// </body>
// </html>

var JavaScriptCode = document.createElement("script");
JavaScriptCode.setAttribute('type', 'text/javascript');
JavaScriptCode.setAttribute("src", 'http://localhost:1337/js/AI_dialogueflow/widget/allchat.js');

document.getElementById('generic-chat-container').appendChild(JavaScriptCode);

CssCode = document.createElement("link");
CssCode.setAttribute('rel', 'stylesheet');
if(document.getElementById('generic-chat-container').getAttribute("custom-css")== undefined || document.getElementById('generic-chat-container').attr("custom-css")===null){
    document.write("<link rel='stylesheet' type='text/css' href='http://localhost:1337/css/allBot.css' />");
}
else{
    document.write(document.getElementById('generic-chat-container').getAttribute("custom-css"));
}

document.write("<link rel='stylesheet' type='text/css' href='http://localhost:1337/css/font-awesome.min.css' />");



window.onload = function() {
    $( "#generic-chat-container" ).chat({
        accessToken : document.getElementById('generic-chat-container').getAttribute("access-token"), //"eec1d68cdfa148edb700e7bbfc58b6c0",
        chatbotTitle : document.getElementById('generic-chat-container').getAttribute("chatbot-title"),
        ai : 'DIALOGUEFLOW'//document.getElementById('generic-chat-container').getAttribute("chatbot-ai")
    }); 
};

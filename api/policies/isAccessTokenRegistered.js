module.exports = async function (req, res, proceed) {
        console.log(AuthAccessTokenService.authoriseAccessToken(req));

        AuthAccessTokenService.authoriseAccessToken(req).then(function (output){
            console.log(output);
            if(output){
                console.log("1");
                 return proceed();
         
             }
             return res.send("Forbidden", 403);
          
        });

 };
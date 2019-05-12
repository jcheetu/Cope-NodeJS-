module.exports = async function (req, res, proceed) {

    if(AuthAccessTokenService.authoriseAccessToken(req)){
        return proceed();

    }
    return res.forbidden();
 };
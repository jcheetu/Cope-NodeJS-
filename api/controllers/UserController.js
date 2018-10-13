module.exports = {
    getUser: function(req, res) {
       return res.send(UserService.getUser(res));
    }
};
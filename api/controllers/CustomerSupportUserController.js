module.exports = {

//   {
//     "clientID" : "123",
//     "customerSupportId" : "2",
//     "customerSuportName" : "VJ2",
//     "email" : "@"
// }
  create: function(req, res) {
    
    let data = req.allParams();
    data.createdOn = new Date();
    data.updatedOn = "";

    CustomerSupportUserService.create(data, function(output) {
      return res.send(output);
    });
  },

  getUser: function(req, res) {
    let data = req.allParams();
    CustomerSupportUserService.getUser(
      data.customerSupportId,
      data.clientId,
      function(output) {
        return res.send(output);
      }
    );
  },

  deleteUser: function(req, res) {
    let data = req.allParams();
    CustomerSupportUserService.deleteUser(
      data.customerSupportId,
      data.clientId,
      function(output) {
        return res.send(output);
      }
    );
  },

//   {
//     "clientID" : "123",
//     "customerSupportId" : "1",
//     "customerSuportName" : "VJ3",
//     "email" : "@@"
// }
  updateUser: function(req, res) {
    let data = req.allParams();
    data.updatedOn = new Date();
    
    CustomerSupportUserService.updateUser(data, function(output) {
      return res.send(output);
    });
  }
};

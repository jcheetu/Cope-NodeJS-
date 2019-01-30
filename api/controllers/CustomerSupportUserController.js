module.exports = {
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
      data.clientID,
      function(output) {
        return res.send(output);
      }
    );
  },

  deleteUser: function(req, res) {
    let data = req.allParams();
    CustomerSupportUserService.deleteUser(
      data.customerSupportId,
      data.clientID,
      function(output) {
        return res.send(output);
      }
    );
  },
  updateUser: function(req, res) {
    let data = req.allParams();
    data.updatedOn = new Date();
    
    CustomerSupportUserService.updateUser(data, function(output) {
      return res.send(output);
    });
  }
};

module.exports = {
    tableName : 'user',
    datastore: 'default',
    attributes: {
      userid:{
          model: 'user'
      },
      firstname:{
          type: 'string'
      },
      lastname:{
          type: 'string'
      },
      gender:{
          type: 'string'
      },
      dob:{
          type: 'string'
      },
      address:{
          type: 'text'
      }
  }
};



// db.createCollection('user'), {capped: true}, {firstname: string,lastname: string,gender:string,dob:date,address:string,email : string}

// db.user.insert(  
//     {  
//         firstname: "Chaitanya",  
//         lastname : "Sharma",
//         gender : "Male",
//         dob: "01/01/1960",
//         email: "admin@beginnersbook.com",
//         address : '' 
//     }  
//  )
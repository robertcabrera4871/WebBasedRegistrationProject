module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      userID: {
        type: Sequelize.STRING(25)
      },
      firstName: {
        type: Sequelize.STRING(25)
      },
      lastName: {
        type: Sequelize.STRING(25)
      },
      dob: {
        type: Sequelize.DATE
      },
      city: {
        type: Sequelize.STRING(25)
      },
      state: {
        type: Sequelize.STRING(25)
      },
      zipCode: {
        type: Sequelize.STRING(8)
      },
      address: {
        type: Sequelize.STRING(25)
      },
      userType: {
        type: Sequelize.STRING(25)
      }
    });
  
    return User;
  };
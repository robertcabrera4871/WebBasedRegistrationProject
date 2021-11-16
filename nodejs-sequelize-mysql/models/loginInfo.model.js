module.exports = (sequelize, Sequelize) => {
    const LoginInfo = sequelize.define("loginInfo", {
      userID: {
        type: Sequelize.STRING(25)
      },
      email: {
        type: Sequelize.STRING(30)
      },
      password: {
        type: Sequelize.STRING(25)
      },
      passwouserType: {
        type: Sequelize.STRING(25)
      },
      status: {
        type: Sequelize.STRING(25)
      },

    });
  
    return LoginInfo;
  };
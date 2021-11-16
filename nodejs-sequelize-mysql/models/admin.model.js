module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
      adminID: {
        type: Sequelize.STRING(25)
      },
      status: {
        type: Sequelize.STRING(25)
      },

    });
  
    return Admin;
  };
module.exports = (sequelize, Sequelize) => {
  const Tuto = sequelize.define("tuto", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tuto;
};
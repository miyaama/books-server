module.exports = (sequelize, DataTypes) => {
  const Collections = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tegs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Collections;
};

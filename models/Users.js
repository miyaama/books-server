module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
    access: {
      type: DataTypes.STRING,
    },
  });

  // Users.associate = (models) => {
  //   Users.hasMany(models.Collections, {
  //     onDelete: "cascade",
  //   });
  // };
  return Users;
};

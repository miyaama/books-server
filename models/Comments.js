module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
    },
    useri: {
      type: DataTypes.INTEGER,
    },
  });

  return Comments;
};

module.exports = (sequelize, DataTypes) => {
  const Collections = sequelize.define("Collections", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    theme: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    itemTypes: {
      type: DataTypes.STRING,
    },
  });

  Collections.associate = (models) => {
    Collections.hasMany(models.Items, {
      onDelete: "cascade",
    });
  };

  return Collections;
};

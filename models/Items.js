module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define("Items", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue("tags")?.split(";") ?? [];
      },
      set(val) {
        this.setDataValue("tags", val.join(";"));
      },
    },
    field: {
      type: DataTypes.STRING,
    },
  });

  Items.associate = (models) => {
    Items.hasMany(models.Comments, {
      onDelete: "cascade",
    });

    Items.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };

  return Items;
};

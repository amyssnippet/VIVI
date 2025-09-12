module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    settings: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    languageSettings: {
      type: DataTypes.JSONB,
      defaultValue: { default: 'en', supported: ['en'] }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'organizations',
    timestamps: true,
    underscored: true
  });

  Organization.associate = function(models) {
    Organization.hasMany(models.User, {
      foreignKey: 'organizationId',
      as: 'users'
    });
    Organization.hasMany(models.Document, {
      foreignKey: 'organizationId',
      as: 'documents'
    });
    Organization.hasMany(models.ChatSession, {
      foreignKey: 'organizationId',
      as: 'chatSessions'
    });
  };

  return Organization;
};

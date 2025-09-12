module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organizations',
        key: 'id'
      }
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    filePath: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fileType: {
      type: DataTypes.STRING(50)
    },
    fileSize: {
      type: DataTypes.INTEGER
    },
    processedStatus: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
      defaultValue: 'pending'
    },
    processedContent: {
      type: DataTypes.TEXT
    },
    extractedData: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    embeddings: {
      type: DataTypes.ARRAY(DataTypes.FLOAT)
    },
    language: {
      type: DataTypes.STRING(10),
      defaultValue: 'en'
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'documents',
    timestamps: true,
    underscored: true
  });

  Document.associate = function(models) {
    Document.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
      as: 'organization'
    });
    Document.belongsTo(models.User, {
      foreignKey: 'uploadedBy',
      as: 'uploader'
    });
  };

  return Document;
};

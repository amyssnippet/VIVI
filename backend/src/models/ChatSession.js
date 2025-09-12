module.exports = (sequelize, DataTypes) => {
  const ChatSession = sequelize.define('ChatSession', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organizations',
        key: 'id'
      }
    },
    sessionName: {
      type: DataTypes.STRING(255),
      defaultValue: 'New Chat'
    },
    language: {
      type: DataTypes.STRING(10),
      defaultValue: 'en'
    },
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'chat_sessions',
    timestamps: true,
    underscored: true
  });

  ChatSession.associate = function(models) {
    ChatSession.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    ChatSession.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
      as: 'organization'
    });
    ChatSession.hasMany(models.ChatMessage, {
      foreignKey: 'sessionId',
      as: 'messages'
    });
  };

  return ChatSession;
};

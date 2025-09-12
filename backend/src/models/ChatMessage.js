module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chat_sessions',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'assistant', 'system'),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    tokens: {
      type: DataTypes.INTEGER
    },
    model: {
      type: DataTypes.STRING(50)
    }
  }, {
    tableName: 'chat_messages',
    timestamps: true,
    underscored: true
  });

  ChatMessage.associate = function(models) {
    ChatMessage.belongsTo(models.ChatSession, {
      foreignKey: 'sessionId',
      as: 'session'
    });
  };

  return ChatMessage;
};

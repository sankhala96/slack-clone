export default (sequlize, DataType) => {
    const Message = sequlize.define('message', {
        text: DataType.STRING
    });

    Message.associate = (models) => {
        Message.belongsTo(models.Channel, {
            foreignKey: {
                name: 'channelId',
                field: 'channel_id'
            }
        });
        Message.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        })
    };

    return Message;
}

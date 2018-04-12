export default (sequlize, DataType) => {
    const Message = sequlize.define('message', {
        text: DataType.STRING
    });

    Message.associate = (models) => {
        Message.belongsTo(models.Channel, {
            foreignKey: 'channelId'
        });
        Message.belongsTo(models.User, {
            foreignKey: 'userId'
        })
    };

    return Message;
}

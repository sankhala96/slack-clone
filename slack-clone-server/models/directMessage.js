export default (sequlize, DataType) => {
    const DirectMessage = sequlize.define('direct_message', {
        text: DataType.STRING
    });

    DirectMessage.associate = (models) => {

        DirectMessage.belongsTo(models.Team, {
            foreignKey: {
                name: 'teamId',
                field: 'team_id',
            }
        });

        DirectMessage.belongsTo(models.User, {
            foreignKey: {
                name: 'receiverId',
                field: 'receiver_id',
            }
        });

        DirectMessage.belongsTo(models.User, {
            foreignKey: {
                name: 'senderId',
                field: 'sender_id',
            }
        })
    };

    return DirectMessage;
}

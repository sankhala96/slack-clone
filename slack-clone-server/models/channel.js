export default (sequlize, DataType) => {
    const Channel = sequlize.define('channel', {
        name: DataType.STRING,
        public: DataType.BOOLEAN
    }, {underscored: true});

    Channel.associate = (models) => {
        Channel.belongsTo(models.Team, {
            foreignKey: {
                name: 'teamId',
                field: 'team_id'
            }
        });

        Channel.belongsToMany(models.User, {
            through: 'channel_member',
            foreignKey: {
                name: 'channelId',
                field: 'channel_id'
            }
        });
    };

    return Channel;
}

const createResolver = (resolver) => {
    const baseResolver = resolver;
    baseResolver.createResolver = (childResolver) => {
        const newResolver = async (parent, args, context, info) => {
            await resolver(parent, args, context, info);
            return childResolver(parent, args, context, info);
        };
        return createResolver(newResolver);
    };
    return baseResolver;
};

// requiresAuth
export default createResolver((parent, args, { user }) => {
    if (!user || !user.id) {
        throw new Error('Not authenticated');
    }
});

export const requiresTeamAccess = createResolver(async (parent, {channelId}, {models, user}) => {
    if (!user || !user.id) {
        throw new Error('Not authenticated');
    }

    const channel = await models.Channel.findOne({where: {id: channelId}});
    const member = await models.Member.findOne({
        where: { teamId: channel.teamId, userId: user.id},
    });
    if (!member) {
        throw new Error("you have to be a member of the team to subscribe to it's message");
    }
});

export const directMessageSubscription = createResolver(async (parent, {teamId, userId}, {models, user}) => {
    if (!user || !user.id) {
        throw new Error('Not authenticated');
    }

    const member = await models.Member.findAll({
        where: {
            teamId,
            [models.sequelize.Op.or]: [{userId}, {userId: user.id}],
        },
    });
    if (member.length !== 2) {
        throw new Error("Something went wrong");
    }
});
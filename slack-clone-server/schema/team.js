export default `
    type Team {
        id: Int!
        name: String!
        members: [User]!
        channels: [Channel!]!
    }
    
    type CreateTeamResponse {
        ok: Boolean!
        team: Team
        errors: [Error!]
    }
    
    type VoidResponse {
        ok: Boolean!
        errors: [Error!]
    }
    
    type Mutation {
        createTeam(name: String!): CreateTeamResponse!
        
        addTeamMember(email: String!, teamId: Int!): VoidResponse!
    }
`;
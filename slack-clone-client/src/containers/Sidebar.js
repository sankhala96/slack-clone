import React from 'react'
import decode from 'jwt-decode'

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';

export default class Sidebar extends React.Component {
    state={
        openAddChannelModal: false
    };

    handleAddChannelClick = () => {
      this.setState({openAddChannelModal: true});
    };

    handleCloseAddChannelModal = () => {
        this.setState({openAddChannelModal: false});
    };

    render(){
        const {teams, team} = this.props;

        let username = '';
        try {
            const token = localStorage.getItem('token');
            const {user} = decode(token);
            username = user.username;
        } catch (err) {}

        return [
            <Teams
                key="team-sidebar"
                teams={teams}
            />,

            <Channels
                key="channels-sidebar"
                teamName={team.name}
                username={username}
                channels={team.channels}
                teamId={team.id}
                users={[{id: 1, name: 'slackbot'}, {id: 2, name: 'user1'}]}
                onAddChannelClick={this.handleAddChannelClick}
            />,
            <AddChannelModal
                teamId={team.id}
                open={this.state.openAddChannelModal}
                onClose={this.handleCloseAddChannelModal}
                key="sidebar-add-channel-model"
            />
        ];
    }
}
import React from 'react'
import decode from 'jwt-decode'

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal'

export default class Sidebar extends React.Component {
    state={
        openAddChannelModal: false,
        openInvitePeopleModal: false
    };

    handleAddChannelClick = () => {
      this.setState({openAddChannelModal: true});
    };

    handleCloseAddChannelModal = () => {
        this.setState({openAddChannelModal: false});
    };

    handleInvitePeopleClick = () => {
        this.setState({openInvitePeopleModal: true});
    };

    handleCloseInvitePeopleModal = () => {
        this.setState({openInvitePeopleModal: false});
    };

    render(){
        const {teams, team} = this.props;
        const {openAddChannelModal, openInvitePeopleModal} = this.state;

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
                onInvitePeopleClick={this.handleInvitePeopleClick}
            />,
            <AddChannelModal
                teamId={team.id}
                open={openAddChannelModal}
                onClose={this.handleCloseAddChannelModal}
                key="sidebar-add-channel-model"
            />,
            <InvitePeopleModal
                teamId={team.id}
                open={openInvitePeopleModal}
                onClose={this.handleCloseInvitePeopleModal}
                key="sidebar-add-channel-model"
            />
        ];
    }
}
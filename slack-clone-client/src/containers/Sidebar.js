import React from 'react'

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import DirectMessageModal from '../components/DirectMessageModal';
import InvitePeopleModal from '../components/InvitePeopleModal'

export default class Sidebar extends React.Component {
    state={
        openAddChannelModal: false,
        openDirectMessageModal: false,
        openInvitePeopleModal: false
    };

    toggleAddChannelModal = (e) => {
        if(e){
            e.preventDefault();
        }
      this.setState(state => ({openAddChannelModal: !state.openAddChannelModal}));
    };

    toggleDirectMessageModal = (e) => {
        if(e){
            e.preventDefault();
        }
        this.setState(state => ({openDirectMessageModal: !state.openDirectMessageModal}));
    };


    toggleInvitePeopleModal = (e) => {
        if(e){
            e.preventDefault();
        }
        this.setState(state => ({openInvitePeopleModal: !state.openInvitePeopleModal}));
    };

    render(){
        const {teams, team, username} = this.props;
        const {openAddChannelModal,openDirectMessageModal, openInvitePeopleModal} = this.state;

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
                isOwner={team.admin}
                users={[{id: 1, name: 'slackbot'}, {id: 2, name: 'user1'}]}
                onAddChannelClick={this.toggleAddChannelModal}
                onDirectMessageClick={this.toggleDirectMessageModal}
                onInvitePeopleClick={this.toggleInvitePeopleModal}
            />,
            <AddChannelModal
                teamId={team.id}
                open={openAddChannelModal}
                onClose={this.toggleAddChannelModal}
                key="sidebar-add-channel-model"
            />,
            <DirectMessageModal
                teamId={team.id}
                open={openDirectMessageModal}
                onClose={this.toggleDirectMessageModal}
                key="sidebar-direct-message-model"
            />,
            <InvitePeopleModal
                teamId={team.id}
                open={openInvitePeopleModal}
                onClose={this.toggleInvitePeopleModal}
                key="sidebar-invite-people-model"
            />
        ];
    }
}
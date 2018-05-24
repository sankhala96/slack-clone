import React from 'react'
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = styled.li`${paddingLeft};`;

const PushLeft = styled.div`${paddingLeft};`;

const Green = styled.span`color: #38978d;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');


const channel = ({id, name}, teamId) => (
    <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
        <SideBarListItem ># {name}</SideBarListItem>
    </Link>
);

const user = ({id, username}, teamId) =>
    <SideBarListItem key={`user-${id}`}>
        <Link to={`/view-team/user/${teamId}/${id}`}>
            <Bubble/>{username}
        </Link>
    </SideBarListItem>;

export default ({
                    teamName,
                    username,
                    channels,
                    users,
                    onAddChannelClick,
                    onDirectMessageClick,
                    teamId,
                    isOwner,
                    onInvitePeopleClick}) => (
    <ChannelWrapper>
        <PushLeft>
            <TeamNameHeader>{teamName}</TeamNameHeader>
            {username}
        </PushLeft>
        <div>
            <SideBarList>
                <SideBarListHeader>
                    Channels
                    {isOwner &&<Icon onClick={onAddChannelClick} name="add circle"/>}
                </SideBarListHeader>
                {channels.map((c) => channel(c, teamId))}
            </SideBarList>
        </div>
        <div>
            <SideBarList>
                <SideBarListHeader>
                    Direct Message
                    <Icon onClick={onDirectMessageClick} name="add circle"/>
                </SideBarListHeader>
                {users.map(u => user(u, teamId))}
            </SideBarList>
        </div>
        <div>
            {isOwner &&<a href="#invite-people" onClick={onInvitePeopleClick}>+ Invite People</a>}
        </div>
    </ChannelWrapper>
)
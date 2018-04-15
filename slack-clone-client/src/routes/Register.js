import React from 'react'
import { Container, Header, Input, Button } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Register extends React.Component{
    state={
      username: '',
      email: '',
      password: ''
    };

    onSubmit = async () => {
        const response = await this.props.mutate({
            variables: this.state
        });

        console.log(response);
    };

    onChange = e => {
        const { name, value} = e.target;

        this.setState({[name] : value})
    };

    render(){
        const {username, email, password} = this.state;

        return(
            <Container text>
                <Header as='h2'>Register</Header>
                <Input fluid onChange={this.onChange} name="username" value={username} placeholder="Username"/>
                <Input fluid onChange={this.onChange} name="email" value={email} placeholder="Email"/>
                <Input type="password" fluid onChange={this.onChange} name="password" value={password} placeholder="Password"/>
                <Button onClick={this.onSubmit}>Submit</Button>
            </Container>
        )
    }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);
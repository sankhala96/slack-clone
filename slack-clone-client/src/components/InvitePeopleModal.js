import React from 'react';
import { Form, Input, Button, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import normalizeErrors from '../normalizeErrors'

const inlineStyle = {
    modal : {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

const InvitePeopleModal = ({
                             open,
                             onClose,
                             values,
                             handleChange,
                             handleBlur,
                             handleSubmit,
                             isSubmitting,
                             touched,
                             errors
                         }) => (
    <Modal open={open} onClose={onClose} style={inlineStyle.modal}>
        <Modal.Header>Add People to your Team</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <Input
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        fluid
                        placeholder="Users email"
                    />
                </Form.Field>
                {touched.email && errors.email ? errors.email[0] : null}
                <Form.Group widths="equal">
                    <Button disabled={isSubmitting} fluid onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
                        Add User
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Content>
    </Modal>
);

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email ,teamId: $teamId) {
        ok
        errors {
            path
            message
        }
    }
  }
`;

export default compose(
    graphql(addTeamMemberMutation),
    withFormik({
        mapPropsToValues: () => ({ email: '' }),
        handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting, setErrors }) => {
            const response = await mutate({
                variables: { teamId, email: values.email },
            });
            const {ok, errors } = response.data.addTeamMember;
            if(ok){
                onClose();
                setSubmitting(false);
            }else {
                setSubmitting(false);
                setErrors(normalizeErrors(errors))
            }

        },
    }),
)(InvitePeopleModal);
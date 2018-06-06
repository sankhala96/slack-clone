import React from 'react'
import { Button, Icon, Input} from 'semantic-ui-react'
import styled from 'styled-components';
import { withFormik } from 'formik';

import FileUpload from './FileUpload'

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
  display: grid;
  grid-template-columns: 5% 95%;
`;

const ENTER_KEY = 13;

const SendMessage = ({
                         placeholder,
                         values,
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         isSubmitting}) => (
    <SendMessageWrapper>
        <FileUpload>
            <Button icon>
                <Icon name="plus" />
            </Button>
        </FileUpload>
        <Input
            onKeyDown = {(e) => {
                if(e.keyCode === ENTER_KEY && !isSubmitting){
                    handleSubmit(e);
                }
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            name="message"
            value={values.message}
            placeholder={`Message # ${placeholder}`}/>
    </SendMessageWrapper>
);


export default withFormik({
        mapPropsToValues: () => ({ message: '' }),
        handleSubmit: async (values, { props: { onSubmit }, setSubmitting, resetForm }) => {
            if(!values.message || !values.message.trim()){
                setSubmitting(false);
                return;
            }

            await onSubmit(values.message);
            resetForm(false);
        },
    })(SendMessage)
import React from 'react'
import Dropzone from 'react-dropzone'

const FileUpload = ({children, disableClick}) => (
    <Dropzone className="ignore" onDrop={() => console.log('file droped')} disableClick={disableClick}>{children}</Dropzone>
);

export default FileUpload
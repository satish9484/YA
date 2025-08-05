import React from 'react';

import { Modal } from 'antd';

const CustomModal = props => {
    const { title, open, onOk, onCancel } = props;

    return (
        <>
            <Modal title={title} open={open} onOk={onOk} onCancel={onCancel} centered>
                {props.children}
            </Modal>
        </>
    );
};

export default CustomModal;

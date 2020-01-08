import React from 'react';

const ModalContext = React.createContext({
    open: false,
    openModal: () => {}
});

export default ModalContext;
import React from 'react';
import Header from './components/Header';

function Layout(props) {
    return (
        <>
            <Header />
            {props.children}
        </>);
}

export default Layout;
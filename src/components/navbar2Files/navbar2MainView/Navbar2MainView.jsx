import React, { useContext } from 'react';
import Navbar2MainViewSection1 from './Navbar2MainViewContainers/Navbar2MainViewSection1';
import Navbar2MainViewLinks from './Navbar2MainViewContainers/Navbar2MainViewLinks';
import { UserContext } from '../../../contexts/userContext/UserContext';
export default function Navbar2MainView(props) {
    const { user } = useContext(UserContext);

    return (
        <div className="navbar2MainView">
            <div className="container">
                <Navbar2MainViewSection1 />
                <Navbar2MainViewLinks {...props} isAuth={user ? true : false} />
            </div>
        </div>
    );
}

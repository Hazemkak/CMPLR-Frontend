import React, { useEffect, useContext } from 'react';
import PagesList from '../../PagesList';
import EmailSection from './EmailSection';
import PasswordSection from './PasswordSection';
import SecuritySection from './SecuritySection';
import FilteringSection from './FilteringSection';
import DeleteSection from './DeleteSection';
import { getUserAccount } from '../../Service';

import { SettingsContext } from '../../../../contexts/settingsContext/SettingsContext';
export default function SettingsAccount() {
    const { setSettings } = useContext(SettingsContext);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        getUserAccount(setSettings, user?.token);
    }, []);

    return (
        <div className="settings">
            <div className="container1">
                <div className="subcontainer">
                    <h2 className="title">Account</h2>
                    <div>
                        <EmailSection />
                        <PasswordSection />
                        <SecuritySection />
                        <FilteringSection />
                        <DeleteSection blogName={user?.userData?.blog_name} />
                    </div>
                </div>
            </div>

            <PagesList />
        </div>
    );
}

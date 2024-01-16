import React from 'react';
import reloadStyle from '../app.module.scss'
const ReloadWaitingPage: React.FC = () => {

    return (
        <div className={reloadStyle.reload}>
            <div>
                <div>Sorry, something went wrong...</div>
                <div>Please wait for 2 seconds, we will be reloading the page.</div>
            </div>
        </div>
    );
}

export default ReloadWaitingPage;
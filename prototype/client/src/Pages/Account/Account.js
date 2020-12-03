import React from 'react';
import { Header, AccountIn } from '../../components'
import { accountObjOne } from './AccountData'

const Account = () => {
    return (
        <> 
            <Header />
            <AccountIn {...accountObjOne} />
        </>
        
    );
};


export default Account;
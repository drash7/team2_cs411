import React,{useState} from 'react';
import { Header, AccountIn } from '../../components'
import { accountObjOne } from './AccountData'

const Account = () => {
    const [account,setAccount]=useState(accountObjOne)
    React.useEffect(()=>{
       setAccount({...accountObjOne,
        topLine: 'Hi #'+window.username+'# ·', 
        description1: `user ID:`+window.userId,
        description2: `email:`+window.email,
        description3: `country:`+window.country})
    },[])
    return (
        <> 
            <Header />
            <AccountIn {...account} />
        </>
        
    );
};


export default Account;
import React from 'react';
import { useGlobalContext } from '../context';
export default function Search(){
    const {searchStr,changeSearchStr} = useGlobalContext(); 
    return (
        <input type='text' 
               value={searchStr} 
               onChange={(e)=>changeSearchStr(e.target.value)}
               className='form-control mb-4' 
               placeholder='Search by name, email or role'
        />
    );
}
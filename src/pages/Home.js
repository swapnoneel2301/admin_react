import React from 'react';
import UserList from '../components/UserList';
import Search from '../components/Search'; 
export default function Home(){
   return (
       <main className='m-5'>
         <Search/>
         <UserList/>
       </main>

   );
}
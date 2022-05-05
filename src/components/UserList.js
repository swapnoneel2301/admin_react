import React ,{useState,useEffect,useRef} from 'react';
import {Table} from 'react-bootstrap';
import User from './User';
import Paginate from './Paginate';
import { useGlobalContext } from '../context';



export default function UserList(){
   const {searchStr,users,fetchUsers,deleteUser,
          searchedUsers,changeSearchedUsers,
          deleteSelectedUsers,
          changeSelectedUsers,
          allSelected,
          setAllSelected} = useGlobalContext();
    const checkboxRef = useRef(null);

   const [currentPage,setCurrentPage] = useState(1);
   const [noOfPages,setNoOfPages] = useState(0);

   
   const noOfUsersPerPage = 10;
   const startIndex = (currentPage-1)*noOfUsersPerPage;
   const endIndex = currentPage*noOfUsersPerPage;
   const usersAtPage = searchedUsers.slice(startIndex,endIndex); // change here
   

   const handleCheck = async(e)=>{
     const isChecked = e.target.checked;
     for(let i=0;i<usersAtPage.length;i++){
         changeSelectedUsers(usersAtPage[i].id,isChecked);
     }
     setAllSelected(isChecked);
   }
   useEffect(()=>{
       fetchUsers();
    },[]);
    
    // when the page changes change the select all checkbox to uncheck.
    useEffect(()=>{
       setAllSelected(false);
    },[noOfPages,currentPage]);

   // to set the current page when it is greater than available pages.
   useEffect(()=>{
      if(noOfPages>0 && currentPage>noOfPages) setCurrentPage(noOfPages);
   },[noOfPages]);

   // whenver real users changes searchedUsers also changes
   useEffect(()=>{
     changeSearchedUsers();
   },[users]); 

   // to set the no of pages.
   useEffect(()=>{
     setNoOfPages(Math.ceil(searchedUsers.length/10));
   },[searchedUsers]);

   // to set the searchedUsers array.
   useEffect(()=>{
      changeSearchedUsers();
   },[searchStr]);

   return (
       <section>
           <Table>
               <thead>
                    <tr>
                        <th><input className="form-check-input" 
                                   type="checkbox" value=""
                                   onChange={handleCheck}
                                   ref={checkboxRef}
                                   checked={allSelected?'checked':''}
                        />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
               </thead>
               <tbody>                    
                    {
                        usersAtPage.map((user)=>{
                            const {id,name,email,role}=user;
                            return <User key={id} {...{id,name,email,role,deleteUser}}/>
                        })
                    }
                </tbody>
           </Table>
           <button type="button" className="btn btn-danger mb-3" align="right" onClick={deleteSelectedUsers}>Delete Selected</button>
           <Paginate {...{noOfPages,currentPage,setCurrentPage}}/>
       </section>
   );
}
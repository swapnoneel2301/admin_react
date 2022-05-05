import React,{useState,useContext} from 'react';

const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
const AppContext = React.createContext();

const AppProvider = ({children})=>{

   const [users,setUsers] = useState([]);
   const [searchStr,setSearchStr] = useState('');
   const [searchedUsers,setSearchedUsers] = useState([]);
   const [selectedUsers,setSelectedUsers] = useState({});
   const [allSelected,setAllSelected] = useState(false);

   const fetchUsers = async()=>{
       const resp = await fetch(url);
       const data = await resp.json();
       setUsers(data);
   }

   const deleteUser = (id)=>{
      const newUsers = users.filter((user)=>{   
          return user.id!==id;
      });
      setUsers(newUsers);
   }

   const editUser = (id,name,email,role)=>{
            const newUsers = users.map((user)=>{
                if(user.id===id){
                  return {id,name,email,role};
                }
                return user;
            });
            setUsers(newUsers);
   }
   
   const changeSelectedUsers =  (id,isChecked)=>{
          setSelectedUsers((prevSelectedUsers)=>{
              return {...prevSelectedUsers,[id]:isChecked};
          });
   }
   const deleteSelectedUsers = ()=>{
         const newUsers = users.filter(({id})=>{
            return !selectedUsers[id];
         });
         setUsers(newUsers);
   }
   const changeSearchStr = (newSearchStr)=>{
        setSearchStr(newSearchStr);
   }

   const changeSearchedUsers = ()=>{
     const newSearchedUsers =  users.filter(({name,email,role})=>{
          name=name.toLowerCase();
          email=email.toLowerCase();
          role=role.toLowerCase();
           return (name.includes(searchStr)||
                   email.includes(searchStr)||
                   role.includes(searchStr));
       });
       setSearchedUsers(newSearchedUsers);
   }

   return <AppContext.Provider value={{
                            searchStr,
                            changeSearchStr,
                            users,
                            fetchUsers,
                            deleteUser,
                            editUser,
                            selectedUsers,
                            changeSelectedUsers,
                            allSelected,
                            setAllSelected,
                            deleteSelectedUsers,
                            searchedUsers,
                            changeSearchedUsers,
                            }}>
           {children}
   </AppContext.Provider>   
}

const useGlobalContext = ()=>{
    return useContext(AppContext);
}
export {AppContext,AppProvider,useGlobalContext};





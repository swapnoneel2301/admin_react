import React,{useRef} from 'react';
import {AiFillDelete} from 'react-icons/ai';
import Edit from './Modal';
import { useGlobalContext } from '../context';

export default function User({id,name,email,role,deleteUser}){
    const {selectedUsers,changeSelectedUsers} = useGlobalContext();
    const userRef = useRef();
    // const [isChecked,setIsChecked] = useState(allSelected || !!selectedUsers[id]);
    
    const handleCheck = (e)=>{
        if(e.target.checked){
            userRef.current.classList.add('bg-secondary');
            userRef.current.classList.add('text-white');
        }else{
            userRef.current.classList.remove('bg-secondary');
            userRef.current.classList.remove('text-white');
        }
         changeSelectedUsers(id,e.target.checked);
    }
    return <tr ref={userRef} className={`${!!selectedUsers[id]?'bg-secondary text-white':''}`}>
        <td><input className='form-check-input' type="checkbox" 
                   value=""
                   checked={!!selectedUsers[id]?'checked':''}
                   onChange={handleCheck}
                   />
        </td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td>
                <Edit id={id}/>
                <AiFillDelete style={{cursor:'pointer'}} onClick={()=>deleteUser(id)}/>
        </td>
    </tr>
}
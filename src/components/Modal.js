import React , {useEffect, useState}from 'react';
import {Button,Modal} from 'react-bootstrap';
import {AiOutlineEdit} from 'react-icons/ai';
import { useGlobalContext } from '../context';
// taken from bootstrap
export default function ModalComponent({id}) {
  const {users,editUser} = useGlobalContext();

  const [show, setShow] = useState(false);
  const [details,setDetails] = useState({name:'',email:'',role:''});

  const handleClose = () => setShow(false);
  const handleShow = () =>  setShow(true);
  const handleEdit = ()=>{
      const {name,email,role} = details;
      editUser(id,name,email,role);
      handleClose();
  }

  useEffect(()=>{
      if(show){
         for(let i=0;i<users.length;i++){
             if(users[i].id===id){
                const {name,email,role} = users[i];
                setDetails({name,email,role});
             }
         }
      }
  },[show]);

  return (
    <> 
      <AiOutlineEdit onClick={handleShow} className="mx-3" style={{cursor:'pointer'}} />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
            <label className='mb-2' htmlFor='name'>Name</label>
            <input  type='text' 
                    id='name' className='form-control' placeholder='Name' 
                    value={details.name}
                    onChange={(e)=>{setDetails({...details,name:e.target.value})}}
            />
            <label className='mb-2' htmlFor='email' >Email</label>
            <input type='email' 
                   id='email' className='form-control' placeholder='Email' 
                   value={details.email}
                   onChange={(e)=>{setDetails({...details,email:e.target.value})}}
            />
            <label className='mb-2' htmlFor='role' >Role</label>
            <input type='text' 
                   id='role' className='form-control' placeholder='Role' 
                   value={details.role}
                   onChange={(e)=>{setDetails({...details,role:e.target.value})}}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Propage.css'
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../action/uploadAction';
import {useParams} from 'react-router-dom'
import { updateUser } from '../../action/userAction';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const Modal_edit = ({profileUserId, data, show}) => {
    const dispatch = useDispatch();
    const params = useParams();
    console.log(show)
    const [open, setOpen] = useState(false);
    useEffect(()=>setOpen(show),[show])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {password, ...other} = data;

    const imageRef = useRef();
    const [image, setImage] = useState(null)
    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
          let img= event.target.files[0];
          setImage(img)
        }
    }

    const [formData, setFormData] = useState(other)

    const handleChange = (e) => {
       setFormData({...formData, [e.target.name] : e.target.value})
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = formData;
        if(image) {
          const data = new FormData()
          const imgName = image.name
          let i=0;
          let l=imgName.length;
          while(1) {
            if(i>=l) {
                break;
            }
            if(imgName[i]=='.')  {
                var del_str = imgName.substring(i, l);
                var newImg = imgName.replace(del_str, "");
                break;
            }
            i++
          }
          const f_name = newImg + Date.now()
          const filename = f_name.concat(del_str);

          data.append("name", filename)
          data.append("file", image)
          userData.profilePicture = filename

          try {
            dispatch(uploadImage(data))
          } catch (err) {
            console.log(err)
          }
        }
        dispatch(updateUser(profileUserId, userData))
        // console.log(userData)
        setOpen(false)
    }

  return (
    <>
    { (profileUserId===data._id) ? <Button onClick={handleOpen} className='edit_btn' ><a>Edit</a></Button> : '' }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal_box">
          <div className="edit_profile w-full">
           <h1 className='flex justify-center text-2xl'>Update Your Details</h1> 
           {image? 
           <>
             <img className="pr_dpro relaive h-32 w-32 mt-10 rounded-full" src={URL.createObjectURL(image)} />
             <a className='text-blue-600 text-xl cursor-pointer' onClick={()=>imageRef.current.click()} >Change Profile Picture</a>
             </>
             : 
             <a className='text-blue-600 text-xl cursor-pointer' onClick={()=>imageRef.current.click()} >Upload Profile Picture</a>
          }
           <input type="file" className='hidden' ref={imageRef} onChange={onImageChange} />
          
           <div className="edit_info w-full flex flex-col">
            <span className='w-full py-2'>
             <input type="text" className='edit_input w-1/3' placeholder='First Name' name="firstname" value={formData.firstname} onChange={handleChange} />
             <input type="text" className='edit_input w-1/3' placeholder='Last Name' name="lastname" value={formData.lastname} onChange={handleChange} />
            </span>
           
            <span className='w-full py-2'>
            <input type="text" className='edit_input w-1/3' placeholder='Works at' name="worksat" value={formData.worksAt} onChange={handleChange} />
            <input type="text" className='edit_input w-1/3' placeholder='Your E-mail' name="email" value={formData.email} onChange={handleChange} />
            </span>

            <span className="w-full py-2">
              <input type="text" className="edit_input bio_input w-2/3" placeholder="username" name="username" value={formData.username} onChange={handleChange} />
            </span>
            <span className="w-full py-2">
              <input type="text" className="edit_input bio_input w-2/3" placeholder="About you" name="about" value={formData.about} onChange={handleChange} />
            </span>

             <botton className="mt-5 bg-blue-600 text-white w-28 h-12 flex justify-center rounded-lg align-middle cursor-pointer" onClick={handleSubmit} >Submit</botton>
           </div>

          </div>


        </Box>
      </Modal>
    </>
  )
}

export default Modal_edit

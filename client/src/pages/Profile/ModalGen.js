
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Propage.css'

import { Configuration, OpenAIApi } from "openai";

// key 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

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

const ModalGen = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const configuration = new Configuration({
        // organization: "org-68BNxJknw2NLoaFhFRYijxlz",
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    // const response = await openai.listEngines();

    const [userPrompt, setUserPrompt] = useState("");
    const [num, setNum] = useState(1);
    const [size, setSize] = useState("256x256");
    const [imgUrl, setImgUrl] = useState("")

    const generateImage = async(e) => {
        e.preventDefault()
        const imageParameter = {
            prompt : userPrompt,
            n: parseInt(num),
            size: size,
        }
        const response = await openai.createImage(imageParameter)
        console.log(response)
        const urlData = response.data.data[0].url;
        setImgUrl(urlData)
    }

    


  return (
      <>
      <Button onClick={ !open ? handleOpen : handleClose } className='h-full'><a href="#" className='text-violet-900 bg-yellow-400 font-semibold rounded-lg px-5 h-full'>Generate Image</a></Button>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style} className="modal_box rounded-2xl flex flex-col !w-3/5 relative">
            {imgUrl ? <img src={imgUrl} alt="" /> : <></> }
            <textarea className='img_gen my-5 h-1/4 resize-y overflow-auto' type="text" placeholder='Description' name="Description" value={userPrompt} onChange={(e)=>setUserPrompt(e.target.value)} />
            <input className='img_gen my-5' type="text" placeholder='Amount' name="" value={num} onChange={(e)=>setNum(e.target.value)} />
            <input className='img_gen my-5' type="text" placeholder='size' value={size} onChange={(e)=>setSize(e.target.value)} />
            <button onClick={generateImage} className='w-[100px] bg-violet-600 py-2 px-5 rounded-md hover:bg-slate-500 hover:text-white transition duration-300'>Generate</button>
         </Box>
      </Modal>

      </>
  )
}

export default ModalGen

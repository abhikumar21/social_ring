import express from 'express'
import multer from 'multer'
import { unlink } from 'node:fs';



const router = express.Router()
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "public/image");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({storage: storage})

router.post('/', upload.single("file", (req, res) => {
    try {
        return res.status(200).json("file uploaded successfully")
    } catch (error) {
        console.log(error)
    }
}))


router.delete('/delete', (req, res) => {
    const {name} = req.body;
    const filepath = `public/image/${name}`;
    // console.log("hello")
    unlink(filepath, (err)=> {
        if (err) {
            console.log(err);
            return res.status(500).json('Failed to delete file');
        }
        return res.status(200).json('File deleted successfully');
    })
})

export default router;
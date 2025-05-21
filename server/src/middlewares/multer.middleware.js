import multer from "multer";

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'/upload')
    },
    filename:function (req,file,cb){
    cb(null,`${Date.now()}-${file.filename}`)
    }
})

export const upload=multer({
    storage,limits:{
        fileSize:5*1024*1024
    }
})

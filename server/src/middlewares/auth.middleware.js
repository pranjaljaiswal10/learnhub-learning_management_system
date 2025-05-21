

const authVerify=async (req,res,next) => {
    try {
     const token=req.cookies || req.header("authorization").replace("Bearer","")
     if(!token)
        {
       res.status(401).json({success:false,message:"Invalid access token"})
        }   
    } catch (error) {
     res.status(500).json({message:""})
    }
}

export default authVerify;
const asyncHandler = (requestHandler) =>{
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).cathch((err) => next(err))
    }
}






export {asyncHandler}

/*const asyncHandler = (fn) => async(req,res,next) => {
    try{
        await fn(req,res,next)
    }catch(error){
        res.status(error.code || 500)
        SUCCESS: false,
        message: error.message
    }
}*/
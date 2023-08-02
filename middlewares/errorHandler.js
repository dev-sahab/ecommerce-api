// error Handler Middleware
const errorHandler = (error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || 'Internal Server Error'; 
    return res.status(errorStatus).json({
        name : error.name,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    })
}

// export 
export default errorHandler;
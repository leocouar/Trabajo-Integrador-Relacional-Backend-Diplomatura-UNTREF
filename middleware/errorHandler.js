function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    let message;

    if (statusCode >= 400 && statusCode < 500) {
        message = err.message || "Hubo un error con tu solicitud";
    } else if (statusCode >= 500) {
        message = "Error interno del servidor";
    }
    console.error(err);
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message
    });
}

export default errorHandler;

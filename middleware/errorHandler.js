function errorHandler(err, req, res, next) {
    // Determina el código de estado: usa 500 como predeterminado si no se especifica
    const statusCode = err.status || 500;
    let message;

    // Clasifica el error en función del código de estado
    if (statusCode >= 400 && statusCode < 500) {
        message = err.message || "Hubo un error con tu solicitud"; // 400s: Errores del cliente
    } else if (statusCode >= 500) {
        message = "Error interno del servidor"; // 500s: Errores del servidor
    }

    // Opcional: muestra el error en la consola para depuración
    console.error(err);

    // Responde con el error en formato JSON
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        // Solo incluir el stack en desarrollo
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
}

export default errorHandler;

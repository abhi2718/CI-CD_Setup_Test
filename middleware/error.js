exports.handleError = (error, req, res, next) => {
    const statusCode = error?.status || 500;
    res.status(statusCode).json({
        success: false,
        message: error.message
    });
}

module.exports = exports;
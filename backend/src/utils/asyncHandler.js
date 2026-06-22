const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await Promise.resolve(fn(req, res, next));
    } catch (error) {
        next(error);
    }
};

module.exports = asyncHandler;
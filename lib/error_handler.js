module.exports = (err, req, res, next) => {
    if (typeof (err) === 'string') {
        return res.status(400).json({ result: false, message: err });
    }

    return res.status(500).json({ result: false, message: err.message });
};
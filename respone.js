const respone = (status, data, message, res) => {
    res.status(status).json({
        data: data,
        status: status,
        message: message,
        page: {
            prev: "",
            next: "",
            curr: ""
        }
    })
}

module.exports = respone
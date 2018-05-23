const verifyAuthToken = (request, response, next)=>{
    if(request.headers.authorization) {
        const token = request.headers.authorization.split(' ')[1];
        request.token = token;
        next();
    } else {
        response.sendStatus(401);
    }
}

module.exports = verifyAuthToken;
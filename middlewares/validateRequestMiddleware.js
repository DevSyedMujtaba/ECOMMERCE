
// Function for validating Requests
const validateRequest = (schema, property) => {
    return (req, res, next) => {
        const {error} = schema.validate(req[property]);
        if(error){
            return res.status(422).json({ error: error.details[0].message });
        }
        next();
    }
};

module.exports = {
    validateRequest,
}
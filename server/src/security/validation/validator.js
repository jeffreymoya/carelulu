const {checkSchema} = require("express-validator")
const validator = (rules) => {
    return async (parent, args, context, info) => {
        const validationChain = checkSchema(rules);

        const req = { body: args, method: info.operation.operation, path: info.fieldName };
        const result = await validationChain.run(req);
        if (result.length > 0) {
            const errors = result.map((err) => err.isEmpty() ? '' : err.context.message).filter(e => e !== '')
            if(errors.length > 0) {
                return new Error(`Validation failed: ${errors.join(', ')}`);
            }
        }

        return true;
    }
}
module.exports = validator
const { inputValidation } = require('express-validator');
const { rule } = require('graphql-shield');
const validator = require("./validator")

const validateUsersQuery = rule()((parent, args, context, info) => {
    return true;
});

const validateUserQuery = rule()(validator({
    id: {
        in: ['args'],
        errorMessage: 'User ID is required',
        isInt: true,
        notEmpty: true,
    },
}));

module.exports = {
    validateUsersQuery,
    validateUserQuery,
};
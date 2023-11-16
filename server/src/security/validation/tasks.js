const { rule } = require('graphql-shield');
const validator = require("./validator")

const validateCreateTaskInput = rule()(validator({
    name: {
        in: ['body'],
        exists: true,
        errorMessage: 'Name is required and should be a string',
        isString: true,
        notEmpty: true,
    },
    userId: {
        in: ['body'],
        exists: true,
        errorMessage: 'User ID is required',
        isInt: true,
        notEmpty: true,
    },
}));

const validateUpdateTaskInput = rule()(validator({
    id: {
        in: ['body'],
        exists: true,
        errorMessage: 'Task ID is required',
        isInt: true,
        notEmpty: true,
    },
    name: {
        in: ['body'],
        exists: true,
        errorMessage: 'Name is required',
        isString: true,
        notEmpty: true,
    },
    done: {
        in: ['body'],
        exists: true,
        errorMessage: 'Done status is required',
        isBoolean: true,
        notEmpty: true,
    },
}));

const validateDeleteTaskInput = rule()(validator({
    id: {
        in: ['body'],
        exists: true,
        errorMessage: 'Task ID is required',
        isInt: true,
        notEmpty: true,
    },
}));

module.exports = {
    validateCreateTaskInput,
    validateUpdateTaskInput,
    validateDeleteTaskInput,
};
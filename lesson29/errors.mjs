

export const ERROR_CODES = {
    INVALID_PARAMETER_CODE: 1,
    TASK_NOT_FOUND_CODE: 2,
    TASK_NOT_FOUND_CODE: 3,
    USER_NOT_FOUND_CODE: 20,
    PASSWORDS_DO_NOT_MATCH: 20,
}



export default {
    INVALID_PARAMETER: (argName, description) => {
        return {
            code: ERROR_CODES.INVALID_PARAMETER_CODE,
            message: `Invalid argument ${argName}`,
            description: description
        }
    },
    USER_NOT_FOUND: () => {
        return {
            code: ERROR_CODES.USER_NOT_FOUND_CODE,
            message: `User not found`
        }
    },
    TASK_NOT_FOUND: (idTask, message) => {
        return {
            code: ERROR_CODES.TASK_NOT_FOUND_CODE,
            message: `Task with id ${idTask} not found`,
            description: message
        }
    },
    PASSWORDS_DO_NOT_MATCH: (message) => {
        return {
            code: ERROR_CODES.PASSWORDS_DO_NOT_MATCH,
            message: `Passwords do not match`,
            description: message
        }
    }

}
export default {
    USER_NOT_FOUND: () => { 
        return {
            errorCode: 1,
            description: "User not found"
        }
    },
    INVALID_PARAMETER: (paramName) => { 
        return {
            errorCode: 1,
            description: `Invalid parameter ${paramName}`
        }
    },
}
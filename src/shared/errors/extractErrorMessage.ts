export const extractErrorMessage = (errorResponse: any): any => {
    if (Array.isArray(errorResponse)) {
        // If the message is an array, join the messages
        return errorResponse.map((e: string) => `${e}.`).join(' ');
    } else if (typeof errorResponse === 'string') {
        return errorResponse;
    }
};
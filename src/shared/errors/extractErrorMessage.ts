export const extractErrorMessage = (errorResponse: any): any => {
    console.log(errorResponse);
    if (Array.isArray(errorResponse)) {
        // If the message is an array, join the messages
        return errorResponse.map((e: string) => `${e}.`).join(' ');
    } else if (typeof errorResponse === 'string') {
        return errorResponse;
    }
};
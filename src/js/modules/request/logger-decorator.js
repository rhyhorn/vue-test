import {addLeadingZero} from '../helpers';

const getTimeStamp = () => {
    const date = new Date();

    const parts = {
        hours: addLeadingZero(date.getHours()),
        minutes: addLeadingZero(date.getMinutes()),
        seconds: addLeadingZero(date.getSeconds()),
    };

    return `[${parts.hours}:${parts.minutes}:${parts.seconds}]`;
};

export const loggerDecorator = (request) => {
    const targetFunction = request.make;

    request.make = function (...args) {
        const [url, params = null] = args;
        const method = params === null
            ? 'GET'
            : params.method || 'GET';

        console.groupCollapsed(getTimeStamp(), `=> request ${method}: '${url}'`);
        console.log(`url: ${url}`);
        if (params !== null) {
            console.log('params:', params);
        }
        console.groupEnd();

        return targetFunction.apply(request ,args)
            .then((response) => {
                console.groupCollapsed(getTimeStamp(), `<= response ${method}: '${url}'`);
                console.log('data: ', response);
                console.groupEnd();

                return response;
            });
    };

    return request;
};

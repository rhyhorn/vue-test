export const cachingDecorator = (request, cachingTime = 200) => {
    let lastResponse = null;
    let lastRequestTime = null;

    const targetFunction = request.make;

    request.make = function (...args) {
        if (lastResponse !== null
            && ((Date.now() - lastRequestTime) > cachingTime)
        ) {
            return lastResponse;
        }

        lastResponse = targetFunction.apply(request, args);
        lastRequestTime = Date.now();

        return lastResponse;
    }
};

const DEFAULT_SEPARATOR = '.';

export default class Registry {
    constructor(startValue = {}, options = {}) {
        const {separator = DEFAULT_SEPARATOR} = options;

        this.registry = startValue;
        this.separator = separator;
    }

    get(path, defaultValue = undefined) {
        if (path === undefined) {
            return this.registry;
        }

        const result = path.split(this.separator)
            .reduce((currentBlock, part) => {
                if (currentBlock === undefined
                    || currentBlock[part] === undefined
                ) {
                    return undefined;
                }
                currentBlock = currentBlock[part];

                return currentBlock;
            }, this.registry);

        return (result === undefined)
            ? defaultValue
            : result;
    }

    set(path, value) {
        let currentBlock = this.registry;
        const parts = path.split(this.separator);

        parts.map((part, index) => {
            if ((parts.length - 1) === index) {
                currentBlock[part] = value;

                return;
            }

            if (currentBlock[part] === undefined) {
                currentBlock[part] = {};
            }

            currentBlock = currentBlock[part];
        });
    }
}
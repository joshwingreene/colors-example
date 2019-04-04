import SavedColorSchema from './SavedColorSchema';

const Realm = require('realm');

const realm = new Realm({ schema: [SavedColorSchema] });

export const ImmutableRealm = (func, option = {}) => {
    const defaultCopy = (item) => JSON.parse(JSON.stringify(item));
    const copy = option.copy || defaultCopy; // use deep copy
    const success = option.success || true;
    const fail = option.fail || false;

    const defaultErrorHandler = (e) => e;
    const errorHandler = option.errorHandler || defaultErrorHandler;
    return (props) => new Promise((resolve, reject) => {
        try {
            const result = func(props, realm) || 'Return is null';
            const copiedResult = copy(result);
            resolve({ status: success, data: copiedResult });
        } catch (e) {
            const error = errorHandler(e);
            reject({ status: fail, error });
        }
    });
};

export default realm;
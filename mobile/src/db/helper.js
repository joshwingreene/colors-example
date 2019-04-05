import SavedColorSchema from './SavedColorSchema';

const Realm = require('realm');

const realm = new Realm({ schema: [SavedColorSchema] });

export const ImmutableRealm = (func, option = {}) => { // From https://github.com/realm/realm-js/issues/141#issuecomment-272608414
    const defaultCopy = (item) => JSON.parse(JSON.stringify(item));
    const copy = option.copy || defaultCopy; // use deep copy
    const success = option.success || true;
    const fail = option.fail || false;

    const defaultErrorHandler = (e) => e;
    const errorHandler = option.errorHandler || defaultErrorHandler;
    return (props) => new Promise((resolve, reject) => {
        try {
            let result = func(props, realm) || null; // null if nothing or undefined is returned by the func
            console.log('ImmutableRealm - result -', result);
            let copiedResult = null;
            if (result) {
                if (result.length) {
                    console.log('ImmutableRealm - result IS a list');
                    // Create and return list
                    let resultArray = [];
                    for (let item of result) {
                        resultArray.push(copy(item));
                    }
                    copiedResult = resultArray;
                } else {
                    console.log('ImmutableRealm - result IS NOT a list');
                    // Copy object as usual
                    copiedResult = copy(result);
                }
            } else {
                copiedResult = copy(result);
            }
            resolve({ status: success, data: copiedResult });
        } catch (e) {
            const error = errorHandler(e);
            reject({ status: fail, error });
        }
    });
};

export default realm;
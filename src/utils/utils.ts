export const generateId = () => Date.now();

export const isEmpty = (obj: any) => {
    if (!obj) return true;
    if (obj instanceof Array) return obj.length === 0;
    if (typeof obj === 'object') {
        return Object.keys(obj).length === 0;
    }
    return false;
};
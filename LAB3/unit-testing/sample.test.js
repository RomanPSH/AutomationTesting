import * as util from './sample.js'

describe('Array push', () => {
    test('додає елемент в кінець масиву', () => {
        const arr = [1, 2, 3];
        util.push(arr, 4);
        expect(arr).toEqual([1, 2, 3, 4]);
    });
    test('повертає нову довжину масиву', () => {
        const arr = [1, 2, 3];
        expect(util.push(arr, 4)).toBe(4);
    });
    test('додає undefined в кінець масиву', () => {
        const arr = [1, 2, 3];
        util.push(arr, undefined);
        expect(arr).toEqual([1, 2, 3, undefined]);
    });
    test('додає об\'єкт в кінець масиву', () => {
        const arr = [1, 2, 3];
        util.push(arr, {key: 'value'});
        expect(arr).toEqual([1, 2, 3, {key: 'value'}]);
    });
    test('додає елемент в пустий масив', () => {
        const arr = [];
        util.push(arr, 1);
        expect(arr).toEqual([1]);
    });
});


describe('Array pop', () => {
    test('видаляє елемент в кінці масиву', () => {
        const arr = [1, 2, 3];
        util.pop(arr);
        expect(arr).toEqual([1, 2]);
    });
    test('повертає видалений елемент', () => {
        const arr = [1, 2, 3];
        expect(util.pop(arr)).toBe(3);
    });
    test('повертає undefined', () => {
        const arr = [];
        expect(util.pop(arr)).toBe(undefined);
    });
    test('змінює довжину масиву', () => {
        const arr = [1, 2, 3, 4];
        util.pop(arr);
        expect(arr.length).toBe(3);
    });
    test('працює з масивом у якому є об\'єкти', () => {
        const arr = [1, 2, 3, {key: 'value'}];
        expect(util.pop(arr)).toEqual({key: 'value'});
    });
})


describe('Array shift', () => {
    test('видаляє елемент на початку масиву', () => {
        const arr = [1, 2, 3];
        util.shift(arr);
        expect(arr).toEqual([2, 3]);
    });
    test('повертає видалений елемент', () => {
        const arr = [1, 2, 3];
        expect(util.shift(arr)).toBe(1);
    });
    test('повертає undefined', () => {
        const arr = [];
        expect(util.shift(arr)).toBe(undefined);
    });
    test('змінює довжину масиву', () => {
        const arr = [1, 2, 3, 4];
        util.shift(arr);
        expect(arr.length).toBe(3);
    });
    test('працює з масивом у якому є об\'єкти', () => {
        const arr = [{key: 'value'}, 1, 2, 3];
        expect(util.shift(arr)).toEqual({key: 'value'});
    });
})
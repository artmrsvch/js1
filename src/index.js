/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array)
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArray = new Array;

    for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i, array))
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    if (initial === undefined) {
        initial = array[0];
        for (let i = 1; i < array.length; i++) {
            initial = fn(initial, array[i], i, array)
        }

        return initial;
    }
    for (let i = 0; i < array.length; i++) {
        initial = fn(initial, array[i], i, array)
    }

    return initial;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arr = new Array;

    // eslint-disable-next-line guard-for-in
    for (let name in obj) {
        arr.push(name.toUpperCase())
    }

    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let newArr = array.concat();

    if (Math.sign(from) < 0 && Math.sign(to) > 0) {
        let red = array.length - to

        for (let i = 0; i < red; i++) {
            newArr.pop();
        }
        let reg = Math.abs(from) - red
        let deg = newArr.length - reg

        for (let i = 0; i < deg; i++) {
            newArr.shift();
        }
    }
    function er() {
        for (let i = 0; from > i; i++) {
            newArr.shift();
        }

        return newArr;
    }
    if (Math.sign(to) < 0) {
        if (Math.sign(from) < 0 && Math.sign(to) < 0) {
            let resultNeg = array.length - Math.abs(from);

            for (let i = 0; i < resultNeg; i++) {
                newArr.shift();
            }
            if (from == to) {
                newArr.length = 1
            } else {
                for (let i = 0; i < Math.abs(to); i++) {
                    newArr.pop();
                }
            }
        } else {
            er();
            for (let i = 0; i < Math.abs(to); i++) {
                newArr.pop();
            }

            return newArr
        }
    }

    if (arguments.length < 3) {     
        if (Math.sign(from) < 0) {
            let resultNeg = array.length - Math.abs(from);

            for (let i = 0; i < resultNeg; i++) {
                newArr.shift();
            }
        }
        er();
    } else {                                               
        let result = to - from;

        er();
        let difference = newArr.length - result;

        for (let i = 0; i < difference; i++) {
            newArr.pop();
        }
    }

    return newArr
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};

/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise((resolved) => setTimeout(resolved, seconds * 1000))
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise((resolved) => {
        const xhr = new XMLHttpRequest(),
            url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
        
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('load', ()=> {
            const towns = JSON.parse(xhr.responseText)
            const townsSort = towns.sort((a, b) => a.name > b.name ? 1 : -1)
            
            resolved(townsSort);
        })

    })
}

export {
    delayPromise,
    loadAndSortTowns
};

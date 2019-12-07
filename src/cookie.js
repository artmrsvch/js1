/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
 
function cookieObj () { 
    let temp = document.cookie.split('; ').reduce((prev, current)=> {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {})

    return temp;
}

function isMatching (key, chunk, valKey) {

    key = key.toLowerCase();
    chunk = chunk.toLowerCase();
    valKey = valKey.toLowerCase();
    if (key.includes(chunk) || valKey.includes(chunk)) {
        return true;
    }
}

listTable.addEventListener('click', (e)=> {
    if ( e.target.tagName == 'BUTTON') {
        const parents = e.target.parentNode.parentNode;

        document.cookie = `${parents.childNodes[0].textContent}=${parents.childNodes[1].textContent}; max-age = -3600`;
        parents.remove();

    }
})

function addTemp () {
    let cooc = cookieObj ();

    // eslint-disable-next-line guard-for-in
    for (let item in cooc) { 
        const tr = document.createElement('tr');

        tr.innerHTML = `<th>${item}</th><th>${cooc[item]}</th><th><button>удоли</button></th>`;
        listTable.appendChild(tr)    
    }
}
addTemp ()

filterNameInput.addEventListener('keyup', function() {
    let cooc = cookieObj ();

    listTable.innerHTML = '';
    for (let key in cooc) {
        if (filterNameInput.value == '') {
            break;
        } else if (isMatching(key, filterNameInput.value, cooc[key])) {
            const tr = document.createElement('tr');

            tr.innerHTML = `<th>${key}</th><th>${cooc[key]}</th><th><button>удоли</button></th>`;
            listTable.appendChild(tr) 
        }
    }
    if (filterNameInput.value == '') {
        addTemp ()
    }
});

addButton.addEventListener('click', () => {
    let cooc = cookieObj ();

    for (let tik in cooc) {
        if (addNameInput.value == tik) {
            for (let yzel of listTable.childNodes) {
                if (yzel.childNodes[0] == undefined) {
                    continue
                } else if (yzel.childNodes[0].textContent == tik) {
                    yzel.remove()
                }
            }
        }    
    }
    if (isMatching(addNameInput.value, filterNameInput.value, addValueInput.value)) {
        
        const tr = document.createElement('tr');

        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        tr.innerHTML = `<th>${addNameInput.value}</th><th>${addValueInput.value}</th><th><button>удоли</button></th>`;
        listTable.appendChild(tr)
        cookieObj ();
    } else {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        cookieObj ();
    }
});

/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
    let elem = document.createElement('div');

    elem.textContent = text

    return elem;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
    where.prepend(what)
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов, следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    let childs = where.children;
    let array = new Array;

    for (let i = 0; i < 5; i++) {  
        if (String(childs[i].nextElementSibling) == '[object HTMLParagraphElement]') {
            array.push(childs[i])
        }
    }
    
    return array
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов.
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    var result = [];

    for (var child of where.children) {
        result.push(child.innerText);
    }

    return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    for (let child of where.childNodes) {
        if (child.nodeType == 3) {
            child.textContent = '';
        }
    }
}

/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    for (let child of where.childNodes) {
        if (child.nodeType == 3) {
            child.textContent = '';
        }
        if (child.childNodes.length > 0) {
            deleteTextNodesRecursive(child)
        }
    }
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
function collectDOMStat(root) {
    let obj = new Object;

    obj.tags = tagsRoot(root);
    obj.classes = classRoot(root);
    obj.texts = textsRoot(root);
    function textsRoot(root) {
        let result = 0;

        for (let childs of root.children) {
            if (childs.textContent) {
                result += 1
            }
            if (childs.children.length != 0) {
                result += textsRoot(childs)
            }
        }

        return result
    }
    function tagsRoot(root) {
        let objTags = new Object;

        for (let childs of root.children) {
            if (objTags.hasOwnProperty([childs.tagName])) {
                objTags[childs.tagName] += 1
            } else {
                objTags[childs.tagName] = 1
            }
            if (childs.children.length != 0) {
                Object.assign(objTags, tagsRoot(childs))
            }
        }

        return objTags
    }
    function classRoot(root) {
        let objClass = {};

        for (let childs of root.children) {
            if (childs.classList.length > 1) {
                for (let list of childs.classList) {
                    if (objClass.hasOwnProperty([list])) {
                        objClass[list] += 1
                    } else {
                        objClass[list] = 1
                    }
                }
            } else {
                if (objClass.hasOwnProperty([childs.className])) {
                    objClass[childs.className] += 1
                } else if (childs.className) {
                    objClass[childs.className] = 1
                }
            }
            if (childs.children.length != 0) {    
                let reqObj = classRoot(childs);

                for (let iter in reqObj) {
                    if (objClass[iter] == reqObj[iter]) {
                        objClass[iter] += 1
                    } else {
                        objClass[iter] = 1
                    }
                }
                
            }
        }

        return objClass
    }
    
    return obj;
}

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {
    const mutationConfig = { childList: true, subtree: true };

    let onMutate = function(mutationsList) {
        let obj = {}
        let nodex = []

        mutationsList.forEach(mutation => {

            if (mutation.addedNodes.length != 0) {
                for (let ty of mutation.addedNodes) {
                    if (ty.tagName != undefined) {
                        nodex.push(ty.tagName);
                        obj.type = 'insert';
                    }
                }
            } else {
                for (let zy of mutation.removedNodes) {
                    if (zy.tagName != undefined) {
                        nodex.push(zy.tagName)
                        obj.type = 'remove';
                        
                    }
                }
            }
            obj.nodes = nodex
            console.error(obj)
            fn(obj)    
        });
    };
    
    let observer = new MutationObserver(onMutate);

    observer.observe(where, mutationConfig);
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};

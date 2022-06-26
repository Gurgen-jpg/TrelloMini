


const addBoardButton = document.querySelector('.add__board-btn'); // кнопка добавления доски

function addTask() {
    const lists = document.querySelectorAll('.list');
    const btn = document.querySelector('.add__btn'); // объявление о намерении добавить элемент в список
    const addBtn = document.querySelector('.add__item-btn'); // добавление эдемента в список
    const cancelBtn = document.querySelector('.cancel__item-btn'); // отмена и зачистка формы
    const textarea = document.querySelector('.textarea');
    const form = document.querySelector('.form'); // textarea и кнопки

    let value

    function addItem() { // добавить таску
        const newTask = document.createElement('div')
        newTask.classList.add('list__item')
        newTask.draggable = true
        newTask.textContent = value
        lists[lists.length - 1].appendChild(newTask)
        console.log('LIST: ', lists);
        clearForm()
    }

    function clearForm() { // зачистить форму
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'
    }
    function onChangeHandler(e) { // инпут создание VALUE
        value = e.target.value
        value ? addBtn.style.display = 'block' : addBtn.style.display = 'none'
    }
    // СОБЫТИЯ
    cancelBtn.addEventListener('click', () => {
        clearForm()
    })
    addBtn.addEventListener('click', () => {
        addItem()
        addBtn.removeEventListener('click', () => addItem())
        dragAndDrop()
    })
    textarea.addEventListener('input', (e) => {
        onChangeHandler(e)
        textarea.removeEventListener('input', (e) => onChangeHandler(e))
    })
    btn.addEventListener('click', () => {
        form.style.display = 'block'
        btn.style.display = 'none'
        addBtn.style.display = 'none'
    })
    dragAndDrop()
}

addTask();

function addBoard() {
    const boards = document.querySelector('.boards')
    const newBoard = document.createElement('div')
    newBoard.classList = 'boards__item'
    newBoard.innerHTML = `
        <span contenteditable="true" class="title">Введите название</span>
        <div class="list"></div>
    `
    boards.append(newBoard)
    changeTitle()
    dragAndDrop()
}

addBoardButton.addEventListener('click', addBoard)

function changeTitle() {
    const titles = document.querySelectorAll('.title')

    titles.forEach(t => {
        t.addEventListener('click', (event) => {
            event.target.textContent = ''
        })
    })
}
changeTitle();


function dragAndDrop() {
    let draggedItem = null;
    const listItems = document.querySelectorAll('.list__item')
    const lists = document.querySelectorAll('.list')

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i]

        item.addEventListener('dragstart', () => {
            draggedItem = item
            setTimeout(() => {
                item.style.display = 'none'
            }, 0)
        })

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block'
                draggedItem = null
            }, 0)
        })

        //Удаление на 2-ной клик по задачи
        item.addEventListener('dblclick', () => {
            item.remove()
        })

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j]
            list.addEventListener('dragover', e => e.preventDefault())

            list.addEventListener('dragenter', function (e) {
                e.preventDefault()
                this.style.backgroundColor = 'rgba(0,0,0, 0.8)'
            })

            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgba(0,0,0, 0)'
            })

            list.addEventListener('drop', function (e) { 
                this.append(draggedItem)}
            )
        }
    }
}



dragAndDrop()
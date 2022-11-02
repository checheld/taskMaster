
// скрыть-показать область добавления колонки

let addButton = document.querySelector('.add-list-container');
let form = document.querySelector('.list-form');
let closeForm = document.querySelector('.list-form-button-close');
let body = document.querySelector('body');
let columnsContainer = document.querySelector('.list');
let columnsData = localStorage.getItem('myColumns') ? JSON.parse(localStorage.getItem('myColumns')) : [];
let cardsData = localStorage.getItem('myCards') ? JSON.parse(localStorage.getItem('myCards')) : [];

addButton.addEventListener('click', function() {
    addButton.classList.add('hidden');
    form.classList.remove('hidden');
});

closeForm.addEventListener('click', function() {
    form.classList.add('hidden');
    addButton.classList.remove('hidden');
});

let forCreateColumn = function(colTitle) {
    let newColumn = document.createElement('div');
    newColumn.classList.add('column');
    
    let columnHeader = document.createElement('div');
    columnHeader.classList.add('column-header');
    newColumn.appendChild(columnHeader);

    let columnTitle = document.createElement('p');
    columnTitle.classList.add('column-title');
    columnHeader.appendChild(columnTitle);
    
    let columnHeaderBtn = document.createElement('button');
    columnHeaderBtn.classList.add('column-header-btn');
    columnHeader.appendChild(columnHeaderBtn);

    let columnHeaderMenu = document.createElement('ul');
    columnHeaderMenu.classList.add('column-header-menu', 'hidden');
    columnHeader.appendChild(columnHeaderMenu);

    let columnHeaderMenuLiCr = document.createElement('li');
    columnHeaderMenuLiCr.classList.add('column-header-menu-li');
    columnHeaderMenuLiCr.textContent = 'Создать карточку';
    columnHeaderMenu.appendChild(columnHeaderMenuLiCr);

    let columnHeaderMenuLDel = document.createElement('li');
    columnHeaderMenuLDel.classList.add('column-header-menu-li');
    columnHeaderMenuLDel.textContent = 'Удалить все карточки в колонке';
    columnHeaderMenu.appendChild(columnHeaderMenuLDel);

    let columnHeaderMenuLDelColumn = document.createElement('li');
    columnHeaderMenuLDelColumn.classList.add('column-header-menu-li');
    columnHeaderMenuLDelColumn.textContent = 'Удалить колонку';
    columnHeaderMenu.appendChild(columnHeaderMenuLDelColumn);

    let columnHeaderMenuCopy = document.createElement('li');
    columnHeaderMenuCopy.classList.add('column-header-menu-li');
    columnHeaderMenuCopy.textContent = 'Копировать все карточки в новую колонку';
    columnHeaderMenu.appendChild(columnHeaderMenuCopy);

    let columnHeaderImg = document.createElement('img');
    columnHeaderImg.classList.add('column-header-btn-img');
    columnHeaderImg.src = 'img/dots.png';
    columnHeaderImg.alt = 'dots';
    columnHeaderBtn.appendChild(columnHeaderImg);

    let columnList = document.createElement('ul');
    columnList.classList.add('column-list');
    newColumn.appendChild(columnList);
    
    let columnButton = document.createElement('button');
    columnButton.classList.add('button');
    columnButton.classList.add('column-button');
    columnButton.textContent = 'Добавить карточку';
    newColumn.appendChild(columnButton);
    
    let columnForm = document.createElement('form');
    columnForm.classList.add('column-form');
    columnForm.classList.add('hidden');
    newColumn.appendChild(columnForm);
    
    let inputContainer = document.createElement('div');
    columnForm.appendChild(inputContainer);
    
    let columnFormInput = document.createElement('input');
    columnFormInput.classList.add('column-form-input');
    columnFormInput.classList.add('form-input');
    columnFormInput.placeholder = 'Ввести заголовок для этой карточки';
    columnFormInput.setAttribute("required", ""); 
    inputContainer.appendChild(columnFormInput);
    
    let columnFormButtonsContainer = document.createElement('div');
    columnFormButtonsContainer.classList.add('column-form-buttons-container');
    columnFormButtonsContainer.classList.add('buttons-container');
    columnForm.appendChild(columnFormButtonsContainer);
    
    let columnFormButtonAdd = document.createElement('button');
    columnFormButtonAdd.classList.add('button');
    columnFormButtonAdd.classList.add('column-form-button-add');
    columnFormButtonAdd.type = 'submit';
    columnFormButtonAdd.textContent = 'Добавить карточку';
    columnFormButtonsContainer.appendChild(columnFormButtonAdd);
    
    let columnFormButtonClose = document.createElement('button');
    columnFormButtonClose.classList.add('column-form-button-close');
    columnFormButtonClose.type = 'button';
    columnFormButtonsContainer.appendChild(columnFormButtonClose);
    
    let columnFormButtonImg = document.createElement('img');
    columnFormButtonImg.classList.add('list-form-button-img');
    columnFormButtonImg.src = 'img/kr.png';
    columnFormButtonImg.alt = 'kr';
    columnFormButtonClose.appendChild(columnFormButtonImg);
    
    columnTitle.textContent = colTitle;
    setId(newColumn);

    // скрыть-показать область добавления листа

    columnButton.addEventListener('click', function() {
        columnButton.classList.add('hidden');
        columnForm.classList.remove('hidden');
    });
    columnFormButtonClose.addEventListener('click', function() {
        columnForm.classList.add('hidden');
        columnButton.classList.remove('hidden');
    });

    // Добавление листа

    columnForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        renderCard(columnFormInput, columnList, newColumn);
    });

    // Скрыть-показать меню

    columnHeaderBtn.addEventListener('click', function() {
        columnHeaderBtn.classList.add('hidden');
        columnHeaderMenu.classList.remove('hidden');
    });
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.column-header-btn')) {
            columnHeaderBtn.classList.remove('hidden');
            columnHeaderMenu.classList.add('hidden');
        }
    });

    // Удаление колонки

    columnHeaderMenuLDelColumn.addEventListener('click', function() {
        if (confirm('Вы действительно хотите удалить колонку?')) {
            
            for (let i = cardsData.length - 1; i >= 0; i--) {
                let obj = cardsData[i];
                if (obj.columnId === newColumn.id || obj.columnId === columnList.id) {
                    cardsData.splice(i, 1);
                    localStorage.setItem('myCards', JSON.stringify(cardsData));
                }
            };
            for (let i = columnsData.length - 1; i >= 0; i--) {
                let obj = columnsData[i];
                if (obj.columnId === newColumn.id || obj.columnId === columnList.id) {
                    columnsData.splice(i, 1);
                    localStorage.setItem('myColumns', JSON.stringify(columnsData));
                }
            };
            for (let i = cardsData.length - 1; i >= 0; i--) {
                let obj = cardsData[i];
                if (obj.columnId === newColumn.id || obj.columnId === columnList.id) {
                    cardsData.splice(i, 1);
                    localStorage.setItem('myCards', JSON.stringify(cardsData));
                }
            };
            for (let i = columnsData.length - 1; i >= 0; i--) {
                let obj = columnsData[i];
                if (obj.columnId === newColumn.id || obj.columnId === columnList.id) {
                    columnsData.splice(i, 1);
                    localStorage.setItem('myColumns', JSON.stringify(columnsData));
                }
            };
            newColumn.remove();
        };
    });

    // // Удаление всех листов в колонке

    columnHeaderMenuLDel.addEventListener('click', function() {
        if (confirm('Вы действительно хотите удалить все карточки?')) {

            for (let i = cardsData.length - 1; i >= 0; i--) {
                let obj = cardsData[i];
                if (obj.columnId === newColumn.id || obj.columnId === columnList.id) {
                    cardsData.splice(i, 1);
                    localStorage.setItem('myCards', JSON.stringify(cardsData));
                }
            };
            let lists = columnList.querySelectorAll('li');
            for (let i = 0; i < lists.length; i++) {
                lists[i].remove();
            };
        };
    });

    // Создать карточку

    columnHeaderMenuLiCr.addEventListener('click', function() {
        let cardName = document.createElement('p');
        cardName.value = 'Новая карточка';
        renderCard(cardName, columnList, newColumn);
    });

    return {newColumn, columnHeader, columnTitle, columnHeaderBtn, columnHeaderMenu, columnHeaderMenuLiCr, columnHeaderMenuLDel, columnHeaderMenuLDelColumn, columnHeaderMenuCopy, columnHeaderImg, columnList, columnButton, columnForm, inputContainer, columnFormInput, columnFormButtonsContainer, columnFormButtonAdd, columnFormButtonClose, columnFormButtonImg}
};

// создание колонки

let columns = document.querySelector('.list');
let listFormInput = document.querySelector('.list-form-input');

let createColumn = function (colTitle) {

    let createColumnFunc = forCreateColumn(colTitle);
    let newColumn = createColumnFunc.newColumn;
    let columnTitle = createColumnFunc.columnTitle;
    let columnHeaderMenuCopy = createColumnFunc.columnHeaderMenuCopy;
    let columnList = createColumnFunc.columnList;
    let columnButton = createColumnFunc.columnButton;
    let columnForm = createColumnFunc.columnForm;
    let columnFormInput = createColumnFunc.columnFormInput;
    let columnFormButtonClose = createColumnFunc.columnFormButtonClose;

    // // Копировать все карточки в новую колонку

    columnHeaderMenuCopy.addEventListener('click', function() {
        let title = columnTitle.textContent;
        let createColumnFunc = forCreateColumn(title);
        addStorage(createColumnFunc.newColumn, title); 
        columns.appendChild(createColumnFunc.newColumn);
        let allLists = columnList.querySelectorAll('.column-list-item');
        for (let i = 0; i < allLists.length; i++) {
            for (let j = 0; j < cardsData.length; j++) {
                let obj = cardsData[j];
                if (obj.cardId === allLists[i].id) {

                    let inputElement = obj.cardTitle;
                    let coList = createColumnFunc.columnList;
                    let column = createColumnFunc.newColumn;
                    let newList = createList(obj.cardTitle);
                    setId(newList); 
                    coList.append(newList);

                    // Создание модального окна для новых карточек новой колонки
                    let newListTitle = newList.querySelector('.list-title');  
                    let createModalFunc = createModal(newList, obj.cardTitle);
                    createModalFunc.modalWindow.classList.add('hidden');
                 
                    // переименование листа
                    let newListForm = newList.querySelector('.list-form-edit-title');
                    let newListInput = newList.querySelector('.list-form-input-edit-title');
                    let modalTitle = createModalFunc.modalWindow.querySelector('.modal-window-title');
                    newListForm.addEventListener('submit', function(evt) {
                        evt.preventDefault();
                        newListTitle.textContent = newListInput.value;
                        modalTitle.textContent = newListTitle.textContent;
                        for (let i = 0; i < cardsData.length; i++) {
                            let obj = cardsData[i];
                            if (obj.cardId === newList.id) {
                                obj.cardTitle = newListTitle.textContent;
                                localStorage.setItem('myCards', JSON.stringify(cardsData));
                            }
                        };
                    });

                    // переименование при открытом модальном окне
                    
                    modalTitle.oninput = function() {
                        newListTitle.textContent = modalTitle.textContent;
                        for (let i = 0; i < cardsData.length; i++) {
                            let obj = cardsData[i];
                            if (obj.cardId === newList.id) {
                                obj.cardTitle = modalTitle.textContent;
                                localStorage.setItem('myCards', JSON.stringify(cardsData));
                            }
                        };
                    };
                    setId(createModalFunc.modalWindow);

                    // добавление описания
                    if (obj.modalId !== "modalWindow.id") {
                        createModalFunc.secondSecDescr.classList.add('hidden');
                        createModalFunc.secondSecDescrText.textContent = obj.cardDescr;
                    };
                    // добавление комментариев
                    let lists = allLists[i].querySelectorAll('.comment');
                    if (lists !== []) {
                        for (let k = 0; k < lists.length; k++) {
                        let comment = document.createElement('li');
                        comment.classList.add('comment');
                        comment.textContent = obj.cardComments[k];
                        createModalFunc.thirdSecComments.append(comment);
                        };
                    };

                    if (column.id === '') {cardsData.push({'columnId': coList.id, 'cardId': newList.id, 'cardTitle': inputElement, 'modalId': createModalFunc.modalWindow.id, 'cardDescr': obj.cardDescr, 'cardComments': obj.cardComments});}
                    else {cardsData.push({'columnId': column.id, 'cardId': newList.id, 'cardTitle': inputElement, 'modalId': createModalFunc.modalWindow.id, 'cardDescr': obj.cardDescr, 'cardComments': obj.cardComments});}
                    localStorage.setItem('myCards', JSON.stringify(cardsData));
                }
            };
            localStorage.setItem('myColumns', JSON.stringify(columnsData));
            localStorage.setItem('myCards', JSON.stringify(cardsData));
        };
    });
    
    return {newColumn, columnButton, columnForm, columnFormButtonClose, columnFormInput, columnList}
};

// Создание листа

let createList = function(title) {
    let list = document.createElement('li');
    list.classList.add('column-list-item');

    let listTitle = document.createElement('p');
    listTitle.classList.add('list-title');
    list.appendChild(listTitle);

    let editTitle = document.createElement('button');
    editTitle.classList.add('edit-title');
    list.appendChild(editTitle);

    let editTitleImg = document.createElement('img');
    editTitleImg.classList.add('edit-title-img');
    editTitleImg.src = 'img/pencil.png';
    editTitleImg.alt = 'pencil';
    editTitle.appendChild(editTitleImg);

    listTitle.textContent = title;

    // создание формы по смене имени

    let listForm = document.createElement('form');
    listForm.classList.add('list-form-edit-title');
    listForm.classList.add('hidden');
    list.appendChild(listForm);

    let listFormInputContainer = document.createElement('div');
    listFormInputContainer.classList.add('list-form-input-container');
    listForm.appendChild(listFormInputContainer);

    let listFormInputRename = document.createElement('input');
    listFormInputRename.classList.add('list-form-input-edit-title');
    listFormInputRename.setAttribute("required", ""); 
    listFormInputContainer.appendChild(listFormInputRename);

    let listFormButtonsContainer = document.createElement('div');
    listFormButtonsContainer.classList.add('list-form-buttons-container', 'buttons-container');
    listForm.appendChild(listFormButtonsContainer);

    let listFormButtonSave = document.createElement('button');
    listFormButtonSave.classList.add('list-form-button-save', 'button');
    listFormButtonSave.textContent = 'Сохранить';
    listFormButtonSave.type = 'submit';
    listFormButtonsContainer.appendChild(listFormButtonSave);

    let listFormButtonClose = document.createElement('button');
    listFormButtonClose.classList.add('list-form-button-close');
    listFormButtonClose.type = 'button';
    listFormButtonsContainer.appendChild(listFormButtonClose);

    let listFormButtonImg = document.createElement('img');
    listFormButtonImg.classList.add('list-form-button-img');
    listFormButtonImg.src = 'img/kr.png';
    listFormButtonImg.alt = 'kr';
    listFormButtonClose.appendChild(listFormButtonImg);

    // скрыть-показать область редактирования title листа

    editTitle.addEventListener('click', function() {
        listTitle.classList.add('hidden');
        editTitle.classList.add('hidden');
        listForm.classList.remove('hidden');
    });

    listFormButtonClose.addEventListener('click', function() {
        listTitle.classList.remove('hidden');
        editTitle.classList.remove('hidden');
        listForm.classList.add('hidden');
    });
    
    // переименование листа

    listForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
        listTitle.textContent = listFormInputRename.value;
        for (let i = 0; i < cardsData.length; i++) {
            let obj = cardsData[i];
            if (obj.cardId === list.id) {
                obj.cardTitle = listFormInputRename.value;
                localStorage.setItem('myCards', JSON.stringify(cardsData));
                if (obj.modalId !== "modalWindow.id") {
                    let modalWindow = document.getElementById(obj.modalId);
                    let modalTitle = modalWindow.querySelector('.modal-window-title');
                    modalTitle.textContent = obj.cardTitle;
                };
            }
            
        };
        listTitle.classList.remove('hidden');
        editTitle.classList.remove('hidden');
        listForm.classList.add('hidden');
    });

    // добавление модального окна

    listTitle.addEventListener('click', function() {
       
        for (let i = 0; i < cardsData.length; i++) {
            let obj = cardsData[i];
            if (obj.modalId !== 'modalWindow.id' && obj.cardId === list.id) {
                let modWind = document.getElementById(obj.modalId);
                modWind.classList.remove('hidden');
            
                let modalWindowTitle = modWind.querySelector('.modal-window-title');
                modalWindowTitle.oninput = function() {
                    listTitle.textContent = modalWindowTitle.textContent;
                    for (let i = 0; i < cardsData.length; i++) {
                        let obj = cardsData[i];
                        if (obj.cardId === list.id) {
                            obj.cardTitle = modalWindowTitle.textContent;
                            localStorage.setItem('myCards', JSON.stringify(cardsData));
                        }
                    };
                };
                } else {
                    if(obj.cardId === list.id) {
                    let createModalFunc = createModal(list, listTitle.textContent);
              
                    createModalFunc.modalWindowTitle.oninput = function() {
                        listTitle.textContent = createModalFunc.modalWindowTitle.textContent;
                        for (let i = 0; i < cardsData.length; i++) {
                            let obj = cardsData[i];
                            if (obj.cardId === list.id) {
                                obj.cardTitle = createModalFunc.modalWindowTitle.textContent;
                                localStorage.setItem('myCards', JSON.stringify(cardsData));
                            }
                        };
                    };
                    setId(createModalFunc.modalWindow);
    
                    // присваиваем id модального окна листу
    
                    for (let i = 0; i < cardsData.length; i++) {
                        let obj = cardsData[i];
                        if (obj.cardId === list.id) {
                            obj.modalId = createModalFunc.modalWindow.id;
                            localStorage.setItem('myCards', JSON.stringify(cardsData));
                        }
                    };
                }
            };
        }
    });

    setId(list);
    localStorage.setItem('myCards', JSON.stringify(cardsData));

    return list;
};

// Добавление колонки, свитч

form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    let createColumnFunc = createColumn(listFormInput.value);
    
    addStorage (createColumnFunc.newColumn, listFormInput.value);
    
    // Добавление колонки

    columns.appendChild(createColumnFunc.newColumn);
    listFormInput.value = '';

});

// Функция добавления листа

let renderCard = function (inputElement, coList, column) {
    let newList = createList(inputElement.value);
    
    coList.append(newList);
    if (column.id === '') {cardsData.push({'columnId': coList.id, 'cardId': newList.id, 'cardTitle': inputElement.value, 'modalId': 'modalWindow.id', 'cardDescr': 'Добавить описание', 'cardComments': []});}
    else {cardsData.push({'columnId': column.id, 'cardId': newList.id, 'cardTitle': inputElement.value, 'modalId': 'modalWindow.id', 'cardDescr': 'Добавить описание', 'cardComments': []});}
    localStorage.setItem('myCards', JSON.stringify(cardsData));
    inputElement.value = '';

    return {newList}
};

// Перетаскивание листов

function makeDraggable() {
    let drake = dragula({
      isContainer: function (el) {
        return el.classList.contains('column-list');
      }
    })
    .on('drop', (el) => {
      const found = cardsData.find(item => item['cardId'] === el.id);   
      if (el.parentElement.id === '') {
        let ul = el.parentElement;
        let column = ul.parentElement;
        found['columnId'] = column.id;
      } else {found['columnId'] = el.parentElement.id;}
      localStorage.setItem('myCards', JSON.stringify(cardsData));
    })
}

// создание и вызов модального окна

let createModal = function(el, elTitle) {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');
    el.append(modalWindow);

    let modalElement = document.createElement('div'); 
    modalElement.classList.add('modal-element');
    modalWindow.append(modalElement);

    let firstSec = document.createElement('section');
    firstSec.classList.add('first-section');
    modalElement.append(firstSec);

    let modalWindowTitle = document.createElement('p');
    modalWindowTitle.classList.add('modal-window-title');
    modalWindowTitle.textContent = elTitle;
    modalWindowTitle.contentEditable = true;
    firstSec.append(modalWindowTitle);

    let modalWindowClose = document.createElement('button');
    modalWindowClose.classList.add('modal-window-close');
    firstSec.append(modalWindowClose);
                    
    let modalWindowCloseImg = document.createElement('img');
    modalWindowCloseImg.classList.add('list-form-button-img');
    modalWindowCloseImg.src = 'img/kr.png';
    modalWindowCloseImg.alt = 'kr';
    modalWindowClose.appendChild(modalWindowCloseImg);

    let secondSec = document.createElement('section');
    secondSec.classList.add('second-section');
    modalElement.append(secondSec);

    let secondSecTitle = document.createElement('p');
    secondSecTitle.classList.add('second-section-title'); 
    secondSecTitle.textContent = 'Описание';
    secondSec.append(secondSecTitle);

    let secondSecDescr = document.createElement('button');
    secondSecDescr.classList.add('second-section-description');
    secondSecDescr.textContent = 'Добавить более подробное описание...';
    secondSec.append(secondSecDescr);

    let secondSecForm = document.createElement('form');
    secondSecForm.classList.add('column-form', 'hidden');
    secondSec.append(secondSecForm);

    let secondSecInputContainer = document.createElement('div');
    secondSecInputContainer.classList.add('second-section-input-container');
    secondSecForm.append(secondSecInputContainer);

    let secondSecInput = document.createElement('input');
    secondSecInput.classList.add('second-section-input', 'form-input');
    secondSecInput.setAttribute("required", "");
    secondSecInputContainer.append(secondSecInput);

    let secondSecButtonsContainer = document.createElement('div');
    secondSecButtonsContainer.classList.add('second-section-buttons-container');
    secondSecForm.append(secondSecButtonsContainer);

    let secondSecButtonAdd = document.createElement('button');
    secondSecButtonAdd.classList.add('button');
    secondSecButtonAdd.type = 'submit';
    secondSecButtonAdd.textContent = 'Сохранить';
    secondSecButtonsContainer.append(secondSecButtonAdd);

    let secondSecButtonClose = document.createElement('button');
    secondSecButtonClose.classList.add('column-form-button-close');
    secondSecButtonClose.type = 'button';
    secondSecButtonsContainer.append(secondSecButtonClose);

    let secondSecButtonCloseImg = document.createElement('img');
    secondSecButtonCloseImg.classList.add('list-form-button-img');
    secondSecButtonCloseImg.src = 'img/kr.png';
    secondSecButtonCloseImg.alt = 'kr';
    secondSecButtonClose.append(secondSecButtonCloseImg);

    let secondSecDescrText = document.createElement('p');
    secondSecDescrText.classList.add('second-section-description-text');
    secondSec.append(secondSecDescrText);

    let thirdSec = document.createElement('section');
    thirdSec.classList.add('third-section');
    modalElement.append(thirdSec);

    let thirdSecTitle = document.createElement('p');
    thirdSecTitle.classList.add('second-section-title'); 
    thirdSecTitle.textContent = 'Действия';
    thirdSec.append(thirdSecTitle); 

    let thirdSecComment = document.createElement('button');
    thirdSecComment.classList.add('third-section-description');
    thirdSecComment.textContent = 'Напишите комментарий...';
    thirdSec.append(thirdSecComment);

    let thirdSecForm = document.createElement('form');
    thirdSecForm.classList.add('column-form', 'hidden');
    thirdSec.append(thirdSecForm);

    let thirdSecInputContainer = document.createElement('div');
    thirdSecInputContainer.classList.add('third-section-input-container');
    thirdSecForm.append(thirdSecInputContainer);

    let thirdSecInput = document.createElement('input');
    thirdSecInput.classList.add('third-section-input', 'form-input');
    thirdSecInput.setAttribute("required", "");
    thirdSecInputContainer.append(thirdSecInput);

    let thirdSecButtonsContainer = document.createElement('div');
    thirdSecButtonsContainer.classList.add('third-section-buttons-container');
    thirdSecForm.append(thirdSecButtonsContainer);

    let thirdSecButtonAdd = document.createElement('button');
    thirdSecButtonAdd.classList.add('button');
    thirdSecButtonAdd.type = 'submit';
    thirdSecButtonAdd.textContent = 'Сохранить';
    thirdSecButtonsContainer.append(thirdSecButtonAdd);

    let thirdSecButtonClose = document.createElement('button');
    thirdSecButtonClose.classList.add('column-form-button-close');
    thirdSecButtonClose.type = 'button';
    thirdSecButtonsContainer.append(thirdSecButtonClose);

    let thirdSecButtonCloseImg = document.createElement('img');
    thirdSecButtonCloseImg.classList.add('list-form-button-img');
    thirdSecButtonCloseImg.src = 'img/kr.png';
    thirdSecButtonCloseImg.alt = 'kr';
    thirdSecButtonClose.append(thirdSecButtonCloseImg);

    let thirdSecComments = document.createElement('ul');
    thirdSecComments.classList.add('third-section-comments');
    thirdSec.append(thirdSecComments);

    let fourSec = document.createElement('section');
    fourSec.classList.add('four-section');
    modalElement.append(fourSec);

    let fourSecDelButton = document.createElement('button');
    fourSecDelButton.classList.add('four-section-delete-button', 'button');
    fourSecDelButton.textContent = 'Удалить карточку';
    fourSec.append(fourSecDelButton);

    // закрытие модального окна

    modalWindowClose.addEventListener('click', function() {
        modalWindow.classList.add('hidden');
    });

    window.addEventListener('click', function(event) {
            if (event.target.matches('.modal-window')) {
            modalWindow.classList.add('hidden');  
        }
    });

    fourSecDelButton.addEventListener('click', function() {
        if (confirm('Вы действительно хотите удалить карточку?')) {
            el.remove();
            modalWindow.classList.add('hidden');
            for (let i = 0; i < cardsData.length; i++) {
                let obj = cardsData[i];
                if (obj.cardId === el.id) {
                    cardsData.splice(i, 1);
                }
            };
            localStorage.setItem('myCards', JSON.stringify(cardsData));
        };
    });
 
    // переключение на добавление описания в модальном окне
    
    secondSecDescr.addEventListener('click', function(){
        secondSecDescr.classList.add('hidden');
        secondSecForm.classList.remove('hidden');
    });
    
    secondSecButtonClose.addEventListener('click', function(){
        secondSecDescr.classList.remove('hidden');
        secondSecForm.classList.add('hidden');
    });
    
    // создание описания в модальном окне
    
    secondSecForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
        secondSecDescrText.textContent = secondSecInput.value;
        secondSecForm.classList.add('hidden');

        for (let i = 0; i < cardsData.length; i++) {
            let obj = cardsData[i];
            if (obj.cardId === el.id) {
                obj.cardDescr = secondSecDescrText.textContent;

                localStorage.setItem('myCards', JSON.stringify(cardsData));
            }
        };
    })
    
    // редактирование описания в модальном окне
    
    secondSecDescrText.addEventListener('click', function(evt) {
        evt.preventDefault();
        secondSecInput.value = secondSecDescrText.textContent;
        secondSecDescrText.classList.add('hidden');
        secondSecForm.classList.remove('hidden');
    
    secondSecForm.addEventListener('submit', function(evt) {
            evt.preventDefault();
            secondSecDescrText.textContent = secondSecInput.value;
            secondSecForm.classList.add('hidden');
            secondSecDescrText.classList.remove('hidden');
        })            
    })
    
    // переключение на добавление комментариев в модальном окне
    
    thirdSecComment.addEventListener('click', function(){
        thirdSecComment.classList.add('hidden');
        thirdSecForm.classList.remove('hidden');
    });
    
    thirdSecButtonClose.addEventListener('click', function(){
        thirdSecComment.classList.remove('hidden');
        thirdSecForm.classList.add('hidden');
    });
    
    // создание комментариев в модальном окне
    
    thirdSecForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
        let comment = document.createElement('li');
        comment.classList.add('comment');
        comment.textContent = thirdSecInput.value;
        thirdSecComments.append(comment);
        thirdSecForm.classList.add('hidden');
        thirdSecComment.classList.remove('hidden');
        thirdSecInput.value = '';

        for (let i = 0; i < cardsData.length; i++) {
            let obj = cardsData[i];
            if (obj.cardId === el.id) {
                obj.cardComments.push(comment.textContent);
                localStorage.setItem('myCards', JSON.stringify(cardsData));
            }
        };
    });
    return {modalWindow, secondSecDescrText, thirdSecComments, secondSecDescrText, secondSecDescr, modalWindowTitle};
};

// Присваивание Id

let setId = function(element) {
    let timeVal = new Date().valueOf() + Math.floor(Math.random()*100000);
    element.setAttribute('id', timeVal);
};

// Добавление в storage колонки

let addStorage = function (addedColumn, addedColumnTitle) {
    columnsData.push({'columnId': addedColumn.id, 'columnTitle': addedColumnTitle});
    localStorage.setItem('myColumns', JSON.stringify(columnsData));
};

columnsData.forEach(element => {
    addFromLocal(element['columnId'], element['columnTitle']);
});

function addFromLocal(colId, colTitle) { 
    let newLocalColumn = createColumn(colTitle);
    newLocalColumn.columnList.setAttribute('id', colId);
    newLocalColumn.newColumn.setAttribute('id', '');
    columnsContainer.append(newLocalColumn.newColumn);
};

cardsData.forEach(item => {
    let newCard = createList(item['cardTitle']);
    let lists = columnsContainer.querySelectorAll('.column-list');
    newCard.setAttribute('id', item['cardId']);
    let listTitle = newCard.querySelector('.list-title');
    let newLocalModWind = createModal(newCard, listTitle.textContent);
    newLocalModWind.modalWindowTitle = listTitle.textContent;
    newLocalModWind.modalWindow.setAttribute('id', item['modalId']);
    newLocalModWind.modalWindow.classList.add('hidden');
    lists.forEach(list => {
      if(list.id === item['columnId']) {
        list.append(newCard);
        if(newCard.id === item['cardId'] && item['modalId'] !== "modalWindow.id") {

            let descrText = newLocalModWind.secondSecDescrText;
            if (item['cardDescr'] !== "Добавить описание") {
                descrText.textContent = item['cardDescr'];
                let descrTextButton = newLocalModWind.secondSecDescr;
                descrTextButton.classList.add('hidden');
            };
  
            let modalUl = newLocalModWind.thirdSecComments;
            let comments = item['cardComments'];
            if (comments !== []) {
                for (let i = 0; i < comments.length; i++) {
                    let li = document.createElement('li');
                    li.classList.add('comment');
                    li.textContent = comments[i];
                    modalUl.append(li);
                };
            };

            newCard.append(newLocalModWind.modalWindow);
        }
      }
    });
});

makeDraggable();

//localStorage.clear();



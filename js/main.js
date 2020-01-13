let m = 0;

// request array
let arr = { 'request': 'getAllData' };
//array names for cols in table
let colsArr = ['check', 'id', 'goods', 'price', 'amount', 'country', '1c_article', 'time Add']

//create table
function dataTable(data) {
    let count = 4; // number of lines on one page

    function createTable(data, count, flag = undefined) {

        function createPatination(dataArr) {
            let paginationWrapp = document.querySelector('.pagination ul');
            let liCounter = Math.ceil(dataArr.length / count);
            for (let i = 0; i < liCounter; i++) {
                let li = document.createElement('li');
                li.innerHTML = i + 1;
                paginationWrapp.appendChild(li);
            }

        }

        createPatination(data);

        let pagination = document.querySelectorAll('.pagination ul li ');
        pagination[0].classList.add('active');

        if (flag) {
            for (let j = 0; j < pagination.length; j++) {
                pagination[j].classList.remove('active');
            }
            pagination[flag].classList.add('active');
        }

        let tableWrapp = document.querySelector('.table');
        let table = document.createElement('table');
        let tBody = document.createElement('tbody');

        table.setAttribute('id', 'my-table');
        let thTr = document.createElement('tr');
        colsArr.forEach(function (item) {
            let th = document.createElement('th');
            th.innerHTML = item;
            thTr.append(th);
        });
        table.appendChild(thTr);

        let activeData = data.slice(0, count);

        init(activeData, tBody);

        for (let i = 0; i < pagination.length; i++) {
            pagination[i].addEventListener('click', function () {
                for (let j = 0; j < pagination.length; j++) {
                    pagination[j].classList.remove('active');
                }
                this.classList.add('active');
                let num = +this.innerHTML;
                let start = (num - 1) * count;
                let end = start + count;
                let pageData = data.slice(start, end);
                tBody.innerHTML = '';
                init(pageData, tBody);

            });
        }

        if (flag) {
            let num = flag;
            let start = (num) * count;
            let end = start + count;
            let pageData = data.slice(start, end);
            tBody.innerHTML = '';
            init(pageData, tBody);
        }

        table.appendChild(tBody);
        tableWrapp.appendChild(table);
        limitPagination()
    }

    createTable(data, count);

    //search data
    document.querySelector('#btn-search').addEventListener('click', function () {
        let table = document.querySelector('.table');
        let pagination = document.querySelector('.pagination ul')
        pagination.innerHTML = '';
        table.innerHTML = '';

        let searchInput = document.querySelector('#search-input').value;
        let searchData = searchValue(data, searchInput);
        if (searchData.length == 0) {
            pagination.innerHTML = '';
            table.innerHTML = '<p style="font-size:35px;font-weight:bolder;text-align:center">No results</p>';
        }
        createTable(searchData, count);
    });

    //sort data (reverse)
    document.querySelector('#btn-sort').addEventListener('click', function () {
        document.querySelector('.pagination ul').innerHTML = '';
        document.querySelector('.table').innerHTML = '';
        let reverseData = data.reverse();
        createTable(reverseData, count);
        reverseData = data;
    });


    document.querySelector('#next').addEventListener('click', function () {

        limitPagination();

        let activeP = document.querySelector('.active');
        let tBody = document.querySelector('tbody');

        let num = +activeP.innerHTML + 1;
        let start = (num - 1) * count;
        let end = start + count;
        let pageData = data.slice(start, end);
        tBody.innerHTML = '';
        init(pageData, tBody);

        let pagination = document.querySelectorAll('.pagination ul li ');
        for (let j = 0; j < pagination.length; j++) {
            pagination[j].classList.remove('active');
        }

        if (num > pagination.length) {
            for (let j = 0; j < pagination.length; j++) {
                pagination[j].classList.remove('active');
            }
            num = 1;
            document.querySelector('.pagination ul').innerHTML = '';
            document.querySelector('.table').innerHTML = '';

            createTable(data, count);
            pagination[0].classList.add('.active');
        }


        pagination[num - 1].classList.add('active');
    });


    document.querySelector('#prev').addEventListener('click', function () {

        let activeP = document.querySelector('.active');
        let tBody = document.querySelector('tbody');

        let num = +activeP.innerHTML - 1;
        let start = (num - 1) * count;
        let end = start + count;
        let pageData = data.slice(start, end);
        tBody.innerHTML = '';
        init(pageData, tBody);

        let pagination = document.querySelectorAll('.pagination ul li ');
        for (let j = 0; j < pagination.length; j++) {
            pagination[j].classList.remove('active');
        }

        if (num < 1) {
            document.querySelector('.pagination ul').innerHTML = '';
            document.querySelector('.table').innerHTML = '';
            num = pagination.length;
            for (let j = 0; j < pagination.length; j++) {
                pagination[j].classList.remove('active');
            }
            num = pagination.length - 1;

            createTable(data, count, num);

            for (let j = 0; j < pagination.length; j++) {
                pagination[j].classList.remove('active');
            }
            limitPagination()
        }

        else {
            pagination[num - 1].classList.add('active');
        }
        limitPagination()
    });
}





// request for getting all data

// when connecting to the server, uncomment the line below
// ajax('core/getData.php', 'POST', function (data) { data = JSON.parse(data); dataTable(data);console.log(JSON.stringify(data)) }, arr);

// it`s test "request"
dataTable(testResponseForServerArr);

//---------------- add, create, delete btns ------------------------




document.querySelector('#add').addEventListener('click', function () {
    let modalAdd = document.querySelector('.modal-window');
    modalAdd.classList.remove('hide');
    let requestBtn = document.querySelector('.btn-request');
    requestBtn.innerHTML = 'Add';
    document.querySelector('.modal-header h2').innerHTML = 'Add data';
    requestBtn.dataset.request = 'add';
});



document.querySelector('#create').addEventListener('click', function () {
    let checkRadio = checkFunc();
    if (checkRadio.length == 0) {
        createChips('rgb(53, 6, 6)', 2000, 'No select');
        closeWindow();
        return false;
    }
    let modalCreate = document.querySelector('.modal-window');
    modalCreate.classList.remove('hide');
    let requestBtn = document.querySelector('.btn-request');
    requestBtn.innerHTML = 'Create';
    document.querySelector('.modal-header h2').innerHTML = 'Create data';
    requestBtn.dataset.request = 'create';
});



document.querySelector('#delete').addEventListener('click', function () {
    let checkRadio = checkFunc();
    if (checkRadio.length == 0) {
        createChips('rgb(53, 6, 6)', 2000, 'No select');
        closeWindow();
        return false;
    }
    let modalDelete = document.querySelector('.modal-window');
    let modal = document.querySelector('.modal');
    modal.style.height = 300 + 'px';
    document.querySelector('.input-wrapper').innerHTML = '';
    modalDelete.classList.remove('hide');
    let requestBtn = document.querySelector('.btn-request');
    requestBtn.innerHTML = 'Delete';
    document.querySelector('.modal-header h2').innerHTML = 'Are you shure?';
    requestBtn.dataset.request = 'delete';

});




// ----------- close btn ----------------------

let btnsCloses = document.querySelectorAll('.btn-close');
for (let i = 0; i < btnsCloses.length; i++) {
    btnsCloses[i].addEventListener('click', function () {
        let modals = document.querySelectorAll('.modal-wrapp');
        for (let j = 0; j < modals.length; j++) {
            modals[j].classList.add('hide');
        }
    });
}

let modalWrap = document.querySelectorAll('.modal-wrapp');
for (let i = 0; i < modalWrap.length; i++) {
    modalWrap[i].addEventListener('click', function () { this.classList.add('hide') });
}

let modalWindows = document.querySelectorAll('.modal');
for (let i = 0; i < modalWindows.length; i++) {
    modalWindows[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}




//====================== request on server =============================

document.querySelector('.btn-request').addEventListener('click', function () {
    let dataArray = {};


    if (this.dataset.request == 'add') {
        dataArray = inputsData(dataArray);
        dataArray.request = 'addGoods';
        ajax('core/getData.php', 'POST', addFunc, dataArray);
        function addFunc(data) {
            if (data == 1) {
                document.querySelector('.table').innerHTML = '';
                document.querySelector('.pagination ul').innerHTML = '';
                closeWindow();
                ajax('core/getData.php', 'POST', function (data) { data = JSON.parse(data); dataTable(data) }, arr);
                createChips('rgb(53, 6, 6)', 2000, 'Row is added');
            }
            else {
                createChips('rgb(53, 6, 6)', 2000, 'No correct!');
            }
        }
        setTimeout(function(){location.reload();},1100);
    }


    else if (this.dataset.request == 'create') {
        let checkRadio = checkFunc();
        if (checkRadio.length == 0) {
            createChips('rgb(53, 6, 6)', 2000, 'No select');
            closeWindow();
            return false;
        }
        else {
            checkRadio = checkRadio[0].dataset.id;
        }
        dataArray = inputsData(dataArray);
        dataArray.request = 'createGoods';
        dataArray.id = checkRadio;

        ajax('core/getData.php', 'POST', createFunc, dataArray);

        function createFunc(data) {
            if (data == 1) {
                createChips('#000', 2000, 'Row is created');
                document.querySelector('.table').innerHTML = '';
                document.querySelector('.pagination ul').innerHTML = '';
                closeWindow();
                ajax('core/getData.php', 'POST', function (data) { data = JSON.parse(data); dataTable(data) }, arr);
            }
            else {
                createChips('rgb(53, 6, 6)', 2000, 'No correct');
            }
        }
        setTimeout(function(){location.reload();},1100);
    }

    else if (this.dataset.request == 'delete') {
        let checkRadio = checkFunc();
        if (checkRadio.length == 0) {
            createChips('rgb(53, 6, 6)', 2000, 'No select');
            closeWindow();
            return false;
        }
        else {
            checkRadio = checkRadio[0].dataset.id;
        }
        dataArray.request = 'deleteGoods';
        dataArray.id = checkRadio;

        ajax('core/getData.php', 'POST', deleteFunc, dataArray);

        function deleteFunc(data) {
            if (data == 1) {
                createChips('#000', 2000, 'Row is deleted');
                document.querySelector('.table').innerHTML = '';
                document.querySelector('.pagination ul').innerHTML = '';
                closeWindow();
                ajax('core/getData.php', 'POST', function (data) { data = JSON.parse(data); dataTable(data) }, arr);
            }
            else {
                createChips('rgb(53, 6, 6)', 2000, 'Error');
            }
        }
        setTimeout(function(){location.reload();},1100);
    }
});


//======================= auxiliary functions ========================

//create table elements
function init(arr, wrapp) {
    arr.forEach(function (element) {
        let tr = document.createElement('tr');
        let checkTd = document.createElement('td');
        let checkRadio = document.createElement('input');
        checkRadio.setAttribute('data-id', element.id);
        checkRadio.setAttribute('type', 'radio');
        checkRadio.setAttribute('class', 'check');
        checkRadio.setAttribute('name', 'check-radio');
        checkTd.appendChild(checkRadio);
        tr.appendChild(checkTd);

        for (let key in element) {
            let td = document.createElement('td');
            td.innerHTML = element[key];
            tr.appendChild(td);
        }
        wrapp.appendChild(tr);
    });
}


//get data from inputs
function inputsData(obj) {
    let goods = document.querySelector('#goods').value;
    let price = document.querySelector('#price').value;
    let amount = document.querySelector('#amount').value;
    let country = document.querySelector('#country').value;
    let article = document.querySelector('#article').value;
    let time = document.querySelector('#time').value;
    obj = {
        goods: goods,
        price: price,
        amount: amount,
        country: country,
        article: article,
        time: time
    }
    return obj;
}


//check radiobuttons "checked"
function checkFunc() {
    let checkRadioButtons = document.querySelectorAll('.check');
    checkRadioButtons = [...checkRadioButtons];
    let check = checkRadioButtons.filter(function (element) {
        return element.checked;
    });
    return check;
}

//close all windows
function closeWindow() {
    document.querySelector('.modal-window').classList.add('hide');
    let inputs = document.querySelectorAll('.inp-data');
    inputs = [...inputs];
    inputs.forEach(function (element) {
        element.value = '';
    });
}



//create lemited width for pagination

function limitPagination() {
    let active = +document.querySelector('.active').innerHTML;
    let pagination = document.querySelector('.pagination .limit ul');
    let paginationItems = pagination.children;
    if (active + 1 > 5) {
        m += 50;
        pagination.style.marginLeft = -m + 'px';
    }
    else if (active <= 5) {
        m = 0;
        pagination.style.marginLeft = m;
    }
    m = 0;
}


//search data in table
function searchValue(arr, search) {
    let a = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].goods.search(search) !== -1 || arr[i].country.search(search) !== -1) {
            a.push(arr[i]);
        }
    }
    return a;
}


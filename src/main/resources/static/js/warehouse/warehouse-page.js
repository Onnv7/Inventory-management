var btnAdd;
var code;
var namewh;
var address;
var btnDelete;
var btnEdit;
var btnUpdate;
var btnCancel;
var row;
$(document).ready(function () {
    btnAdd = $("#btn-add");
    code = $("#code");
    namewh = $("#name-wh");
    address = $("#address");
    btnDelete = document.querySelectorAll('button[id^=btn-delete-]')
    btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
    btnUpdate = $(".btn-update");
    btnCancel = $(".btn-cancel");
    btnUpdate.hide();
    btnCancel.hide();
    btnAdd.click(function () {
        createWarehouse();
    });

    btnDelete.forEach(btn => {

        btn.addEventListener('click', (e) => deleteWarehouse(e));
    });

    btnEdit.forEach(btn => {
        btn.addEventListener('click', (e) => loadDataToForm(e));
    });

    btnCancel.click(function () {
        btnAdd.show();
        btnUpdate.hide();
        btnCancel.hide();
        code.val('');
        namewh.val('');
        address.val('');
    })

    btnUpdate.click(function (e) {
        updateWarehouse(e);
    });

});
function setEvent() {
    btnDelete = document.querySelectorAll('button[id^=btn-delete-]')
    btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
    btnDelete.forEach(btn => {

        btn.addEventListener('click', (e) => deleteWarehouse(e));
    });

    btnEdit.forEach(btn => {
        btn.addEventListener('click', (e) => loadDataToForm(e));
    });
}

function updateWarehouse(e) {
    url = contextPath + `warehouse/update/${e.target.id}`;
    jsonData = {
        code: code.val(),
        name: namewh.val(),
        address: address.val()
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        alert("Update successful");
        console.log(row);
        row.children[1].textContent = jsonData.code;
        row.children[2].textContent = jsonData.name;
        row.children[3].textContent = jsonData.address;
    }).fail(function () {
        alert("Update failed");
    })
}
function loadDataToForm(e) {
    var id = e.target.id.split('-')[2];
    btnUpdate.attr('id', id);
    row = e.path[2];
    btnAdd.hide();
    btnUpdate.show();
    btnCancel.show();
    code.val(row.children[1].textContent);
    namewh.val(row.children[2].textContent);
    address.val(row.children[3].textContent);
}
function editWarehouse(e) {
    url = contextPath + "warehouse/create";
    jsonData = {
        code: code.val(),
        name: namewh.val(),
        address: address.val()
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        alert("Update successful")
        var table = $("#warehouse-table")
        var count = table[0].children[1].children.length + 1;
        let htmlToAppend = (`
        <tr id="row-${count}">
            <th scope="row">${count}</th>
            <td>${response.code}</td>
            <td>${response.name}</td>
            <td>${response.address}</td>
            <td>
                <button type="submit" class="btn btn-danger"
                id="'btn-delete-${response.id}">
                    Delete
                </button>
                <button type="submit" class="btn btn-success ms-1"
                id="'btn-edit-${response.id}">
                    Edit
                </button>
            </td>
        </tr>
      `);
        $("#warehouse-table tbody").append(htmlToAppend);
    }).fail(function () {
        alert("Create failed");
    })
}
function createWarehouse() {
    url = contextPath + "warehouse/create";
    jsonData = {
        code: code.val(),
        name: namewh.val(),
        address: address.val()
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        alert("Create successful")
        var table = $("#warehouse-table")
        var count = table[0].children[1].children.length + 1;
        let htmlToAppend = (`
        <tr id="row-${count}">
            <th scope="row">${count}</th>
            <td>${response.code}</td>
            <td>${response.name}</td>
            <td>${response.address}</td>
            <td>
                <button type="submit" class="btn btn-danger"
                id="btn-delete-${response.id}">
                    Delete
                </button>
                <button type="submit" class="btn btn-success ms-1"
                id="btn-edit-${response.id}">
                    Edit
                </button>
            </td>
        </tr>
      `);
        $("#warehouse-table tbody").append(htmlToAppend);
        setEvent()
    }).fail(function () {
        alert("Create failed");
        return;
    })
}
function deleteWarehouse(e) {
    var id = e.target.id.split('-')[2];

    url = contextPath + "warehouse/delete/" + id;
    $.get(url).done(function () {
        alert("Delete successful")
        $(`#${e.path[2].id}`).remove();
    })
}
// var csrfHeader = "[[${_csrf.headerName}]]";
//     var csrfToken = "[[${_csrf.token}]]";
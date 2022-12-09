
var warehouse;
var btnDelete;
var btnEdit;
var btnUpdate;
var btnCancel;
var title;
var date;
var note;
var row;
var btnAdd;

$(document).ready(function () {
    btnAdd = $("#btn-add");
    title = $("#title");
    date = $("#date");
    note = $("#note");
    btnDelete = document.querySelectorAll('button[id^=btn-delete-]')
    btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
    btnUpdate = $(".btn-update");
    btnCancel = $(".btn-cancel");
    warehouse = $("#warehouse-select");

    btnUpdate.hide();
    btnCancel.hide();
    warehouse.change(async (e) => {
        getAllExportByWarehouseId(e);

    })

    btnAdd.click(function () {
        createExport();
    })

    btnCancel.click(function () {
        btnAdd.show();
        btnUpdate.hide();
        btnCancel.hide();
        title.val('');
        date.val('');
        note.val('');
    })

    btnUpdate.click(function (e) {
        updateExport(e);
    });
})

function createExport() {
    var idWarehouse = Number(warehouse.val());
    url = contextPath + "invoice/export/create/" + idWarehouse;
    console.log("SAVE", typeof date.val());
    jsonData = {
        title: title.val(),
        date: date.val(),
        note: note.val(),
        type: "export",
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        alert("OK")
        var table = $("#export-table")
        var count = table[0].children[1].children.length + 1;
        let htmlToAppend = (`
        <tr class="inner-box" id="row-${count}">
            <th scope="row">
                <div class="event-date">
                    ${count}
                </div>
            </th>
            <td>
                ${response.title}
            </td>
            <td>
                ${response.date}
            </td>
            <td>
                ${response.note}
            </td>
            <td>
                <div class="primary-btn">
                    <button
                        class="btn btn-danger" id="btn-delete-${response.id}">Delete</button>
                    <button
                        class="btn btn-success" id="btn-edit-${response.id}">Edit</button>
                </div>
            </td>
        </tr>`);
        $("#export-table tbody").append(htmlToAppend);
    }).fail(function () {
        alert("Create failed");
    })
}

function updateExport(e) {
    url = contextPath + `invoice/export/update/${e.target.id}`;
    jsonData = {
        title: title.val(),
        date: date.val(),
        note: note.val(),
        type: "export",
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        alert("UPDATED");
        console.log(row);
        row.children[1].textContent = jsonData.title;
        row.children[2].textContent = jsonData.date;
        row.children[3].textContent = jsonData.note;
    }).fail(function () {
        alert("Update failed");
    })
}
function loadDataToForm(e) {
    var id = e.target.id.split('-')[2];
    row = e.path[3];
    console.log(row, date);

    btnUpdate.attr('id', id);
    btnAdd.hide();
    btnUpdate.show();
    btnCancel.show();
    title.val(row.children[1].textContent.trim());
    date.val(row.children[2].textContent.trim());
    note.val(row.children[3].textContent.trim());
}
function deleteExport(e) {
    var id = e.target.id.split('-')[2];
    console.log(e.path[3]);
    url = contextPath + "invoice/export/delete/" + id;
    $.get(url).done(function () {
        alert("DELETED")
        $(`#${e.path[3].id}`).remove();
    })
}
async function getAllExportByWarehouseId() {
    url = contextPath + "invoice/export/warehouse/" + warehouse.val();

    await $.get(url, function (data) {
        $.each(data, function (index, elm) {
            let htmlToAppend = (`
            <tr class="inner-box" id="row-${index + 1}">
                <th scope="row">
                    ${index + 1}
                </th>
                <td>
                    ${elm.title}
                </td>
                <td>
                    ${elm.date}
                </td>
                <td>
                    ${elm.note}
                </td>
                <td>
                    <div class="primary-btn">
                        <button
                            class="btn btn-danger" id="btn-delete-${elm.id}">Delete</button>
                        <button
                            class="btn btn-success" id="btn-edit-${elm.id}">Edit</button>
                    </div>
                </td>
            </tr>`);
            $("#export-table tbody").append(htmlToAppend);
        })

    }).done(function () {
        alert("OK");
        btnDelete = document.querySelectorAll('button[id^=btn-delete-]')
        btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
        btnDelete.forEach(btn => {
            btn.addEventListener('click', (e) => deleteExport(e));
        });

        btnEdit.forEach(btn => {
            btn.addEventListener('click', (e) => loadDataToForm(e));
        });

    }).fail(function () {
        alert("Failed");
    })

}
var btnDetail;
var warehouse;
var btnDelete;
var btnEdit;
var btnDetailDelete;
var btnDetailEdit;
var btnUpdate;
var btnCancel;
var btnDetailUpdate;
var btnDetailCancel;
var title;
var date;
var note;
var row;
var rowDetail;
var btnAdd;
var btnDetailAdd;
var warehouseId;
var quantityDetail;
var noteDetail;
var invoiceId;
var idProduct;
var selectDetail;

$(document).ready(function () {
    btnAdd = $("#btn-add");
    title = $("#title");
    date = $("#date");
    note = $("#note");
    quantityDetail = $("#quantity-detail")
    noteDetail = $("#note-detail")
    selectDetail = $("#detail-select")
    btnDetailAdd = $("#btn-add-detail");
    btnDelete = document.querySelectorAll('button[id^=btn-delete-]')
    btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
    btnDetail = document.querySelectorAll('button[id^=btn-detail-]')

    btnUpdate = $(".btn-update");
    btnCancel = $(".btn-cancel");
    btnDetailUpdate = $(".btn-update-detail");
    btnDetailCancel = $(".btn-cancel-detail");
    warehouse = $("#warehouse-select");

    btnUpdate.hide();
    btnCancel.hide();
    btnDetailUpdate.hide();
    btnDetailCancel.hide();
    warehouse.change(async (e) => {
        getAllExportByWarehouseId(e);

    })


    btnAdd.click(function () {
        createExport();
    })

    btnDetailAdd.click(function () {
        createInvoiceDetail();
    })

    btnCancel.click(function () {
        btnAdd.show();
        btnUpdate.hide();
        btnCancel.hide();
        title.val('');
        date.val('');
        note.val('');
    })



    btnDetailCancel.click(function () {
        btnDetailAdd.show();
        btnDetailUpdate.hide();
        btnDetailCancel.hide();
        selectDetail.val('');
        quantityDetail.val('');
        noteDetail.val('');
    })

    btnUpdate.click(function (e) {
        updateExport(e);
    });

    btnDetailUpdate.click(function (e) {
        updateInvoiceDetail(e);
    });
})

function createExport() {
    var idWarehouse = Number(warehouse.val());
    url = contextPath + "invoice/export/create/" + idWarehouse;
    // console.log("SAVE", date.val());
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
                    <button type="button" class="btn btn-primary" id="btn-detail-${response.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Show details
                    </button>
                </div>
            </td>
        </tr>`);
        $("#export-table tbody").append(htmlToAppend);
    }).fail(function () {
        alert("Create failed");
    })
}

function createInvoiceDetail() {
    idProduct = Number(selectDetail.val());
    url = contextPath + "invoice/export/details/create/" + invoiceId + "/" + idProduct;

    // console.log("SAVE", date.val());
    jsonData = {
        quantity: quantityDetail.val(),
        note: noteDetail.val()
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        alert("OK")
        var table = $("#detail-table tbody")
        var count = table[0].children.length + 1;
        let htmlToAppend = (`
        <tr class="inner-box" id="row-detail-${count}">
                <th scope="row">
                    ${count}
                </th>
                <td id="product-${response.product.id}">
                    ${response.product.name}
                </td>
                <td>
                    ${response.quantity}
                </td>
                <td>
                    ${response.note}
                </td>
                <td>
                    <div class="primary-btn">
                        <button
                            class="btn btn-danger" id="btn-delete-detail-${response.id}">Delete</button>
                        <button
                            class="btn btn-success" id="btn-edit-detail-${response.id}">Edit</button>
                    </div>
                </td>
            </tr>`);
        $("#detail-table tbody").append(htmlToAppend);


        btnDetailDelete = document.querySelectorAll('button[id^=btn-delete-detail-]')
        btnDetailEdit = document.querySelectorAll('button[id^=btn-edit-detail-]')
        btnDetailDelete.forEach(btn => {
            btn.addEventListener('click', (e) => {
                deleteInvoiceDetail(e);
            });
        });
        btnDetailEdit.forEach(btn => {
            btn.addEventListener('click', (e) => {
                loadDataToChildChildForm(e)
            });
        });
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
        // console.log(row);
        row.children[1].textContent = jsonData.title;
        row.children[2].textContent = jsonData.date;
        row.children[3].textContent = jsonData.note;
    }).fail(function () {
        alert("Update failed");
    })
}

function updateInvoiceDetail(e) {
    url = contextPath + `invoice/export/details/update/${e.target.id}`;
    jsonData = {
        quantity: quantityDetail.val(),
        note: noteDetail.val(),
        product: {
            id: Number(selectDetail.val())
        }
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        alert("UPDATED");
        console.log(rowDetail);
        rowDetail.children[1].textContent = response.product.name;
        rowDetail.children[2].textContent = response.quantity;
        rowDetail.children[3].textContent = response.note;
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

function loadDataToChildChildForm(e) {
    var id = e.target.id.split('-')[3];
    rowDetail = e.path[3];
    var idPro = rowDetail.children[1].getAttribute('id').split('-')[1];
    btnDetailUpdate.attr('id', id);
    btnDetailAdd.hide();
    btnDetailUpdate.show();
    btnDetailCancel.show();
    selectDetail.val(idPro);
    quantityDetail.val(rowDetail.children[2].textContent.trim());
    noteDetail.val(rowDetail.children[3].textContent.trim());
}

function deleteExport(e) {
    var id = e.target.id.split('-')[2];
    // console.log(e.path[3]);
    url = contextPath + "invoice/export/delete/" + id;
    $.get(url).done(function () {
        alert("DELETED")
        $(`#${e.path[3].id}`).remove();
    })
}

function deleteInvoiceDetail(e) {
    var id = e.target.id.split('-')[3];
    // console.log(e.path[3]);
    url = contextPath + "invoice/export/details/delete/" + id;
    $.get(url).done(function () {
        alert("DELETED")
        $(`#${e.path[3].id}`).remove();
    })
}

async function openModal(e) {
    var id = e.target.id.split('-')[2];
    row = e.path[3];
    // console.log(row, date);
    invoiceId = id;
    console.log("🚀 ~ file: invoice-export-page.js:306 ~ openModal ~ invoiceId", invoiceId)


    url = contextPath + "invoice/export/details/" + id;
    let htmlToAppend;
    await $.get(url, function (data) {

        let tbody;
        $("#detail-table tbody").empty();
        $.each(data, function (index, elm) {
            htmlToAppend = (`
            <tr class="inner-box" id="row-detail-${index + 1}">
                <th scope="row">
                    ${index + 1}
                </th>
                <td id="product-${elm.product.id}">
                    ${elm.product.name}
                </td>
                <td>
                    ${elm.quantity}
                </td>
                <td>
                    ${elm.note}
                </td>
                <td>
                    <div class="primary-btn">
                        <button
                            class="btn btn-danger" id="btn-delete-detail-${elm.id}">Delete</button>
                        <button
                            class="btn btn-success" id="btn-edit-detail-${elm.id}">Edit</button>
                    </div>
                </td>
            </tr>`);
            tbody += htmlToAppend;

        })
        $("#detail-table tbody").html(tbody);
        //$('#exampleModal').modal('show');

    }).done(function () {
        btnDetailDelete = document.querySelectorAll('button[id^=btn-delete-detail-]')
        btnDetailEdit = document.querySelectorAll('button[id^=btn-edit-detail-]')
        btnDetailDelete.forEach(btn => {
            btn.addEventListener('click', (e) => {
                deleteInvoiceDetail(e);
            });
        });
        btnDetailEdit.forEach(btn => {
            btn.addEventListener('click', (e) => {
                loadDataToChildChildForm(e)
            });
        });

    }).fail(function () {
        alert("Failed");
    })

    url1 = contextPath + "product/warehouse/" + warehouseId;
    let htmlToAppend1;
    await $.get(url1, function (data) {

        let option = `<option selected="">Open this select menu</option>`;
        // $("#detail-select").empty();
        $.each(data, function (index, elm) {
            htmlToAppend1 = (`
            <option value="${elm.id}">${elm.name}</option>`);
            option += htmlToAppend1;

        })
        $("#detail-select").html(option);
        //$('#exampleModal').modal('show');

    }).done(function () {

    }).fail(function () {
        alert("Failed");
    })



}
async function getAllExportByWarehouseId() {
    url = contextPath + "invoice/export/warehouse/" + warehouse.val();
    warehouseId = warehouse.val();
    await $.get(url, function (data) {
        let html;
        $("#export-table tbody").empty();
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
                        <button type="button" class="btn btn-primary" id="btn-detail-${elm.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Show details
                        </button>
                    </div>
                </td>
            </tr>`);
            html += htmlToAppend;
        })
        $("#export-table tbody").append(html);
    }).done(function () {
        alert("OK");
        btnDelete = document.querySelectorAll('button[id^=btn-delete-]')
        btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
        btnDetail = document.querySelectorAll('button[id^=btn-detail-]')
        btnDetail.forEach(btn => {
            btn.addEventListener('click', (e) => {
                openModal(e);
            });
        });
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
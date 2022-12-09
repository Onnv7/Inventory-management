
var warehouse;
var btnDelete;
var btnEdit;
var btnUpdate;
var btnCancel;
var productName;
var quantity;
var description;
var row;
var btnAdd;
$(document).ready(function () {
    btnAdd = $("#btn-add");
    productName = $("#product-name");
    quantity = $("#quantity");
    description = $("#description");
    btnDelete = document.querySelectorAll('button[id^=btn-delete-]')
    btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
    btnUpdate = $(".btn-update");
    btnCancel = $(".btn-cancel");
    warehouse = $("#warehouse-select");

    btnUpdate.hide();
    btnCancel.hide();
    warehouse.change(async (e) => {
        getAllProductByWarehouseId(e);

    })

    btnAdd.click(function () {
        createProduct();
    })

    btnCancel.click(function () {
        btnAdd.show();
        btnUpdate.hide();
        btnCancel.hide();
        productName.val('');
        quantity.val('');
        description.val('');
    })

    btnUpdate.click(function (e) {
        updateProduct(e);
    });
})

function createProduct() {
    var idWarehouse = Number(warehouse.val());
    url = contextPath + "product/create/" + idWarehouse;
    console.log("🚀 ~ file: product-page.js:51 ~ createProduct ~ url", url)
    jsonData = {
        name: productName.val(),
        quantity: Number(quantity.val()),
        description: description.val(),
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        alert("OK")
        var table = $("#product-table")
        var count = table[0].children[1].children.length + 1;
        let htmlToAppend = (`
        <tr class="inner-box" id="row-${count}">
            <th scope="row">
                <div class="event-date">
                    ${count}
                </div>
            </th>
            <td>
                <div class="event-img">
                    ${response.name}
                </div>
            </td>
            <td>
                <div class="event-wrap">
                    ${response.quantity}
                </div>
            </td>
            <td>
                <div class="r-no">
                    ${response.description}
                </div>
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
        $("#product-table tbody").append(htmlToAppend);
    }).fail(function () {
        alert("Create failed");
    })
}

function updateProduct(e) {
    url = contextPath + `product/update/${e.target.id}`;
    jsonData = {
        name: productName.val(),
        quantity: quantity.val(),
        description: description.val()
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        alert("UPDATED");
        console.log(row);
        row.children[1].textContent = jsonData.name;
        row.children[2].textContent = jsonData.quantity;
        row.children[3].textContent = jsonData.description;
    }).fail(function () {
        alert("Update failed");
    })
}
function loadDataToForm(e) {
    var id = e.target.id.split('-')[2];
    btnUpdate.attr('id', id);
    row = e.path[3];
    btnAdd.hide();
    btnUpdate.show();
    btnCancel.show();
    productName.val(row.children[1].textContent.trim());
    quantity.val(Number(row.children[2].textContent.trim()));
    // quantity.val(row.children[2].textContent.trim());
    description.val(row.children[3].textContent.trim());
}
function deleteProduct(e) {
    var id = e.target.id.split('-')[2];
    console.log(e.path[3]);
    url = contextPath + "product/delete/" + id;
    $.get(url).done(function () {
        alert("DELETED")
        $(`#${e.path[3].id}`).remove();
    })
}
async function getAllProductByWarehouseId() {
    url = contextPath + "product/warehouse/" + warehouse.val();

    await $.get(url, function (data) {
        $.each(data, function (index, elm) {
            let htmlToAppend = (`
            <tr class="inner-box" id="row-${index + 1}">
                <th scope="row">
                    <div class="event-date">
                        ${index + 1}
                    </div>
                </th>
                <td>
                    <div class="event-img">
                        ${elm.name}
                    </div>
                </td>
                <td>
                    <div class="event-wrap">
                        ${elm.quantity}
                    </div>
                </td>
                <td>
                    <div class="r-no">
                        ${elm.description}
                    </div>
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
            $("#product-table tbody").append(htmlToAppend);
        })

    }).done(function () {
        alert("OK");
        btnDelete = document.querySelectorAll('button[id^=btn-delete-]')
        btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
        btnDelete.forEach(btn => {
            btn.addEventListener('click', (e) => deleteProduct(e));
        });

        btnEdit.forEach(btn => {
            btn.addEventListener('click', (e) => loadDataToForm(e));
        });

    }).fail(function () {
        alert("Failed");
    })

}

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
var image;
var display;
$(document).ready(function () {
    display = $("#img-display")
    image = $('#image');
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
    $('input[type = "file"]').change(function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            display.attr("src", e.target.result)
        };
        reader.readAsDataURL(this.files[0]);

    })
    warehouse.change(async (e) => {
        getAllProductByWarehouseId(e);

    })
    btnAdd.click(function () {
        createProduct();
    })

    btnCancel.click(function () {
        display.attr("src", "");
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

function setEvent() {
    btnDelete = document.querySelectorAll('button[id^=btn-delete-]')
    btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
    btnEdit = document.querySelectorAll('button[id^=btn-edit-]')
    btnDelete.forEach(btn => {
        btn.addEventListener('click', (e) => deleteProduct(e));
    });

    btnEdit.forEach(btn => {
        btn.addEventListener('click', (e) => loadDataToForm(e));
    });
}

function createProduct() {
    var idWarehouse = Number(warehouse.val());
    url = contextPath + "product/create/" + idWarehouse;

    var data = new FormData();
    data.append('image', image[0].files[0])
    data.append('quantity', quantity.val())
    data.append('name', productName.val())
    data.append('description', description.val())
    jsonData = {
        name: productName.val(),
        quantity: Number(quantity.val()),
        description: description.val(),
    }
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        processData: false,
        contentType: false,
    }).done(function (response) {
        alert("Create successful")
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
                    ${response.name}
            </td>
            <td>
                    <img src="data:image/jpeg;charset=utf-8;base64,${response.image}" style="
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;" />
            </td>
            <td>
                    ${response.quantity}
            </td>
            <td>
                    ${response.description}
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
        setEvent()
    }).fail(function () {
        alert("Create failed");
    })
}

function updateProduct(e) {
    url = contextPath + `product/update/${e.target.id}`;
    var data = new FormData();
    data.append('image', image[0].files[0])
    data.append('quantity', quantity.val())
    data.append('name', productName.val())
    data.append('description', description.val())
    jsonData = {
        name: productName.val(),
        quantity: quantity.val(),
        description: description.val()
    }
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        processData: false,
        contentType: false,
    }).done(function (response) {
        alert("Update successful");
        row.children[1].textContent = response.name;
        row.children[2].children[0].setAttribute('src', `data:image/jpeg;charset=utf-8;base64,${response.image}`);
        row.children[3].textContent = response.quantity;
        row.children[4].textContent = response.description;
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
    display.attr('src', row.children[2].children[0].getAttribute('src'))
    quantity.val(Number(row.children[3].textContent.trim()));
    // quantity.val(row.children[2].textContent.trim());
    description.val(row.children[4].textContent.trim());
}
function deleteProduct(e) {
    var id = e.target.id.split('-')[2];
    url = contextPath + "product/delete/" + id;
    $.get(url).done(function () {
        alert("Delete successful")
        $(`#${e.path[3].id}`).remove();
    })
}
async function getAllProductByWarehouseId() {
    url = contextPath + "product/warehouse/" + warehouse.val();

    await $.get(url, function (data) {
        let html;
        $("#product-table tbody").empty();
        $.each(data, function (index, elm) {
            let htmlToAppend = (`
            <tr class="inner-box" id="row-${index + 1}">
                <th scope="row">
                        ${index + 1}
                </th>
                <td>
                        ${elm.name}
                </td>
                <td>
                        <img src="data:image/jpeg;charset=utf-8;base64,${elm.image}" style="
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;" />
                </td>
                <td>
                        ${elm.quantity}
                </td>
                <td>
                        ${elm.description}
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
            html += htmlToAppend;
        })
        $("#product-table tbody").append(html);

    }).done(function () {
        // alert("OK");
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
    function setImage(e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            display.attr("src", e.target.result)
        };
        reader.readAsDataURL(this.files[0]);
    }
}
var btnSubmit;
var username;
var password;

$(document).ready(function () {
    btnSubmit = $("#btn-submit");
    username = $("#username");
    password = $("#password");
    btnSubmit.click(function () {
        if (checkForm(username.val(), password.val()) == false) {
            alert("Please fill out the information completely");
            return;
        }
        login();
    });
})

function checkForm(username, password) {
    if (username.trim() === "" ||
        password.trim() === "")
        return false;
    return true;
}

function login() {
    url = contextPath + "login";
    jsonData = {
        username: username.val(),
        password: password.val()
    }
    $.ajax({
        type: "POST",
        url: url,

        data: JSON.stringify(jsonData),
        contentType: "application/json"
    }).done(function (response) {
        if (typeof response === "object") {
            window.location.pathname = "/warehouse"
        }
        else
            alert("Wrong username or password");
    }).fail(function () {
        alert("Login failed");
    })
}
// var csrfHeader = "[[${_csrf.headerName}]]";
//     var csrfToken = "[[${_csrf.token}]]";
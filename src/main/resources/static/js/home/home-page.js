var btnSubmit;
var username;
var password;

$(document).ready(function () {
    btnSubmit = $("#btn-submit");
    username = $("#username");
    password = $("#password");
    btnSubmit.click(function () {
        login();
    });
})

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
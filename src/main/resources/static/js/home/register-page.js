var btnRegister;
var username;
var password;
var rePassword;
// var contextPath = "[[@{/}]]";

$(document).ready(function () {
    btnRegister = $("#btn-register");
    username = $("#username");
    password = $("#password");
    rePassword = $("#rePassword");
    btnRegister.click(function () {
        if (checkForm(username.val(), password.val(), rePassword.val()) == false) {
            alert("Please fill out the information completely");
            return;
        }
        register();
    });
})

function checkForm(username, password, rePassword) {
    if (username.trim() === "" ||
        password.trim() === "" ||
        rePassword.trim() === "")
        return false;
    return true;
}


function register() {
    if (password.val() !== rePassword.val()) {
        alert("Re-password is not valid")
        return;
    }
    else if (password.val().length < 8) {
        alert("Password must be at least 8 characters")
        return;
    }
    url = contextPath + "register";
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
            alert("Register success");
            window.location.pathname = "/login";
        }
        else
            alert("Wrong from server");
    }).fail(function () {
        alert("Register failed");
    })
}
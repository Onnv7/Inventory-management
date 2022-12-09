var btnRegister;
var username;
var password;
var rePassword;
var contextPath = "[[@{/}]]";

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
        else if (checkPwd(password.val(), rePassword.val()) == false) {
            alert("Re-password incorrect");
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
    return false;
}

function checkPwd(password, rePassword) {
    if (password !== rePassword)
        return false;
    return true;
}
function register() {
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
        if (typeof response === "object")
            alert("login success")
        else
            alert("Wrong username or password");
    }).fail(function () {
        alert("Login failed");
    })
}
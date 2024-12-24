document.getElementById("login-button").addEventListener("click", function () {
    const user_number_input_____value = document.getElementById("user-number-input").value;
    fetch("/.netlify/functions/getUserData?number=" + user_number_input_____value).then(fetch_____result => fetch_____result.json()).then(result_____json => {
        if (result_____json && !result_____json.msg) {
            localStorage.setItem("userData", JSON.stringify(result_____json));
            window.location.href = "index.html";
        } else {
            alert("Fel kod!"); // Translates to: 'Wrong authentication key!'
        }
    }).catch(p7 => {
        console.error("Error:", p7);
        alert("An error occurred while trying to fetch user data.");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("no-button").addEventListener("click", function () {
        window.location.href = "https://discord.gg/***REDACTED***";
    });
});

# Fake BankID Analysis

An analysis of a fake digital identification service advertised on the internet.

![image](https://i.imgur.com/g5KFNPR.png)
---

## Disclaimer

This write-up is for **educational purposes only**. I do not condone the development, use, or distribution of fake digital identification software. My role in this investigation was to take down this service to ensure the safety of internet users.

---

## Initial Discovery

Upon visiting the website, I was greeted by a seemingly innocent sushi menu hosted under a domain masquerading as a sushi restaurant. At first glance, nothing indicated the presence of the advertised fake ID service.

![image](https://i.imgur.com/JyjhuQJ.png)

Curiosity led me to add the website to my home screen and open it from there. This time, I encountered a login screen requesting an authentication key.

![image](https://i.imgur.com/xbw7LcO.png)

---

## Investigating Authentication

### Authentication Process

Unable to afford the $5 license for the key, I began analyzing the website. I traced the request to a file named `login.js`, which was heavily obfuscated. Using a private deobfuscation tool, I managed to reveal the following code:

```javascript
document.getElementById("login-button").addEventListener("click", function () {
    const user_number_input_____value = document.getElementById("user-number-input").value;
    fetch("/.netlify/functions/getUserData?number=" + user_number_input_____value)
        .then(fetch_____result => fetch_____result.json())
        .then(result_____json => {
            if (result_____json && !result_____json.msg) {
                localStorage.setItem("userData", JSON.stringify(result_____json));
                window.location.href = "index.html";
            } else {
                alert("Fel kod!"); // Translates to: 'Wrong authentication key!'
            }
        })
        .catch(p7 => {
            console.error("Error:", p7);
            alert("An error occurred while trying to fetch user data.");
        });
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("no-button").addEventListener("click", function () {
        window.location.href = "https://discord.gg/***REDACTED***";
    });
});
```

### Authentication Bypass

To uncover what the system expected as valid authentication data, I bypassed the sushi menu using a [TamperMonkey](https://www.tampermonkey.net/) script:

```javascript
(function() {
    'use strict';
    Object.defineProperty(window.navigator, 'standalone', {
        get: function() {
            return true; 
        },
        configurable: true
    });
})();
```

This bypass revealed the login page, allowing further analysis of the requests and the authentication mechanism.

---

## Further Analysis

### Redirect Mechanism

The website loaded a heavily obfuscated script, `index-4-9S6z9m.js`, responsible for redirecting users. After deobfuscating its 8902 lines, I identified key authentication logic:

```javascript
if (localStorage___item) {
    const v1155 = localStorage___item.number;
    fetch("/.netlify/functions/getUserData?number=" + v1155)
        .then(p832 => p832.json())
        .then(async p833 => {
            if (p833 && !p833.msg) {
                localStorage.setItem("userData", JSON.stringify(p833));
                fetch("/.netlify/functions/attans?userId=" + v1155 + "&action=Gick in i appen");
            } else {
                ...
            }
        });
}
```

### Spoofing Authentication

The service checked for the following JSON structure in `localStorage`:

```json
{ 
    "number": "LICENSE KEY", 
    "ssn": "SOCIAL SECURITY NUMBER", 
    "name": "NAME LASTNAME", 
    "expiry": "9999-99-99", 
    "imageUrl": "URL" 
}
```

To bypass authentication, I spoofed the `localStorage` with a fake JSON payload. Using TamperMonkey, I hooked the `fetch` method to return consistent data, tricking the system into granting access.

---

## Outcome

Providing fake identification services is both unethical and illegal. Through further investigation, including domain research and tracing operational security lapses by the website owner, I identified their true identity. This information was forwarded to both law enforcement and the hosting provider.

---

## Deobfuscated Scripts

The deobfuscated scripts are available in this repository for educational and analytical purposes.

---

### Closing Thoughts

This analysis highlights the importance of robust security practices in both software development and personal online behavior. It also underscores the responsibility we all share to ensure a safer internet for everyone.

---

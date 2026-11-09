const checkBtn = document.getElementById("checkBtn");
const copyBtn = document.getElementById("copyBtn");

const ipAddress = document.getElementById("ipAddress");
const message = document.getElementById("message");

// Определение собственного публичного IP
checkBtn.addEventListener("click", async function() {

    ipAddress.textContent = "Загрузка...";
    message.textContent = "Выполняется запрос...";

    checkBtn.disabled = true;

    try {
        const response = await fetch(
            "https://api.ipify.org?format=json"
        );

        if (!response.ok) {
            throw new Error("Ошибка сервера");
        }

        const data = await response.json();

        ipAddress.textContent = data.ip;
        message.textContent = "IP успешно определён";

    } catch (error) {
        ipAddress.textContent = "ERROR";
        message.textContent = "Не удалось получить IP";
    }

    checkBtn.disabled = false;
});

// Копирование IP
copyBtn.addEventListener("click", async function() {

    const ip = ipAddress.textContent;

    if (ip === "XXX.XXX.XXX.XXX" ||
        ip === "Загрузка..." ||
        ip === "ERROR") {
        message.textContent = "Сначала определи IP";
        return;
    }

    try {
        await navigator.clipboard.writeText(ip);
        message.textContent = "IP скопирован!";
    } catch (error) {
        message.textContent = "Не удалось скопировать";
    }

});

let myEndpoint = "https://vy1trqi66f.execute-api.eu-west-1.amazonaws.com/";

let paris = "faasFranceParis";
let frankfurt = "faasGermanyFrankfurt";
let mumbai = "faasIndiaMumbai";
let ireland = "faasIrelandDublin";
let tokyo = "faasJapanTokyo";
let northVirginia = "faasUsaNorthVirginia";

function readClockTime(response) {
    try {
        const text = response.trim();
        const value = text.startsWith('"') ? JSON.parse(text) : text;
        if (typeof value !== "string" || !/\d{1,2}:\d{2}/.test(value)) {
            return null;
        }
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    } catch {
        return null;
    }
}

function callAwsLambdaFunctionByName(functionName) {
    const city = document.querySelector(`.${functionName}`);
    const status = city.querySelector(".clock-status");

    function showUnavailable(message = "Time unavailable") {
        city.dataset.clockState = "unavailable";
        status.textContent = message;
    }

    if (!myEndpoint || myEndpoint === "<api gateway endpoint>") {
        showUnavailable("API not configured");
        return;
    }

    const request = new XMLHttpRequest();
    request.onload = () => {
        const time = request.status === 200 ? readClockTime(request.responseText) : null;
        if (!time) {
            showUnavailable();
            return;
        }

        setDate(functionName, time);
        status.textContent = time.toLocaleTimeString("en-US");
        city.dataset.clockState = "ready";
    };
    request.onerror = request.ontimeout = request.onabort = () => showUnavailable();

    try {
        request.open("GET", myEndpoint.concat(functionName), true);
        request.timeout = 8000;
        request.send();
    } catch {
        showUnavailable();
    }
}

callAwsLambdaFunctionByName(paris);
callAwsLambdaFunctionByName(frankfurt);
callAwsLambdaFunctionByName(mumbai);
callAwsLambdaFunctionByName(ireland);
callAwsLambdaFunctionByName(tokyo);
callAwsLambdaFunctionByName(northVirginia);

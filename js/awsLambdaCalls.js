let myEndpoint = "<api gateway endpoint>";

let paris = "faasFranceParis";
let frankfurt = "faasGermanyFrankfurt";
let mumbai = "faasIndiaMumbai";
let ireland = "faasIrelandDublin";
let tokyo = "faasJapanTokyo";
let northVirginia = "faasUsaNorthVirginia";

function callAwsLambdaFunctionByName(functionName) {

    let endpoint = myEndpoint.concat(functionName);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(new Date(Date.parse(this.responseText)));
            setDate(functionName, new Date(Date.parse(this.responseText)));
        }
    };
    xhttp.open(
        "GET", endpoint,
        true);
    xhttp.send();
}

callAwsLambdaFunctionByName(paris);
callAwsLambdaFunctionByName(frankfurt);
callAwsLambdaFunctionByName(mumbai);
callAwsLambdaFunctionByName(ireland);
callAwsLambdaFunctionByName(tokyo);
callAwsLambdaFunctionByName(northVirginia)


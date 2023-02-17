/*
The code below allows you to get the timezone of the Region where the Lambda environment
is running.
*/

export const handler = async(event) => {

    const AWS_REGIONS_TO_TIMEZONES = {
        "us-east-1": "America/New_York",
        "us-east-2": "America/New_York",
        "us-west-1": "America/Los_Angeles",
        "us-west-2": "America/Los_Angeles",
        "ap-south-1": "Asia/Kolkata",
        "ap-northeast-3": "Asia/Tokyo",
        "ap-northeast-2": "Asia/Seoul",
        "ap-southeast-1": "Asia/Singapore",
        "ap-southeast-2": "Australia/Sydney",
        "ap-northeast-1": "Asia/Tokyo",
        "ca-central-1": "America/Toronto",
        "eu-central-1": "Europe/Berlin",
        "eu-west-1": "Europe/Dublin",
        "eu-west-2": "Europe/London",
        "eu-west-3": "Europe/Paris",
        "eu-north-1": "Europe/Stockholm",
        "sa-east-1": "America/Sao_Paulo",
      };

    let region = process.env.AWS_REGION;
    let dateObj = new Date().toLocaleString('en-US',
        { timeZone: AWS_REGIONS_TO_TIMEZONES[region]}
    );
    console.log(dateObj);
    const response = {
        statusCode: 200,
        body: JSON.stringify(dateObj),
    };
    return response;
};

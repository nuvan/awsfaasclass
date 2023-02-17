/*
The code below allows you to retrieve the content of a text file stored
in S3, grab the content and send it to the Lambda Caller.
*/

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.handler = async (event, context) => {

      let privateBucket  = "yourbucketname";
      let privateFile    = "yourprivateinformation.txt";
      let privateContent = "";
      
      var params = { 
          Bucket: privateBucket,
          Key: privateFile,
      };
  
      // Retrieve the object
      const privateData = await s3.getObject(params).promise();

      privateContent = privateData.Body.toString('ascii');

      return privateContent;

};

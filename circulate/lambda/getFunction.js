const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const params = {
        TableName: 'YourDynamoDBTableName', // Replace with your actual table name
    };

    try {
        const data = await dynamodb.scan(params).promise(); // Retrieve all listings
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items), // Returning all listings
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // For CORS support
            },
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not retrieve listings' }),
        };
    }
};
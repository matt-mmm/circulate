import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const dynamodb = new DynamoDBClient({ region: 'us-east-2' });

export const handler = async (event) => {
  try {
    // Extract userID from the request path parameters or body
    const { userID } = event.queryStringParameters || {};

    if (!userID) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "userID is required" }),
      };
    }

    // Define parameters for DynamoDB GetItem
    const dbParams = {
      TableName: "userProfile",  
      Key: {
        userID: { S: userID },
      },
    };

    // Fetch user data from DynamoDB
    const data = await dynamodb.send(new GetItemCommand(dbParams));

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    // Convert the DynamoDB response to a usable JSON format
    const user = {
      userID: data.Item.userID.S,
      email: data.Item.email.S,
      phoneNumber: data.Item.phoneNumber.S,
      // Add additional fields as required
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify({ message: "An error occurred", error: error.message }),
    };
  }
};

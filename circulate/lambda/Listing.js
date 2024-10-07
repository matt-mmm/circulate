const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Parse request body to get the data
    const { title, description, imageData } = JSON.parse(event.body);

    // Handle the image upload to S3
    const base64Data = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const s3Params = {
      Bucket: "circulatelistingdata",  
      Key: `images/${Date.now()}.jpeg`,  
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };
    
    // Upload image to S3
    const uploadResult = await s3.upload(s3Params).promise();
    
    // Store form data (including S3 image URL) in DynamoDB
    const dbParams = {
      TableName: "CustomerListing",  
      Item: {
        listingId: Date.now().toString(),  // Unique ID for the listing
        title,
        description,
        imageUrl: uploadResult.Location  // URL of the uploaded image
      }
    };
    
    // Put item into DynamoDB
    await dynamodb.put(dbParams).promise();
    
    // Return a successful response
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",  // CORS - Allow all origins
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
      },
      body: JSON.stringify({ message: 'Listing created successfully!' })
    };
  } catch (error) {
    // Log and return error response
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",  // CORS - Allow all origins
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
      },
      body: JSON.stringify({ message: 'An error occurred', error: error.message })
    };
  }
};

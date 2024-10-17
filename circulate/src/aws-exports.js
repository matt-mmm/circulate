// src/aws-exports.js
const awsconfig = {
    Auth: {
      region: 'us-east-2', // Your AWS region
      userPoolId: 'us-east-2_2lkiHSzpN', // Your Cognito User Pool ID
      userPoolWebClientId: '6sttjboiag1ha957tqt9lha4q8', // Your App Client ID
      mandatorySignIn: true,
      oauth: {
        domain: 'circulatesignup.auth.us-east-2.amazoncognito.com', // Your Cognito domain
        scope: ['email', 'openid', 'profile'],
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/',
        responseType: 'code', // For Authorization Code Grant
      },
    },
  };
  
  export default awsconfig;
  
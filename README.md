## Instructions for local run
This application is created using a specific AWS configuration and has hardcoded region, S3 bucket name and DynamoDB name, therefore the connections to S3 and DynamoDB won't work locally.

### Installation
Clone the repository and install the dependencies.
```
npm install
```

### Run the application
After installing the dependencies, start it with the following
```
npm run start:local
```
This will start a nodemon server.

## Description
The application is tested and runs successfully in AWS environment. For parsing and certificate operation is used the library [`node-forge`](https://www.npmjs.com/package/node-forge). The repository is integrated with AWS Pipelines and triggers a pipeline run on every push to the master branch. The pipeline builds and deploys the application to AWS Lambda. The Lambda function can be triggered manually. The implementation includes:
* Reading a pregenerated certificate from an S3 bucket
* Generating a private key
* Signing the public key with the private key
* Saving the generated signature and the CommonName to a DynamoDB table

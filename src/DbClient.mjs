import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

export class DbClient {
  constructor() {
    this.client = new DynamoDBClient({ region: 'eu-central-1' });
  }

  async insertItem(commonName, signature) {
    const input = {
      TableName: 'sm-certificate-operations',
      Item: {
        CertificateCommonName: {
          S: commonName,
        },
        CertificateSignature: {
          S: signature,
        },
      },
    };
    const command = new PutItemCommand(input);
    const response = await this.client.send(command);

    return response;
  }
}

import fs from 'fs';
import AWS from 'aws-sdk';

export class CertificateReader {
  static readFileFromFS(certificateFilePath) {
    const certificateData = fs.readFileSync(certificateFilePath, 'utf8');

    return certificateData;
  }

  static async readFileFromS3(bucketName, certificateFilePath) {
    const s3 = new AWS.S3();
    const params = {
      Bucket: bucketName,
      Key: certificateFilePath,
    };

    const data = await s3.getObject(params).promise();
    const fileContent = data.Body.toString();
    return fileContent;
  }
}

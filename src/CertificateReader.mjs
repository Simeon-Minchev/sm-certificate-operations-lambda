import fs from 'fs';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export class CertificateReader {
  static readFileFromFS(certificateFilePath) {
    const certificateData = fs.readFileSync(certificateFilePath, 'utf8');

    return certificateData;
  }

  static async readFileFromS3(bucketName, certificateFilePath) {
    const client = new S3Client();
    const params = {
      Bucket: bucketName,
      Key: certificateFilePath,
    };

    const command = new GetObjectCommand(params);
    const response = await client.send(command);
    const fileContentString = response.Body.transformToString();

    return fileContentString;
  }
}

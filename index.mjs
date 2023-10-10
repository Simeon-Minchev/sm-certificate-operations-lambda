import { Certificate } from './src/Certificate.mjs';
import { CertificateReader } from './src/CertificateReader.mjs';
import { DbClient } from './src/DbClient.mjs';

export const handler = async (event) => {
  const certificateData = await CertificateReader.readFileFromS3('sm-certificates-bucket', 'self_signed_certificate.pem');
  const certificate = new Certificate(certificateData);
  const dbClient = new DbClient();

  certificate.generatePrivateKey();

  const signature = certificate.signPublicKey();
  const commonName = certificate.getCommonName();

  await dbClient.insertItem(commonName, signature);

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda Edit!'),
  };

  return response;
};

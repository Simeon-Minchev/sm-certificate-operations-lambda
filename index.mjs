import { Certificate } from "./src/Certificate.mjs";
import { CertificateReader } from "./src/CertificateReader.mjs";

export const handler = async (event) => {
  const certificateData = await CertificateReader.readFileFromS3('self_signed_certificate.pem');

  const certificate = new Certificate(certificateData);

  certificate.generatePrivateKey();

  const signature = certificate.signPublicKey();

  console.log(signature);

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda Edit!'),
  };

  return response;
};
import fs  from "fs";
import forge from "node-forge";

// Create a new X.509 certificate
const cert = forge.pki.createCertificate();

// Set the certificate's subject (entity to which the certificate is issued)
cert.setSubject([{ name: 'commonName', value: 'example.com' }]);
cert.setIssuer([{ name: 'commonName', value: 'example.com' }]); // Self-signed, issuer is the same as subject

// Set a validity period for the certificate (e.g., 1 year)
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

// Generate a key pair (public and private key) for the certificate
const keys = forge.pki.rsa.generateKeyPair(2048);
cert.publicKey = keys.publicKey;
cert.privateKey = keys.privateKey;

// Sign the certificate to make it self-signed
cert.sign(keys.privateKey);

// Convert the certificate to PEM format
const pemCertificate = forge.pki.certificateToPem(cert);

// Save the certificate to a file
const certificateFilePath = 'self_signed_certificate.pem'; // Replace with your desired file path
fs.writeFileSync(certificateFilePath, pemCertificate, 'utf8');

console.log(`Self-signed certificate saved to: ${certificateFilePath}`);
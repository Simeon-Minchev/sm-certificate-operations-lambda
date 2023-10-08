import forge from 'node-forge';

export class Certificate {
  constructor(certificateData) {
    this.certificateData = forge.pki.certificateFromPem(certificateData);
  }

  generatePrivateKey() {
    const newPrivateKey = forge.pki.rsa.generateKeyPair({ bits: 2048 }).privateKey;

    this.certificateData.privateKey = newPrivateKey;

    return newPrivateKey;
  }

  signPublicKey() {
    const md = forge.md.sha256.create();
    md.update(this.certificateData.publicKey, 'utf8');
    const signature = this.certificateData.privateKey.sign(md);
    const signatureHex = forge.util.bytesToHex(signature);

    return signatureHex;
  }

  getCommonName() {
    const commonName = this.certificateData.subject.getField('CN').value;

    return commonName;
  }
}

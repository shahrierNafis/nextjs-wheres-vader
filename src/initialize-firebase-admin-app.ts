import admin from "firebase-admin";

export function createFirebaseAdminApp(privateKey: string) {
  // if already created, return the same instance
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // create certificate
  const cert = admin.credential.cert(JSON.parse(privateKey));

  // initialize admin app
  return admin.initializeApp({
    credential: cert,
  });
}

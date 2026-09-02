// ============================================
// FIREBASE CONFIG — Smart Bundles
// ============================================
// MUHIMU: Weka Firestore Security Rules hizi
// kwenye Firebase Console > Firestore > Rules:
//
// Kabla ya kutumia rules hizi, LAZIMA uwashe Firebase Authentication:
// Firebase Console > Authentication > Sign-in method > wezesha "Email/Password",
// kisha Authentication > Users > Add user (weka email na password yako ya admin).
// Hiyo email/password ndiyo utakayoingiza kwenye admin.html badala ya password ya zamani.
//
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//
//       // Reviews — mtu yeyote anaweza kusoma na kuongeza (ikithibitishwa),
//       // lakini hawezi kubadilisha wala kufuta review ya mwingine.
//       match /reviews/{review} {
//         allow read: if true;
//         allow create: if request.resource.data.name is string
//                       && request.resource.data.message is string
//                       && request.resource.data.stars is int
//                       && request.resource.data.stars >= 1
//                       && request.resource.data.stars <= 5;
//         allow update, delete: if request.auth != null;
//       }
//
//       // Config (bei, sale, chatbot FAQ) — kila mtu anasoma (website inahitaji),
//       // lakini ni ADMIN pekee (aliye-login) anayeweza kuandika/kubadilisha.
//       match /config/{document} {
//         allow read: if true;
//         allow write: if request.auth != null;
//       }
//
//       // Referral codes — mteja anaweza kutengeneza code yake mwenyewe na
//       // kuongeza namba za shares/visits/discount kwa hatua ndogo maalum tu.
//       // Kubadilisha kiasi kikubwa kiholela au ku-reset discount ni ADMIN pekee.
//       match /referrals/{doc} {
//         allow read: if true;
//         allow create: if request.resource.data.code is string
//                       && request.resource.data.phone is string;
//         allow update: if request.auth != null
//                       || (
//                            request.resource.data.diff(resource.data).affectedKeys().hasOnly(['totalInvited','lastSharedAt'])
//                            && request.resource.data.totalInvited == resource.data.totalInvited + 1
//                          )
//                       || (
//                            request.resource.data.diff(resource.data).affectedKeys().hasOnly(['totalDiscount','lastClaimedAt'])
//                            && request.resource.data.totalDiscount == resource.data.totalDiscount + 500
//                          )
//                       || (
//                            request.resource.data.diff(resource.data).affectedKeys().hasOnly(['visits','lastVisitAt'])
//                            && request.resource.data.visits == resource.data.visits + 1
//                          );
//         allow delete: if request.auth != null;
//       }
//
//       // Referral claims — mteja anaweza kutuma dai jipya (pending),
//       // lakini ni ADMIN pekee anayeweza kulithibitisha (approved) au kulifuta.
//       match /referral_claims/{doc} {
//         allow read: if true;
//         allow create: if request.resource.data.status == 'pending'
//                       && request.resource.data.code is string
//                       && request.resource.data.phone is string
//                       && request.resource.data.amount is number;
//         allow update, delete: if request.auth != null;
//       }
//
//       // Bundle clicks — click tracking ya analytics pekee (hakuna pesa
//       // wala data nyeti humu), hivyo hatari ya kuiacha wazi ni ndogo.
//       match /bundle_clicks/{doc} {
//         allow read: if true;
//         allow write: if true;
//       }
//
//       // BandoManager — mfumo tofauti unaotumia PIN ya kawaida (siyo
//       // Firebase Authentication), kwa hiyo request.auth haiwezi kufanya
//       // kazi hapa bila kuubadilisha mfumo huo pia. Imeachwa wazi kama
//       // ilivyokuwa awali ili isivunjike — hii inabaki kuwa hatari ya
//       // usalama inayohitaji kushughulikiwa siku moja (sawa na tatizo
//       // lililokuwepo kwenye admin.html ya Smart Bundles kabla).
//       match /bandoManager/{businessId}/{document=**} {
//         allow read, write: if true;
//       }
//
//       // Maombi ya uwakala — mtu yeyote anaweza kutuma ombi jipya (pending),
//       // lakini ni ADMIN pekee anayeweza kubadilisha hali (kubali/kataa) au kufuta.
//       match /agent_applications/{application} {
//         allow read: if true;
//         allow create: if request.resource.data.name is string
//                       && request.resource.data.phone is string
//                       && request.resource.data.region is string
//                       && request.resource.data.status == 'pending';
//         allow update, delete: if request.auth != null;
//       }
//
//       // Gurudumu la Bahati — mipangilio ya jumla (on/off, kuweka idadi
//       // mpya ya GB) ni ADMIN pekee. Lakini mfumo wa mteja (bila login)
//       unaruhusiwa KUPUNGUZA idadi ya GB kwa MOJA TU kila mara mtu
//       anaposhinda — hii ndiyo operesheni halisi ya "spin" ya mteja wa kawaida.
//       match /wheel_config/{doc} {
//         allow read: if true;
//         allow create, delete: if request.auth != null;
//         allow update: if request.auth != null
//                       || (
//                            resource.data.active == true
//                            && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['freeGbRemaining'])
//                            && request.resource.data.freeGbRemaining == resource.data.freeGbRemaining - 1
//                          );
//       }
//
//       // Spin codes — ADMIN pekee anayeweza kutengeneza code mpya (baada ya
//       // kuthibitisha malipo). Mteja anaweza kubadilisha (kutumia) code
//       // yake MOJA TU, na hawezi kujibadilishia "used:false" arudi nyuma.
//       match /spin_codes/{code} {
//         allow read: if true;
//         allow create: if request.auth != null;
//         allow update: if resource.data.used == false
//                       && request.resource.data.used == true;
//         allow delete: if request.auth != null;
//       }
//     }
//   }

export const firebaseConfig = {
  apiKey: "AIzaSyCVp3VUQVJzVVW_vFgeEcSk0PD57tsP1dg",
  authDomain: "smart-bundles-10d09.firebaseapp.com",
  projectId: "smart-bundles-10d09",
  storageBucket: "smart-bundles-10d09.firebasestorage.app",
  messagingSenderId: "146024000699",
  appId: "1:146024000699:web:4fc1877970d09d3867cd9e"
};

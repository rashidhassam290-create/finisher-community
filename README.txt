FINISHER EMPIRE — LOGIN + SIGNUP VERSION

FILES
- index.html: login/signup page (email + password, Google sign-in, password reset)
- home.html: existing Finisher website; accessible to both signed-in users and guests
- login.css: login page styling
- login.js: Firebase Authentication actions
- firebase-config.js: paste your exact Firebase web config values here
- auth-guard.js: shows signed-in member or GUEST and handles logout/sign-in link
- style.css / script.js: existing website styles and effects

IMPORTANT LIMITATION
GitHub Pages is static hosting. This login flow gates the normal website experience, but it does NOT make static HTML files or their source truly private. Do not put secrets or private member data in these files. For protected private data, use a backend and enforce access with server-side checks / Firebase Security Rules.

SETUP
1. In Firebase Console, open Project settings (gear) > General > Your apps > your Web app > SDK setup and configuration > Config.
2. Open firebase-config.js and replace these placeholders with the exact values shown by Firebase:
   apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId.
   Do not paste your Google password or any service-account private key.
3. Firebase Console > Authentication > Sign-in method: enable Email/Password and Google.
4. Firebase Console > Authentication > Settings > Authorized domains: add your GitHub Pages hostname, e.g. YOUR-USERNAME.github.io (hostname only, no https:// and no /repository-name/).
5. In GitHub repository finisher-community, upload/replace all files from this folder at the ROOT of the main branch. Do not upload the enclosing folder; files must sit directly in repository root.
6. Open https://YOUR-USERNAME.github.io/finisher-community/ . New visitors see the login/signup choices first. They can choose Sign In, Sign Up, or Continue Without Login to browse as a guest. Sign-up creates accounts automatically.
7. Test account creation, sign-out, email login, Google login, and password reset.

Firebase may require email/password to be at least 6 characters. Google sign-in popups can be blocked by browser settings. If Google login fails, check Authorized domains and the error message.

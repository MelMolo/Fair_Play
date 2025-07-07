Here’s a well-structured and professional `README.md` for your **Fair Play Reporting Platform** project:

---

```md
# 🏅 Fair Play Reporting Platform

A modern Next.js web application that empowers users to report acts of **fair play** in their favorite sports. The platform features a simple and elegant user experience, secure form handling with reCAPTCHA validation, and an admin dashboard for managing reports.

---

## ✨ Features

### 🧍‍♂️ User Side

- ✅ **Landing Page** – Clean and classic landing page with a call-to-action.
- ✅ **Report Form** – A smooth, animated form where users can submit reports.
- ✅ **reCAPTCHA Verification** – Google reCAPTCHA v3 integration to prevent spam and bots.
- ✅ **Success Page** – Users are shown a confirmation page after successful submission.

### 🔐 Admin Side

Accessible only to authenticated users via `/admin`.

- 📄 **Reports Table** – View all submitted fair play reports.
- ❌ **Delete Reports** – Remove individual reports or delete all reports.
- 💬 **View Messages** – Open animated modals to view full report messages.
- ⚙ **Settings Page** – Update admin email and password securely.
- 🚫 **Route Protection** – Only logged-in admins can access admin routes.

---

## 🧱 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/docs/app/building-your-application/routing)
- **Auth:** [Auth.js (NextAuth v5)](https://authjs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Forms & Validation:** reCAPTCHA v3 (`react-google-recaptcha`)
- **HTTP:** `fetch`, `axios`
- **State Management:** `useState`, `useContext`, `SWR`
- **Toasts:** `react-hot-toast`
- **Icons:** `react-icons`

---

## 📁 Project Structure
```

/public → Static assets (logos, favicons, etc.)

/src
├── app → Pages and API routes using the App Router
├── components → Reusable + template UI components
├── lib
│ ├── data → Local dummy data, test state, constants
│ ├── fetch → Fake API functions and data fetchers
│ └── server → Server actions (e.g. login, update)
├── types → Global TypeScript types (e.g. `Report`)
└── .env.local → Local environment variables

````

---

## ⚙ Setup & Installation

1. **Clone the repository**

```bash
git clone  https://github.com/treezycoder/reportfairplay.git
cd reportfairplay
````

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root and add the following:

```env
AUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_RECAPTCHA_SITE_KEY=your_site_key
GOOGLE_RECAPTCHA_SECRET_KEY=your_secret_key
```

> You can get reCAPTCHA keys from [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)

4. **Run the development server**

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🔒 Authentication

Admin routes are protected using `Auth.js` (NextAuth v5). Unauthenticated users attempting to access `/admin` or related routes are redirected to `/login`.

---

## 🧪 Local Testing

Since the project uses dummy/fake APIs, you can:

- Submit a report via the form.
- View and manage reports in the admin dashboard.
- Update email/password (simulated).
- Use reCAPTCHA v3 (optionally mocked in local development).

---

## 🧼 Linting & Formatting

```bash
npm run lint
```

Tailwind CSS and ESLint are preconfigured.

---

## 📌 Dependencies

Check `package.json` for full list. Core highlights:

```json
"next": "15.3.5",
"react": "^19.0.0",
"next-auth": "^5.0.0-beta.29",
"tailwindcss": "^4",
"framer-motion": "^12.23.0"
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the platform.

---

## 📄 License

MIT © 2025 — \[Group One]

```

---
```

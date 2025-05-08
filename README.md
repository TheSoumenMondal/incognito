## Incognito

&#x20;

**Incognito** is an open‑source, anonymous feedback platform built with Next.js and Tailwind CSS. It empowers individuals, teams, and communities to share honest messages or feedback without revealing senders' identities.

---

### 🚀 Key Features

* **Complete Anonymity:** No sign‑up or third‑party login required; choose any username and start sharing or receiving feedback instantly.
* **Custom Feedback Links:** Generate and share a unique URL to collect anonymous messages.
* **Real‑Time Updates:** Messages appear in some seconds due the long pollings.
* **Scalable Data Store:** Uses MongoDB for flexible, schema‑free storage and easy horizontal scaling.
* **Responsive Design:** Built with Tailwind CSS v4 to ensure a seamless experience across devices.

---

## 🛠 Tech Stack

* **Framework:** Next.js 15
* **Styling:** Tailwind CSS v4
* **Database:** MongoDB (via Mongoose)
* **Authentication:** Username only (no OAuth)
* **Deployment:** Vercel (recommended)

---

## 📥 Getting Started

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/TheSoumenMondal/incognito.git
cd incognito

# Install dependencies
npm install
```

### 🔧 Configuration

Create a `.env.local` file in the project root and add the following variables:

```dotenv
MONGODB_URI=<your-mongodb-connection-string>
NEXT_PUBLIC_BASE_URL=<your-app-url> # e.g. https://incognito.example.com
```

### 🏃‍♂️ Running Locally

```bash
# Start development server
npm run dev

# Build and preview
npm run build
npm run start
```

Visit `http://localhost:3000` to view the app.

---

## 📂 Project Structure

```
├── src                # Source code
│   ├── app            # App Router entry points
│   │   ├── routes     # Route groups
│   │   │   ├── console
│   │   │   ├── message
│   │   │   │   └── [id]  # Dynamic feedback page
│   │   │   └── settings
│   │   ├── api        # API route handlers
│   │   ├── globals.css# Global styles
│   │   ├── layout.tsx # Root layout
│   │   └── page.tsx   # Home page
│   ├── components    # Reusable UI components
│   ├── hooks         # Custom React hooks
│   ├── lib           # Database and API utilities
│   ├── models        # Mongoose models/schemas
│   ├── providers     # Context providers
│   └── store         # State management (Zustand)
└── README.md          # Project documentation
```

---

## 🚀 Deployment

**On Vercel (Recommended)**

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Set environment variables in the Vercel dashboard.
4. Trigger a deployment — your app will be live on the configured domain.

---

## ❤️ Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request.

Please ensure your code adheres to the existing style and includes relevant tests.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

*Built with ❤️ by Soumen Mondal*

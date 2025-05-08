## Incognito

&#x20;

**Incognito** is an open‑source, anonymous feedback platform built with Next.js and Tailwind CSS. It empowers individuals, teams, and communities to share honest messages or feedback without revealing senders' identities.

---

![App Preview](https://drive.google.com/uc?id=1XJFm9aUjAfOQkOk2E7xWFIi7gYzLDTHn)

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
NEXT_PUBLIC_GITHUB_URL=https://api.github.com/repos/TheSoumenMondal/incognito
NEXT_PUBLIC_GITHUB_TOKEN="your github token"
NEXT_PUBLIC_MONGODB_URI=<your-mongodb-connection-string>
NEXT_PUBLIC_APP_URL=<your-app-url> # e.g. https://incognito.example.com

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

*Built with ❤️ by Soumen Mondal*

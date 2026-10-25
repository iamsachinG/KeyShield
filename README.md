# 🔐 KeyShield | Password Security Analyzer

A privacy-first password security analyzer built with **React, Vite, and Node.js** for a Web Security & Compliance (WSC) educational project.

KeyShield estimates password strength entirely in your browser. Your password is never transmitted to the backend, stored in a database, or sent to external password-analysis services.

<p align="center">
  <strong>Privacy First · Client-Side Analysis · Keyboard Accessible</strong>
</p>

---

## ✨ Features

* **Live Password Analysis:** Evaluate password length, character diversity, repeated characters, common passwords, and predictable sequences.
* **Five-Level Strength Meter:** View an estimated strength rating from Very Weak to Very Strong, with actionable recommendations.
* **Keyboard Friendly:** Press `Enter` to analyze your password. Use keyboard navigation to access interactive controls.
* **Show/Hide Password:** Toggle password visibility whenever needed.
* **Responsive Interface:** A modern dark-themed interface designed for desktop, tablet, and mobile devices.
* **Privacy by Design:** Password analysis runs locally in your browser.
* **Accessible Feedback:** Visible focus indicators, screen-reader announcements, and support for reduced motion.
* **Secure Express API:** A minimal health-check endpoint protected with Helmet, CORS allowlisting, and rate limiting.

## 🛡️ Security & Privacy

KeyShield is designed to minimize the exposure of sensitive information.

| Security Measure              | Implementation                                          |
| ----------------------------- | ------------------------------------------------------- |
| Client-side password analysis | Passwords are evaluated locally in the browser          |
| No password storage           | No database, cookies, local storage, or session storage |
| No password transmission      | The Express API does not receive password input         |
| HTTP security headers         | Helmet                                                  |
| CORS protection               | Configurable frontend-origin allowlist                  |
| Rate limiting                 | Express rate-limit middleware                           |
| Safe rendering                | React rendering without unsafe HTML injection           |
| Error handling                | Centralized API error handling                          |

**Important:** KeyShield provides an educational estimate of password strength. It does not guarantee that a password is secure or uncompromised.

## 🧰 Technology Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* Lucide React
* JavaScript

### Backend

* Node.js
* Express 5
* Helmet
* CORS
* express-rate-limit

### Development Tools

* npm
* Git
* GitHub

## 📸 Application Overview

KeyShield provides a streamlined interface for entering a password, reviewing its estimated strength, and receiving recommendations to improve it.

The interface includes a password input, strength meter, requirements checklist, and privacy notice.

## 📁 Project Structure

```text
KeyShield/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── server/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── package.json
├── package-lock.json
├── .gitignore
├── LICENSE
└── README.md
```

The exact directory contents may vary slightly depending on the current implementation.

## ⚙️ Requirements

Install the following before running the project:

* Node.js 20.19+ or 22.12+
* npm
* Git

Check your installed versions:

```powershell
node --version
npm --version
git --version
```

## 🚀 Installation

### 1. Clone the Repository

```powershell
git clone https://github.com/iamsachinG/KeyShield.git
```

### 2. Enter the Project Directory

```powershell
cd KeyShield
```

### 3. Install Dependencies

```powershell
npm install
npm --prefix client install
npm --prefix server install
```

### 4. Configure Environment Variables

Copy the example environment file:

```powershell
Copy-Item server/.env.example server/.env
```

Adjust the values only when necessary.

### 5. Start the Application

```powershell
npm run dev
```

If the root development script starts both services, the application should be available at:

* **Frontend:** `http://127.0.0.1:5173`
* **Backend Health Check:** `http://127.0.0.1:4000/api/health`

Use `Ctrl + C` to stop the development processes.

### Running Services Separately

Start the backend in one terminal:

```powershell
npm --prefix server run dev
```

Start the frontend in another terminal:

```powershell
npm --prefix client run dev
```

## 🔧 Configuration

The backend uses environment variables defined in `server/.env.example`.

| Variable        | Default                 | Purpose                 |
| --------------- | ----------------------- | ----------------------- |
| `PORT`          | `4000`                  | Backend port            |
| `NODE_ENV`      | `development`           | Application environment |
| `CLIENT_ORIGIN` | `http://127.0.0.1:5173` | Allowed frontend origin |

The backend exposes a health-check endpoint and does not provide a password-analysis endpoint.

**Never commit real secrets or your local `.env` file to GitHub.**

## 🧪 Build & Testing

Run the production build:

```powershell
npm run build
```

Run the available tests:

```powershell
npm test
```

The project tests cover password-strength heuristic behavior, API health responses, security headers, and the absence of an analysis endpoint.

## ⌨️ Keyboard Controls

| Action                        | Expected Behavior                                         |
| ----------------------------- | --------------------------------------------------------- |
| `Enter` in the password input | Analyze the password                                      |
| `Tab`                         | Move between interactive controls                         |
| Show/Hide button              | Toggle password visibility                                |
| Clear button                  | Clear the input and analysis state                        |
| `Escape`                      | Dismiss the analysis result without clearing the password |

The application should preserve normal browser keyboard behavior and provide visible focus indicators.

## 🧠 How Password Analysis Works

KeyShield uses a lightweight JavaScript heuristic to estimate password strength.

The analyzer considers:

* Password length
* Uppercase and lowercase characters
* Numeric and special characters
* Common passwords
* Repeated characters
* Predictable sequences and patterns

The application displays a strength category and recommendations based on the analysis.

### Understanding the Limitations

This is an educational estimator, not a formal password-security assessment.

It does not perform a formal entropy calculation, query breached-password databases, or guarantee resistance to every guessing technique.

For better account security:

* Use a unique password for every account.
* Prefer long, randomly generated passwords or unique passphrases.
* Use a reputable password manager.
* Enable multifactor authentication when available.
* Never reuse a password simply because KeyShield rates it highly.

## 🎓 WSC Concepts Demonstrated

This project demonstrates practical concepts related to Web Security & Compliance:

* Privacy by design and data minimization
* Authentication security and password-strength policies
* HTTP security headers
* CORS configuration
* API rate limiting
* Secure handling of user input
* Accessibility and keyboard navigation
* Security testing and threat awareness
* Limitations of heuristic security analysis

## 🔮 Future Improvements

Potential enhancements include:

* A larger locally bundled common-password dataset
* Improved password predictability analysis
* Additional accessibility testing
* More detailed security recommendations
* Deployment-specific security configuration
* Expanded unit and integration test coverage

Any future breach-checking feature should preserve the principle that the entered password must not be transmitted to an external service.

## 📄 License

This project is licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for details.

## 👨‍💻 Author

**Sachin Gupta**

GitHub: [@iamsachinG](https://github.com/iamsachinG)

Repository: [KeyShield](https://github.com/iamsachinG/KeyShield)

---

<p align="center">
  Built for learning, security awareness, and Web Security & Compliance.
</p>

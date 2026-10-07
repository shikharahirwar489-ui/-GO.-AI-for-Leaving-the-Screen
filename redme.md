# GO. — AI for Leaving the Screen

> **Ask AI. Then leave.**

GO. is a small web experience built around a simple idea:

**What if we used AI to help people spend less time using technology?**

Instead of generating another feed, recommendation loop, or productivity dashboard, GO. creates simple real-world missions that deliberately require you to put your phone away and go outside.

Built for the **Touch Grass** challenge.

---

## 🌱 The Idea

Most digital products are designed to keep your attention.

GO. does the opposite.

You tell GO. how you feel and how much time you have. It creates a small offline activity such as:

* Exploring a different route
* Taking a slow walk
* Observing your surroundings
* Creating something outside
* Having a real conversation
* Taking a quiet break
* Moving without tracking your performance

Then GO. asks you to put your phone away.

**The AI is useful for a few seconds. Then it gets out of your way.**

---

## ✨ Features

* 🎯 **Personalized missions**
* 🌳 **Outdoor and offline activities**
* 📵 **Screen-off countdown**
* 🧭 Multiple activity vibes
* ⏱️ Custom mission durations
* 👥 Solo, friend, family, or group options
* 📍 Different environment options
* 📝 Optional personal constraints
* 💾 Local mission history
* ✅ Mission completion tracking
* 📱 Responsive design
* 🔒 No account required
* 🌐 Works locally in the browser

---

## 🧠 Mission Vibes

GO. currently supports six different directions:

| Vibe       | Example                                  |
| ---------- | ---------------------------------------- |
| 🌲 Explore | Discover something new around you        |
| 🏃 Move    | Simple physical movement                 |
| 🎨 Create  | Make something with your surroundings    |
| 👀 Notice  | Pay attention to things normally ignored |
| 🤝 Connect | Spend time with another person           |
| 🌿 Calm    | Slow down and disconnect                 |

---

## 🚀 How It Works

```text
Choose a vibe
      ↓
Choose your available time
      ↓
Choose who you're with
      ↓
Choose your environment
      ↓
Add an optional constraint
      ↓
GO. creates a mission
      ↓
10-second screen-off countdown
      ↓
📵 Put the phone away
      ↓
🌱 Touch grass
```

---

## 🛠️ Tech Stack

The current frontend is intentionally simple.

* HTML5
* CSS3
* Vanilla JavaScript
* Browser LocalStorage
* No frontend framework
* No database
* No external UI library

### AI Architecture

The project is designed to connect to an **open-weight AI model** running locally.

Planned architecture:

```text
              ┌─────────────────┐
              │   GO. Frontend  │
              │ HTML/CSS/JS     │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Local Backend   │
              │ /api/generate   │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Open-Weight LLM │
              │ Local Inference │
              └─────────────────┘
                       │
                       ▼
                 Mission JSON
```

This keeps private API keys out of the browser and makes the AI component suitable for an open-AI/open-weight workflow.

---

## 📂 Project Structure

```text
GO/
│
├── index.html
├── style.css
├── app.js
│
└── README.md
```

### `index.html`

Contains the application structure and interface.

### `style.css`

Contains the visual design, responsive layout, animations, buttons, cards, and mobile styling.

### `app.js`

Contains:

* Mission generation
* Mission templates
* User preferences
* Countdown
* Mission completion
* Local history
* LocalStorage
* AI integration hook

---

## 💻 Run Locally

No installation is currently required.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/go-touch-grass.git
```

### 2. Open the project

```bash
cd go-touch-grass
```

### 3. Run it

Open:

```text
index.html
```

in your browser.

That's it.

---

## 🤖 AI Integration

The current version includes an AI integration point inside:

```javascript
async function generateWithAI(input) {
    // AI integration goes here
}
```

The application currently falls back to locally stored missions so that the interface remains usable even without an AI backend.

The intended next step is connecting this endpoint to a locally running open-weight model.

For example:

```text
Browser
   ↓
/api/generate
   ↓
Local inference server
   ↓
Open-weight model
   ↓
Generated mission
```

### Why local AI?

Running an open-weight model locally provides:

* Better privacy
* No browser API keys
* Offline potential
* Lower operating cost
* More control over the AI
* A stronger connection to open innovation

---

## 🧩 Mission Output

The AI is expected to return structured information similar to:

```json
{
  "title": "The Three-Turn Walk",
  "vibe": "Explore",
  "duration": 20,
  "description": "Leave your normal route and discover something new nearby.",
  "steps": [
    "Start somewhere familiar.",
    "Take a different safe route.",
    "Notice three things you normally ignore.",
    "Return without using your phone."
  ],
  "rule": "Your phone stays in your pocket."
}
```

This makes the frontend independent from the specific AI model being used.

---

## 🔐 Privacy

GO. is designed around minimal data collection.

The current frontend:

* Does not require an account
* Does not require a database
* Stores mission history locally in the browser
* Does not require a cloud account
* Does not need personal information

Mission history is stored using browser `localStorage`.

---

## 🛡️ Safety

GO. is designed for normal, everyday outdoor activities.

Missions should never require users to:

* Enter restricted areas
* Approach dangerous wildlife
* Climb unsafe structures
* Cross dangerous roads
* Trespass
* Perform dangerous challenges
* Put themselves or others at risk

**Safety always overrides the mission.**

---

## 🌍 Why Open Innovation Matters

AI is usually optimized to capture more attention.

GO. explores a different question:

> **Can AI be designed to reduce our dependence on technology instead?**

Open models make it possible for developers to experiment with that idea without depending entirely on closed platforms.

The model does not need to become the destination.

It can simply be a tool that helps someone decide:

**"What should I do outside right now?"**

Then the user closes the screen.

---

## 🎯 Built for the "Touch Grass" Challenge

GO. was created around the challenge:

> **Use open-source/open-weight AI to help people get off screens and into the real world.**

The project intentionally reverses the normal relationship between AI and attention.

Instead of:

```text
AI → More screen time
```

GO. aims for:

```text
AI → Mission → Phone away → Real world
```

---

## 🚧 Current Status

### Completed

* [x] Responsive interface
* [x] Mission builder
* [x] Six mission categories
* [x] Offline demo generation
* [x] Countdown
* [x] Mission history
* [x] Completion tracking
* [x] LocalStorage
* [x] Safety guidance
* [x] AI integration architecture

### In Progress

* [ ] Connect open-weight local LLM
* [ ] AI-generated missions
* [ ] Structured AI JSON output
* [ ] Better mission personalization
* [ ] Optional location-aware mission generation
* [ ] More outdoor mission types

---

## 🔮 Future Ideas

Possible future versions could include:

* 🌳 Nature identification
* 🐦 Bird-call challenges
* 🌦️ Weather-aware missions
* 🗺️ Route generation
* 🏃 Walking/running missions
* 👨‍👩‍👧 Family missions
* 👥 Group challenges
* 🏆 Community challenges
* 📊 Offline activity statistics
* 📱 Progressive Web App support
* 🤖 Fully local AI generation

The goal is not to build another social network.

The goal is to make the phone **less necessary**.

---

## 🤝 Contributing

Contributions are welcome.

If you have an idea for a better offline mission, AI architecture, accessibility improvement, or new way to help people disconnect from screens, feel free to open an issue or pull request.

### Suggested contribution flow

```text
Fork
  ↓
Create a branch
  ↓
Make your changes
  ↓
Test locally
  ↓
Open a Pull Request
```

---

## 📜 License

This project is intended to be open and easy to experiment with.

Add your preferred open-source license here, such as:

```text
MIT License
```

---

## 👨‍💻 Built With

Built with curiosity, vanilla web technologies, and the belief that sometimes the best AI interaction is the one that ends with:

# GO.

🌱 **Ask AI. Then leave.**

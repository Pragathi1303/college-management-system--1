# React Hooks Demo: Props, useState, useEffect & localStorage

This project demonstrates the use of React Hooks (useState, useEffect) along with Props and browser localStorage in a modern React application.

## 🎯 Features Implemented

✅ **useState** — Manages form inputs and saved profile state  
✅ **useEffect** — Loads data from localStorage when page mounts  
✅ **Props** — Passes saved user data from parent to child component  
✅ **localStorage** — Persists user profile across browser sessions  
✅ **Functional Components** — Modern React with hooks, no class components  

---

## 📂 Project Structure

```
src/
├── Pages/
│   └── UserProfile.jsx      ← Parent component (form + state management)
├── Components/
│   └── UserCard.jsx          ← Child component (displays data via props)
├── Routes/
│   └── AppRoutes.jsx         ← Routing configuration
└── Css/
    └── style.css             ← Styling
```

---

## 🧩 Component Breakdown

### **1. UserProfile.jsx (Parent Component)**

**Responsibilities:**
- Manage form input state with `useState`
- Save/load data from `localStorage`
- Pass saved profile to child via `Props`

**useState Hooks:**
```javascript
const [form, setForm] = useState(EMPTY_FORM);       // Current form values
const [savedUser, setSavedUser] = useState(null);   // Saved profile for display
const [saved, setSaved] = useState(false);          // Success toast flag
```

**useEffect Hook:**
```javascript
useEffect(() => {
  const stored = localStorage.getItem("campusUserProfile");  // READ from localStorage
  if (stored) {
    const parsed = JSON.parse(stored);
    setSavedUser(parsed);  // Populate profile card
    setForm(parsed);       // Pre-fill form fields
  }
}, []); // Empty array = runs ONCE on mount
```

**localStorage Methods:**
- `localStorage.setItem(key, JSON.stringify(data))` → Save data
- `localStorage.getItem(key)` → Retrieve data
- `localStorage.removeItem(key)` → Delete data

**Props Usage:**
```javascript
<UserCard user={savedUser} />  // Pass savedUser state down as "user" prop
```

---

### **2. UserCard.jsx (Child Component)**

**Responsibilities:**
- Receive user data through `Props`
- Display profile in a styled card
- Show placeholder if no data exists

**Props Destructuring:**
```javascript
function UserCard({ user }) {  // Receives "user" prop from parent
  if (!user || !user.name) {
    return <div>No profile saved yet...</div>;
  }
  
  const { name, email, phone, course, city, bio } = user;
  // Display all fields...
}
```

**Key Points:**
- Props are **read-only** — child cannot modify them
- Props flow **one-way** from parent → child
- When parent's `savedUser` state changes, child automatically re-renders

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│           UserProfile (Parent)                  │
│                                                 │
│  ┌──────────┐     ┌────────────┐               │
│  │ useState │ ──▶ │ form state │               │
│  └──────────┘     └────────────┘               │
│                          │                      │
│                          ▼                      │
│                   ┌─────────────┐               │
│                   │ handleSave  │               │
│                   └──────┬──────┘               │
│                          │                      │
│                          ▼                      │
│              localStorage.setItem()             │
│                          │                      │
│                          ▼                      │
│              ┌────────────────────┐             │
│              │ setSavedUser(form) │             │
│              └─────────┬──────────┘             │
│                        │                        │
│        ┌───────────────▼───────────┐            │
│        │  <UserCard user={...} />  │ ← Props    │
│        └───────────────────────────┘            │
│                                                 │
└─────────────────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   UserCard (Child)    │
         │                       │
         │  Receives "user" prop │
         │  Displays profile     │
         │  (read-only)          │
         └───────────────────────┘
```

---

## 🚀 How to Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm start
   ```

3. **Open Browser:**
   Navigate to `http://localhost:3000/profile`

---

## 💡 Key Concepts Explained

### **useState**
- Creates state variables in functional components
- Returns `[currentValue, setterFunction]`
- Triggers re-render when state changes

```javascript
const [form, setForm] = useState({ name: "", email: "" });
setForm({ name: "John", email: "john@example.com" }); // Update state
```

### **useEffect**
- Runs side effects (API calls, localStorage reads, subscriptions)
- Dependency array controls when it runs:
  - `[]` → Run once on mount
  - `[dep]` → Run when `dep` changes
  - No array → Run after every render

```javascript
useEffect(() => {
  // This runs ONCE when component mounts
  const data = localStorage.getItem("key");
  setData(data);
}, []); // Empty dependencies
```

### **Props**
- Mechanism to pass data from parent → child
- Read-only in the child component
- Changes in props trigger child re-render

```javascript
// Parent
<UserCard user={savedUser} />

// Child
function UserCard({ user }) {
  return <h1>{user.name}</h1>;
}
```

### **localStorage**
- Browser API for persistent key-value storage
- Data survives page reloads
- Stores strings only (use JSON.stringify/parse for objects)

```javascript
// Save
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));

// Retrieve
const user = JSON.parse(localStorage.getItem("user"));

// Delete
localStorage.removeItem("user");
```

---

## 📝 Code Highlights

### Controlled Inputs (useState)
```javascript
<input
  type="text"
  name="name"
  value={form.name}                    // Controlled by state
  onChange={(e) => setForm({           // Update state on change
    ...form,
    [e.target.name]: e.target.value
  })}
/>
```

### Loading Data on Mount (useEffect)
```javascript
useEffect(() => {
  const stored = localStorage.getItem("campusUserProfile");
  if (stored) {
    setSavedUser(JSON.parse(stored));  // Populate child component
  }
}, []); // Run once
```

### Passing Props
```javascript
// Parent passes savedUser down
<UserCard user={savedUser} />

// Child receives and uses it
function UserCard({ user }) {
  return <div>{user.name}</div>;
}
```

---

## 🎨 UI Features

- ✨ Modern gradient backgrounds
- 🎯 Responsive grid layout
- 🔔 Success toast on save
- 🧹 Clear button to reset everything
- 📱 Mobile-friendly design

---

## 🛠️ Technologies Used

- **React 18** — Latest React with hooks
- **React Router** — Client-side routing
- **CSS3** — Custom styling with gradients & animations
- **localStorage** — Browser storage API

---

## 📚 Learning Outcomes

By exploring this implementation, you'll understand:

1. ✅ How **useState** manages component state
2. ✅ How **useEffect** runs side effects on mount
3. ✅ How **Props** pass data parent → child
4. ✅ How **localStorage** persists data in the browser
5. ✅ How controlled inputs work in React
6. ✅ How to structure parent-child component relationships

---

## 🔗 Navigation

Access the demo at: `/profile` route in the application

---

## 📖 Additional Notes

- All form fields are controlled components (value tied to state)
- useEffect dependency array `[]` ensures it runs only once
- Props flow is unidirectional (parent → child only)
- localStorage data persists even after closing the browser
- JSON.parse/stringify handles object serialization

---

## 🎓 Best Practices Followed

✔ Functional components with hooks  
✔ Controlled form inputs  
✔ Single source of truth (state)  
✔ Proper useEffect dependencies  
✔ Props validation via conditional rendering  
✔ Clean separation of concerns (parent manages state, child displays)  

---

**Built with ❤️ for learning React fundamentals**

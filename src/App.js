import { useState } from "react";
import './style.css'

const formFields = [
  { name: 'email', placeholder: 'example@mail.com', type: 'email' },
  { name: 'username', placeholder: 'username', type: 'text' },
  { name: 'password', placeholder: 'password', type: 'password' },
]

function App() {
  return (
    <div>
      <h1>hello</h1>
      <Forms />
    </div>
  );
}

export default App;

function Forms() {
  const [values, setValues] = useState({ email: '', username: '', password: '' });
  const [messages, setMessages] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? { text: 'Email is correct', ok: true }
          : { text: 'Enter correct email (example@mail.com)', ok: false };
      case 'username':
        return value.length >= 3
          ? { text: 'Username is correct', ok: true }
          : { text: 'Username has to be not less than 3 symbols', ok: false };
      case 'password':
        return value.length >= 6
          ? { text: 'Password is correct', ok: true }
          : { text: 'Password has to be not less than 6 symbols', ok: false };
      default:
        return null;
    }
  };

  const handleConfirm = (name) => {
    const result = validate(name, values[name]);
    setMessages(prev => ({ ...prev, [name]: result }));
  };

  return (
    <>
      {formFields.map((field) => (
        <div className="form" key={field.name}>
          <div className="content">
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(e) =>
                setValues(prev => ({ ...prev, [field.name]: e.target.value }))
              }
            />
            <button
              className="confirmBtn"
              onClick={() => handleConfirm(field.name)}
            >
              Confirm
            </button>
          </div>
          {messages[field.name] && (
            <p className={messages[field.name].ok ? 'msg-ok' : 'msg-error'}>
              {messages[field.name].text}
            </p>
          )}
        </div>
      ))}
    </>
  );
}
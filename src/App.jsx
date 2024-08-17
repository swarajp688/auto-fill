import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [inputIds, setInputIds] = useState({});
  const [elId, setElId] = useState('');
  const [elValue, setElValue] = useState('');

  useEffect(() => {
    try {
      const ids = JSON.parse(localStorage.getItem('inputIds'));
      console.log(ids);
      if (Object.keys(ids).length) {
        setInputIds(ids);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(elId && elValue){
      setInputIds({...inputIds, [elId]: elValue});
      localStorage.setItem('inputIds', JSON.stringify({...inputIds, [elId]: elValue}));
      setElId('');
      setElValue('');
    } else {
      alert('Please fill the form');
    }
  }

  const handleFieldChange = (e) => {
    setInputIds({...inputIds, [e.target.id]: e.target.value});
    localStorage.setItem('inputIds', JSON.stringify({...inputIds, [e.target.id]: e.target.value}));
  }
  const handleAutoFill = () => {
    Object.keys(inputIds).forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.value = inputIds[id];
      }
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-field">
          <label htmlFor="el-id">Element ID</label>
          <input name="el-id" value={elId} onChange={(e) => setElId(e.target.value)} required/>
        </div>
        <div className="input-field">
          <label htmlFor="el-value">Element Value</label>
          <input name="el-value" value={elValue} onChange={(e) => setElValue(e.target.value)} required/>
        </div>
        <button type="submit">Add Input</button>
      </form>
      <div>
        <button onClick={() => {
            localStorage.removeItem('inputIds');
            setInputIds({});
          }}>Clear All</button>
        <button onClick={handleAutoFill}>Autofill</button>
      </div>
      <div className="filed-list">
        {Object.keys(inputIds).map((id) => (
          <div key={id} className="field-item">
            <p>{id}</p>
            <input id={id} defaultValue={inputIds[id]} value={inputIds[id]} onChange={handleFieldChange} />
          </div>
        ))}
      </div>

    </>
  )
}

export default App


import axios from "axios";
import { useState } from "react";
import './SenderPage.css'; 

function SenderPage() {
  const [message, setMessage] = useState('');
  const [firstint, setFirstInt] = useState('');
  const [secondint, setSecondInt] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const handleSend = () => {
    axios.post('http://localhost:5000/send', {
      message,
      firstint: parseInt(firstint, 10),  
      secondint: parseInt(secondint, 10),
    })
    .then(response => {
        setReceivedMessage(response.data.encrypted);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleCopy = () => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = receivedMessage;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
  };

  return (
    <div className="sender-container">
      <h2>Sender Frontend</h2>
      <textarea
        className="input-text"
        placeholder="Enter text to Encrypt"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <br />
      <label className="label-input">
        First Integer:
        <input
          type="number"
          className="input-field"
          value={firstint}
          onChange={(e) => setFirstInt(e.target.value)}
        />
      </label>
      <br />
      <label className="label-input">
        Second Integer:
        <input
          type="text"
          className="input-field"
          value={secondint}
          onChange={(e) => setSecondInt(e.target.value)}
        />
      </label>
      <br />
      <button className="send-button" onClick={handleSend}>Encrypt Message</button>
      {receivedMessage && <>
      <br />
      <div className="result-container">
        <strong>Encrypted Message:</strong> {receivedMessage}
        <button className="copy-button" onClick={handleCopy}>Copy to Clipboard</button>
      </div>
      </>}
    </div>
  );
}

export default SenderPage;

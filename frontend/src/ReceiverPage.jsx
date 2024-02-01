/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import './SenderPage.css'

function ReceiverPage() {
    const [message, setMessage] = useState('');
  const [firstint, setfirstint] = useState('');
  const [secondint, setsecondint] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const handleReceive = () => {
    axios.post('http://localhost:5000/receive', {
        message,
        firstint: parseInt(firstint, 10),  
        secondint: parseInt(secondint, 10),
    })
    .then(response => {
      setReceivedMessage(response.data.decmessage);
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
      <h2>Reicever Frontend</h2>
      <textarea
        className="input-text"
        placeholder="Enter Encrypted Text: "
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
          onChange={(e) => setfirstint(e.target.value)}
        />
      </label>
      <br />
      <label className="label-input">
        Second Integer:
        <input
          type="text"
          className="input-field"
          value={secondint}
          onChange={(e) => setsecondint(e.target.value)}
        />
      </label>
      <br />
      <button className="send-button" onClick={handleReceive}>Decrypt Message</button>
      {receivedMessage &&
      <>
      <br />
      <div className="result-container">
        <strong>Message:</strong> {receivedMessage}
        {/* <button className="copy-button" onClick={handleCopy}>Copy to Clipboard</button> */}
      </div>
      </>}
      
    </div>
  );
}

export default ReceiverPage

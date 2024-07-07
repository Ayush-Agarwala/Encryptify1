/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import './SenderPage.css'

function Receiverwithstego() {
  const [firstint, setFirstInt] = useState('');
  const [secondint, setSecondInt] = useState('');
  const [stegoImage, setStegoImage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState('');
  const [loading,setloading] = useState(false);

  const handleImageUpload = (e) => {
    setStegoImage(e.target.files[0]);
  };

  const handleReceive = () => {
    if (!stegoImage) {
      alert("Please upload a stego image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result.split(',')[1];
      setloading(true);

      axios.post('http://localhost:5000/receive', {
        firstint: parseInt(firstint, 10),
        secondint: parseInt(secondint, 10),
        image: base64Image,
      })
      .then(response => {
        setReceivedMessage(response.data.message);
        setloading(false);
      })
      .catch(error => {
        console.error(error);
        setloading(false);
      });
    };
    reader.readAsDataURL(stegoImage);
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
      <h2>Receiver Frontend</h2>
      <label className="label-input">
        Upload Stego Image:
        <input
          type="file"
          accept="image/*"
          className="input-field"
          onChange={handleImageUpload}
        />
      </label>
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
      <button className="send-button" onClick={handleReceive}>Decrypt Message</button>
      {loading && (
        <div className="loading-text" >Decrypting message, please wait...</div>
      )}
      {!loading && receivedMessage && (
        <>
          <br />
          <div className="result-container">
            <strong>Message:</strong> {receivedMessage}
            <button className="copy-button" onClick={handleCopy}>Copy to Clipboard</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Receiverwithstego;

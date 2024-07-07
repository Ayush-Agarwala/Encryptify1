import axios from "axios";
import { useState } from "react";
import './SenderPage.css'; 

function Sendersteg() {
  const [message, setMessage] = useState('');
  const [firstint, setFirstInt] = useState('');
  const [secondint, setSecondInt] = useState('');
  const [image, setImage] = useState(null);
  const [stegoImage, setStegoImage] = useState('');

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSend = () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result.split(',')[1];

      axios.post('http://localhost:5000/send', {
        message,
        firstint: parseInt(firstint, 10),  
        secondint: parseInt(secondint, 10),
        image: base64Image,
      })
      .then(response => {
        setStegoImage(`data:image/png;base64,${response.data.image}`);
      })
      .catch(error => {
        console.error(error);
      });
    };
    reader.readAsDataURL(image);
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
      <label className="label-input">
        Upload Image:
        <input
          type="file"
          accept="image/*"
          className="input-field"
          onChange={handleImageUpload}
        />
      </label>
      <br />
      <button className="send-button" onClick={handleSend}>Encrypt Message</button>
      {stegoImage && (
        <>
          <br />
          <div className="result-container">
            <strong>Stego Image:</strong>
            <br />
            <img src={stegoImage} alt="Stego" className="stego-image"/>
            <a href={stegoImage} download="stego_image.png" className="download-button">Download Stego Image</a>
          </div>
        </>
      )}
    </div>
  );
}

export default Sendersteg;

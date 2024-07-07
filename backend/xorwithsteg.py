from flask import Flask, json, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import io
import base64
import numpy as np

app = Flask(__name__)
CORS(app)

def combinekey(userinput1, userinput2):
    combinedkey = userinput1 ^ userinput2
    return combinedkey

def encrypt_data(message, key):
    encrypted_message = []
    for char in message:
        encrypted_char = chr(ord(char) ^ key)
        encrypted_message.append(encrypted_char)
    return ''.join(encrypted_message)

def decrypt_data(encrypted_message, key):
    return encrypt_data(encrypted_message, key)

def encode_image(image, message):
    width, height = image.size
    encoded_image = image.copy()
    message += chr(0)
    binary_message = ''.join([format(ord(c), '08b') for c in message])
    
    data_index = 0
    for y in range(height):
        for x in range(width):
            pixel = list(image.getpixel((x, y)))
            for i in range(3):
                if data_index < len(binary_message):
                    pixel[i] = int(format(pixel[i], '08b')[:-1] + binary_message[data_index], 2)
                    data_index += 1
            encoded_image.putpixel((x, y), tuple(pixel))
    return encoded_image

def decode_image(image):
    binary_message = ''
    for y in range(image.height):
        for x in range(image.width):
            pixel = list(image.getpixel((x, y)))
            for i in range(3):
                binary_message += format(pixel[i], '08b')[-1]
    
    message = ''
    for i in range(0, len(binary_message), 8):
        byte = binary_message[i:i+8]
        char = chr(int(byte, 2))
        if char == chr(0):
            break
        message += char
    return message

@app.route('/send', methods=['POST'])
def send_message():
    data_str = request.get_data(as_text=True)
    data = json.loads(data_str)
    message = data.get('message')
    firstint = data.get('firstint')
    secondint = data.get('secondint')
    image_data = data.get('image')

    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes))

    combined_key = combinekey(firstint, secondint)
    encrypted_data = encrypt_data(message, combined_key)
    
    stego_image = encode_image(image, encrypted_data)
    byte_array = io.BytesIO()
    stego_image.save(byte_array, format='PNG')
    encoded_image_data = base64.b64encode(byte_array.getvalue()).decode('utf-8')

    return jsonify({'status': 'Message sent successfully', 'image': encoded_image_data})

@app.route('/receive', methods=['POST'])
def get_message():
    data_str = request.get_data(as_text=True)
    data = json.loads(data_str)
    firstint = data.get('firstint')
    secondint = data.get('secondint')
    image_data = data.get('image')

    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes))

    combined_key = combinekey(firstint, secondint)
    encrypted_message = decode_image(image)
    decrypted_message = decrypt_data(encrypted_message, combined_key)

    return jsonify({'status': 'Message received successfully', 'message': decrypted_message})

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, json, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
def combinekey(userinput1,userinput2):
    combinedkey=userinput1^userinput2

    return combinedkey

def encrypt_data(message, key):
    encrypted_message = []
    

    for char in message:
        
        encrypted_char = chr(ord(char) ^ key)
        encrypted_message.append(encrypted_char)        

    return ''.join(encrypted_message)

def decrypt_data(encrypted_message, key):
    
    return encrypt_data(encrypted_message, key)



@app.route('/send', methods=['POST'])
def send_message():
    data_str = request.get_data(as_text=True)
    data = json.loads(data_str)
    message = data.get('message')
    firstint = data.get('firstint')
    secondint = data.get('secondint')

    combined_key = combinekey(firstint , secondint)
    encrypted_data = encrypt_data(message, combined_key)
    return jsonify({'status': 'Message sent successfully',
                    'encrypted': encrypted_data})

@app.route('/receive', methods=['POST'])
def get_message():
    data_str = request.get_data(as_text=True)
    data = json.loads(data_str)
    message = data.get('message')
    firstint = data.get('firstint')
    secondint = data.get('secondint')

    combined_key = combinekey(firstint , secondint)
    encrypted_data = encrypt_data(message, combined_key)
    return jsonify({'status': 'Message sent successfully',
                    'decmessage': encrypted_data})



if __name__ == '__main__':
    app.run(debug=True)

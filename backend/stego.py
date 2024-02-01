import base64
from stegano import lsb
import matplotlib.pyplot as plt


def hide_message_in_image(message, image_path):
    # Use steganography to hide the encrypted message in the image
    encrypted_message = base64.b64encode(message).decode('utf-8')
    secret = lsb.hide(image_path, encrypted_message)
    secret.save('output_image.png')
    

def extract_message_from_image(secret_image_path):
    # Use steganography to reveal the hidden message from the image
    revealed_message = lsb.reveal(secret_image_path)
    decoded_message = base64.b64decode(revealed_message).decode('utf-8')
    return decoded_message

# Example Usage:
message_to_hide = b'Techno India'
inputt=plt.imread('lena.jpeg')

plt.subplot(121)
plt.title("Input image(Without Stego)")
plt.imshow(inputt)

hide_message_in_image(message_to_hide, 'lena.jpeg')
output=plt.imread("output_image.png")
plt.subplot(122)
plt.title("Output image(With Hidden Message)")
plt.imshow(output)
plt.show()

# Extract the message from the steganographic image
extracted_message = extract_message_from_image('output_image.png')
print("Extracted Message:", extracted_message)

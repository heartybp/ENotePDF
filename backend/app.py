from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'uploads'
# UPLOAD_FOLDER: configuration variable
# uploads: the directory where the uploaded files will be stored

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


@app.route("/")
def home():
    return "Hello World, from Flask!"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        # request.files is a dictionary object from Flask that contains all the files uploaded in the request
        # 'file' is the key in the request.files dictionary
        return jsonify({'error': 'No file uploaded'})
    file = request.files['file']
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'success': True, 'filename': filename})
    
if __name__ == '__main__':
    app.run(debug=True)
    
# jsonify is a utility function from Flask that converts Python data structs into a JSON response (JSON-formatted string)
# this is useful for API responses, where JSON is a common format for data exchange

# python -m flask --app backend/app.py run
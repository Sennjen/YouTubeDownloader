import os
from flask import Flask, current_app
app = Flask(__name__, static_url_path="")
app._static_folder = ""

@app.route('/')
def hello_world():
    return current_app.send_static_file('index.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
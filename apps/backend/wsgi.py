# # third-party imports
from flask import Flask
from flask import jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


mock_data = {
    'field_1': 'Hello',
    'field_2': 'World',
}


@app.route("/")
def index():
    return jsonify({
        'status': 'ok',
        'data': {i: mock_data for i in range(10)}
    })


if __name__ == "__main__":
    app.run()

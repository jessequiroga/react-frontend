# # third-party imports
from flask import Flask
from flask import jsonify


app = Flask(__name__)


mock_data = {
    'field_1': 'Hello',
    'field_2': 'World',
}


@app.route('/api')
def index():
    return jsonify({
        'status': 'ok',
        'data': {i: mock_data for i in range(10)}
    })


if __name__ == "__main__":
    app.run()

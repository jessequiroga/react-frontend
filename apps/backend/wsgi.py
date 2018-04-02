# # third-party imports
from flask import Flask
from flask import jsonify


app = Flask(__name__)


def get_mock_data(i):
    return {
        'field_1': f'Hello {i}',
        'field_2': f'World {i}',
    }


@app.route('/api')
def index():
    return jsonify({
        'status': 'ok',
        'data': {i: get_mock_data(i) for i in range(10)}
    })


if __name__ == "__main__":
    app.run()

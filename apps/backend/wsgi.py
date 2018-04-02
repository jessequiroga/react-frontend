# # third-party imports
from flask import Flask
from flask import jsonify


app = Flask(__name__)


def get_mock_data(i):
    return {
        'field_1': f'Hello {i}',
        'field_2': f'World {i}',
        'field_3': 'foo' if i % 2 else 'bar',
    }


@app.route('/api')
def index():
    return jsonify({
        'status': 'ok',
        'data': {i: get_mock_data(i) for i in range(100)}
    })


if __name__ == "__main__":
    app.run()

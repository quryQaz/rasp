from flask import Flask
from flask_cors import CORS
from api.route import app_route

import logging
from random import random

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)  # Устанавливает уровень логирования
logger = logging.getLogger(__name__)  # Создаем экземпляр логгера

logger = app.logger

logger.info('Starting App')

logger.info('Adding routes')
app.register_blueprint(app_route)

@app.route('/')
def main_page():
    return 'Ok'

logger.info('Done')
if __name__ == "__main__":
    app.run()

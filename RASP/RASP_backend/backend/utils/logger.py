from flask import current_app

def logger(msg):
    current_app.logger.info(msg)

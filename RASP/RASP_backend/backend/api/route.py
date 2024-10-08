from flask import Blueprint
from api.rasp.logs.route import logs_route

app_route = Blueprint('route', __name__)

logs_route(app_route)

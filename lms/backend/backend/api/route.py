from flask import Blueprint

from api.lms.auth.route import login_route
from api.lms.users.route import users_route
from api.lms.support.route import support_route
from api.lms.products.route import products_route

app_route = Blueprint('route', __name__)

login_route(app_route)
users_route(app_route)
support_route(app_route)
products_route(app_route)

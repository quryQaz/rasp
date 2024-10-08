from __future__ import annotations
from utils.logger import logger
from api.assets.responses import success_response, error_response
from RASP.xss.main import prevent_xss

from sdk.models.products import Products

@prevent_xss()
async def create(request: Request) -> dict[str, str | bool]:

    logger('Create Product')

    forms: dict = request.json
    name: str = forms.get('name')
    price: str = forms.get('price')
    in_stock: str = forms.get('in_stock')
    description: str = forms.get('description')

    product: Products = Products()
    product.name = name
    product.price = price
    product.in_stock = in_stock
    product.description = description
    try:
        await product.create()

    except AttributeError as e:
        logger(f'Attribute Error {str(e)}')
        return error_response(message = str(e), status = 400)
    except BaseException as e:
        logger(f'Base Exception {str(e)}')
        return error_response(message = 'Database error', status = 500)

    return success_response(message = f'Created {name} : {product.id}')

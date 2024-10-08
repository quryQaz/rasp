from __future__ import annotations
from RASP.sqli.main import prevent_sql_injection
from api.assets.responses import success_response, error_response

import logging
logger = logging.getLogger('app')

from sdk.models.products import Products

@prevent_sql_injection()
async def search(request: Request):
    logger.debug('Search')
    forms: dict = request.json
    search: str = forms.get('search')

    products_store: Products = Products()
    data = {'in_stock': True}
    if search:
        data['name'] = search
    try:
        data: dict[str, str | bool] = await products_store.search(data)
        return_data = []
        for product in data:
            return_data.append(await product.get_raw())
        logger.debug(return_data)
    except AttributeError as e:
        logger.debug(f'Attribute Error {str(e)}')
        return error_response(message = str(e), status = 400)
    except BaseException as e:
        logger.debug(f'Base Exception {str(e)}')
        return error_response(message = 'Database error', status = 500)

    return success_response(data = return_data)

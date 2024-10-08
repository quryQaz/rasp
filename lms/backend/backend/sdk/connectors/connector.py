from __future__ import annotations
from copy import deepcopy
from sdk.queries import insert_query
from sdk.queries import select_query
from sdk.queries import prepare_query
from sdk.constants import *
from utils.logger import logger

class Connector():

    _resource_name: str = ''

    def __init__(self, resource_name):
        self._resource_name = resource_name

    async def create(self, resource: dict[str,str]) -> None:
        query = prepare_query(INSERT, self._resource_name, list(resource.keys()))
        logger(query)
        full_tuple = tuple(resource.values())
        query = query % full_tuple
        logger(query)
        try:
            insert_query(query)
        except BaseException as e:
            raise e

    async def search(self, params: dict[str,str] = {}) -> dict[str, str | bool]:
        query = prepare_query(SELECT, self._resource_name, list(params.keys()))
        full_tuple = tuple(params.values())
        query = query % full_tuple
        try:
            response = select_query(query)
        except BaseException as e:
            raise e

        models = []
        for model in response:
            models.append(self.__class__(resource = model))
        return models

from __future__ import annotations
from copy import deepcopy
import uuid
import json
from decimal import Decimal
from datetime import datetime
from sdk.queries import insert_query
from sdk.queries import select_query
from sdk.queries import prepare_query
from utils.logger import logger
from sdk.constants import *

# TODO:
# Добавить delete

class Resource():
    _resource_name: str = ''
    _resource: dict[str, Any] = {}
    _id: str = ''

    def __init__(self, resource_name, resource: Optional[Any] = None, id: Optional[str] = None):
        self._resource_name = resource_name
        if id:
            self._id = id
        else:
            self._id = str(uuid.uuid4())
        if resource:
            self._resource = resource
            if 'id' in resource:
                self._id = resource.get('id')

    @property
    def id(self) -> str:
        return self._id

    async def get(self) -> dict[str, Any]:
        if self._resource:
            return self._resource

    async def create(self, resource: dict[str,str]) -> None:
        query = prepare_query(INSERT, self._resource_name, list(resource.keys()))
        full_tuple = tuple(resource.values())
        logger('query before')
        logger(query)
        logger(full_tuple)
        query = query % full_tuple
        logger('query')
        logger(query)
        try:
            insert_query(query)
        except BaseException as e:
            raise e

    async def search(self, params: dict[str,str] = {}) -> dict[str, str | bool]:
        query = prepare_query(SELECT, self._resource_name.lower(), list(params.keys()))
        full_tuple = tuple(params.values())
        logger('query before')
        logger(query)
        logger(full_tuple)
        query = query % full_tuple
        logger('query')
        logger(query)
        try:
            response = select_query(query)
        except BaseException as e:
            raise e

        models = []
        for model in response:
            models.append(self.__class__(resource = model))
        return models

    async def fill_attributes(self) -> 'self.__class__':
        for attr in dir(self):
            if attr not in dir(Resource) and attr.startswith('_') \
                    and not attr.endswith('_') and attr[1].islower():
                if attr == '_for':
                    self.__setattr__('_for', (await self.for_))
                elif isinstance(await self.__getattribute__(attr[1:]), datetime):
                    self.__setattr__(attr, (await self.__getattribute__(attr[1:])).isoformat())
                else:
                    self.__setattr__(attr, await self.__getattribute__(attr[1:]))

        return self.__class__

class DecimalEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, Decimal):
      return float(obj)
    return json.JSONEncoder.default(self, obj)

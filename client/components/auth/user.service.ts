'use strict';

export function UserResource($resource) {
  'ngInject';
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    getinfo: {
        url: '/api/users/:controller',
      method: 'GET',
      params: {
        id: '@userid',
        controller: 'info'
      }
    }
  });
}

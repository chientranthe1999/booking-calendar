import request from '../utils/axios';

export const login = (user) => request.post('/auth/login', user);

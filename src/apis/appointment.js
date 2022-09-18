import request from '../utils/axios';

export const getAppointments = () => request.get('/appoinments');

export const createAppointment = (data) => request.post('/appoinments', data);

export const updateAppointment = (id, data) => request.put('/appoinments/' + id, data);

export const searchAppointment = (keyword) => request.get('/appoinments/', { params: { keyword } });

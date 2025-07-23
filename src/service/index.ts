import { BASE_URL, TIME_OUT } from './config';
import XYARequest from './request';

const xyaRequest = new XYARequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export default xyaRequest;

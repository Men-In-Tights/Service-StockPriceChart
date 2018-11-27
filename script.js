import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: "1m", target: 10 },
    { duration: "5m", target: 100 },
    { duration: "1m", target: 0 },
  ],
  rps: 10000,
};

export default function () {
  const res = http.get('http://localhost:3001/');
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time was ok": (r) => r.timings.duration < 200
  });
  sleep(3);
}

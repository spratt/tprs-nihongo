export default function xhr(method: string, url: string): Promise<XMLHttpRequest> {
  return new Promise<XMLHttpRequest>((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.withCredentials = true;
    req.addEventListener('load', () => {
      if(req.status === 200) resolve(req);
      else reject(req);
    });
    req.addEventListener('error', () => { reject(req) });
    req.addEventListener('abort', () => { reject(req) });
    req.open(method, url);
    req.send();
  });
}

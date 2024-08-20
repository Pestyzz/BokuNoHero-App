import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const HeadersInterceptor: HttpInterceptorFn =
 (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  let language = localStorage.getItem('language') as string;

  const authReq = req.clone({
    headers: req.headers
      .set('x-rapidapi-key', '79a98c4c14mshf8c5bfff17836ebp19b66ajsn963995de9ebe')
      .set('x-rapidapi-host', 'my-hero-academia-episodes.p.rapidapi.com'),
    params: req.params.set('language', language)
  });

  return next(authReq);
};

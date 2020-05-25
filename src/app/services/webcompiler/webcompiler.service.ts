import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators'
const URL = "https://compiler.sensebox.de"

@Injectable({
  providedIn: 'root'
})


export class WebcompilerService {

  constructor(private http: HttpClient) { }

  compileId(sketch:string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = { board: 'sensebox-mcu', sketch }
    return this.http.post(`${URL}/compile`, data, { headers })
      .pipe(timeout(30000))
    }
  
  getBinary(id:string){
    const url = `${URL}/download?id=${id}&board=sensebox-mcu`
    return this.http.get(url, { responseType: 'arraybuffer' })
                .pipe(timeout(30000))

  }
  
  async compile(sketch: string): Promise<ArrayBuffer> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = { board: 'sensebox-mcu', sketch }

    // send compilation request, returning a job ID
    return this.http.post(`${URL}/compile`, data, { headers })
      .pipe(timeout(30000))
      .toPromise()
      .catch(err => {
        let msg = err.message
        if (err.name === 'TimeoutError')
          msg = 'unable to contact web compiler. are you online?'

        try {
          // attempt to extract the compilation error message and clean it up
          console.error(err)
          msg = JSON.parse(err.error.message)
          if (msg.process) {
            msg = `compilation error: ${msg.process.substr(msg.process.indexOf(' '))}`
            msg = msg.substr(0, msg.indexOf('^'))
          }
        } catch (err2) {
          console.error(err2)
        }
        throw Error(msg)
      })
      // download the resulting sketch binary
      .then((response: any) => {
        const url = `${URL}/download?id=${response.data.id}&board=sensebox-mcu`
        return this.http.get(url, { responseType: 'arraybuffer' }).toPromise()
      });
  };
}
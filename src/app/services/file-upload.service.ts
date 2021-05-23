import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

const base_url = environment.base_url


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() {
  }

  public updatePhoto(file: File, type: 'users' | 'receptionists' | 'hotels', id: string) {
    const url = `${base_url}/uploads/${type}/${id}`
    const formData = new FormData()
    formData.append('imagen', file)
    return new Promise<string>((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      }).then(async (data: any) => {
        data = await data.json()
        resolve(data.fileName)
      }).catch((err) => {
       reject(err.error.error)
      })
    })

  }


}

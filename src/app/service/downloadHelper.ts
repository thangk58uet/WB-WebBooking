import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class DownloadHelperService {
  private API_URL: string = environment.apiUrl;

  constructor(private http: Http) {
  }

  public downloadUrl(url, fileName = '', successCallback = null, failCallback = null) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', this.API_URL + url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Accept', 'application/vnd.ms-excel, application/json, text/plain, */*');
    if (sessionStorage.getItem('token')) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    }
    xhr.responseType = 'arraybuffer';
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const dateTime = new Date();
          let strDateTime = '';

          strDateTime += dateTime.getFullYear() + (((dateTime.getMonth() + 1) < 10 ? '0' : '') + (dateTime.getMonth() + 1))
            + ((dateTime.getDate() < 10 ? '0' : '') + dateTime.getDate())
            + '-' + ((dateTime.getHours() < 10 ? '0' : '') + dateTime.getHours())
            + ((dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes())
            + ((dateTime.getSeconds() < 10 ? '0' : '') + dateTime.getSeconds());

          if (!fileName) {
          //   fileName = 'ExportData-' + strDateTime + '.xlsx';
          // } else if (fileName.indexOf('xlsx') === -1){
          //   fileName += '.xlsx';
            const disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
              const filenameRegex = /filename[^;=\n]*=((['']).*?\2|[^;\n]*)/;
              const matches = filenameRegex.exec(disposition);
              if (matches != null && matches[1]) {
                fileName = matches[1].replace(/['']/g, '');
              }
            }
          }

          const tagHTML = document.createElement('a');
          const file = new Blob([xhr.response], {type: 'application/vnd.ms-excel'});

          if (navigator.appVersion.toString().indexOf('.NET') > 0) {
            window.navigator.msSaveBlob(file, fileName);
          } else {
            const fileURL = URL.createObjectURL(file);
            tagHTML.href = fileURL;
            tagHTML.download = fileName;
            tagHTML.click();
          }
          // tslint:disable-next-line:no-unused-expression
          successCallback && successCallback(xhr.response);
        } else {
          // tslint:disable-next-line:no-unused-expression
          failCallback && failCallback('Error');
        }
      }
    };
    xhr.send();
  }

  public downloadUrlByPost(url, idList = [], fileName = '', successCallback = null, failCallback = null) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', this.API_URL + url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Accept', 'application/vnd.ms-excel, application/json, text/plain, */*');
    xhr.setRequestHeader('Content-type', 'application/json');
    if (sessionStorage.getItem('token')) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    }
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (!fileName) {
            const disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
              const filenameRegex = /filename[^;=\n]*=((['']).*?\2|[^;\n]*)/;
              const matches = filenameRegex.exec(disposition);
              if (matches != null && matches[1]) {
                fileName = matches[1].replace(/['']/g, '');
              }
            }
          }

          const tagHTML = document.createElement('a');
          const file = new Blob([xhr.response], {type: 'application/vnd.ms-excel'});

          if (navigator.appVersion.toString().indexOf('.NET') > 0) {
            window.navigator.msSaveBlob(file, fileName);
          } else {
            const fileURL = URL.createObjectURL(file);
            tagHTML.href = fileURL;
            tagHTML.download = fileName;
            tagHTML.click();
          }
          // tslint:disable-next-line:no-unused-expression
          successCallback && successCallback(xhr.response);
        } else {
          // tslint:disable-next-line:no-unused-expression
          failCallback && failCallback('Error');
        }
      }
    };
    xhr.send(JSON.stringify(idList));
  }

}

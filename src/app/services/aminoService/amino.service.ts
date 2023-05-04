import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class AminoService {

	private host: string = "http://localhost:3000";

  	constructor(private http: HttpClient) { }

	getResultsByPattern(pattern: string): any {
		let headers = new HttpHeaders()
		headers=headers.append('content-type','application/json')
		headers=headers.append('Access-Control-Allow-Origin', '*')
		headers=headers.append('content-type','application/x-www-form-urlencoded')

		pattern = pattern.replaceAll(",", ";")
		return this.http.get<any>(`${this.host}/getProteinsByPattern?pattern="${pattern}"`, { headers: headers });
	}

	getTotalResultsByPattern(pattern: string): any {
		let headers = new HttpHeaders()
		headers=headers.append('content-type','application/json')
		headers=headers.append('Access-Control-Allow-Origin', '*')
		headers=headers.append('content-type','application/x-www-form-urlencoded')

		pattern = pattern.replaceAll(",", ";")
		return this.http.get<any>(`${this.host}/getTotalProteinsByPattern?pattern=${pattern}`, { headers: headers });
	}

	getProteinByID(id: string): any {
		let headers = new HttpHeaders()
		headers=headers.append('content-type','application/json')
		headers=headers.append('Access-Control-Allow-Origin', '*')
		headers=headers.append('content-type','application/x-www-form-urlencoded')

		return this.http.get<any>(`${this.host}/getProteinByID?id=${id}`, { headers: headers });
	}

	getListLigands(){
		let headers = new HttpHeaders()
		headers = headers.append('content-type', 'application/json')
		headers = headers.append('Access-Control-Allow-Origin', '*')
		headers = headers.append('content-type', 'application/x-www-form-urlencoded')

		return this.http.get<any>(`${this.host}/getListLigands`, { headers: headers });
	}

	getListOfAminosByStartEnd(p_id: string, start: number, end: number){
		let headers = new HttpHeaders()
		headers = headers.append('content-type', 'application/json')
		headers = headers.append('Access-Control-Allow-Origin', '*')
		headers = headers.append('content-type', 'application/x-www-form-urlencoded')

		return this.http.get<any>(`${this.host}/getListOfAminosByStartEnd?p_id=${p_id}&start=${start}&end=${end}`, { headers: headers });
	}
}
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class AminoService {

	private host: string = "http://localhost:3000";

  	constructor(private http: HttpClient) { }

	getResultsByPattern(query: string, limit: number, offset: number): any {
		const params = new HttpParams().set('query', query + ' LIMIT ' + limit + ' OFFSET ' + offset)

		return this.http.get<any>(`${this.host}/getProteinsByPattern`, { params });
	}

	getTotalResultsByPattern(query: string): any {
		const params = new HttpParams().set('query', "SELECT COUNT(*) as count FROM ( " + query + " ) AS QT")

		return this.http.get<any>(`${this.host}/getTotalProteinsByPattern`, { params });
	}
}
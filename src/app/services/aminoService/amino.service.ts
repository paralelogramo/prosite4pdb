import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class AminoService {

	private host: string = "http://localhost:3000";

  	constructor(private http: HttpClient) { }

	getResultsByPattern(pattern: string, limit: number, offset: number): any {
		return this.http.get<any>(`${this.host}/getProteinsByPattern?pattern=${pattern}&limit=${limit}&offset=${offset}`);
	}

	getTotalResultsByPattern(pattern: string): any {
		return this.http.get<any>(`${this.host}/getTotalProteinsByPattern?pattern=${pattern}`);
	}

	getProteinByID(id: string): any {
		return this.http.get<any>(`${this.host}/getProteinByID?id=${id}`);
	}
}
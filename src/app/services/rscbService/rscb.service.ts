import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class RSCBService {

	private host: string = "https://data.rcsb.org/rest/v1/core/entry/";

  	constructor(private http: HttpClient) { }

	getProteinInfo(protein: any): any {
		return this.http.get<any>(`${this.host}${protein}`);
	}
}
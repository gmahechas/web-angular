import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import * as fromGraphql from './../graphql/country.graphql';

import { Observable } from 'rxjs';

import { Country } from '../models/country.model';
import { SearchCountry } from '../models/search-country.model';
import { PaginationCountry } from '../models/pagination-country.model';


@Injectable()
export class CountryService {

  constructor(
    private apollo: Apollo
  ) { }


  paginationCountry(searchCountry: SearchCountry) {
    return this.apollo.watchQuery<PaginationCountry>({
      query: fromGraphql.paginationCountry,
      variables: searchCountry
    }).valueChanges;
  }

  storeCountry(country: Country): Observable<any> {
    return this.apollo.mutate({
      mutation: fromGraphql.storeCountry,
      variables: {
        country_name: country.country_name,
        country_code: country.country_code
      }
    });
  }

  updateCountry(country: Country): Observable<any> {
    return this.apollo.mutate({
      mutation: fromGraphql.updateCountry,
      variables: {
        country_id: country.country_id,
        country_name: country.country_name,
        country_code: country.country_code
      }
    });
  }

  destroyCountry(country: Country): Observable<any> {
    return this.apollo.mutate({
      mutation: fromGraphql.destroyCountry,
      variables: {
        country_id: country.country_id
      }
    });
  }
}

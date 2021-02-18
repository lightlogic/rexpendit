import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Receipt } from './receipt.model';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReceiptService {
  private receipts: Receipt[] = [];
  private receiptsUpdated = new Subject<Receipt[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getReceipts() {
    this.http
      .get<{ success: boolean; count: number; pagination: any; data: any }>(
        environment.API_URL + '/receipts'
      )
      .pipe(
        map((receiptData) => {
          return receiptData.data.map((receipt) => {
            console.log(receipt);
            return {
              id: receipt._id,
              debitorOrganisationId: receipt.organisation._id,
              creditorUser: receipt.user,
              totalCreditAmount: receipt.totalAmount,
              creditDate: receipt.date,
              description: receipt.description,
              digitalCopy: receipt.digitalCopy,
              createdAt: receipt.createdAt,
            };
          });
        })
      )
      // transformedFeatures is the result of the modified feature by the map function (_id field -> id)
      .subscribe((transformedReceipts) => {
        this.receipts = transformedReceipts;
        this.receiptsUpdated.next([...this.receipts]);
      });
  }

  // addReceipt(communeName: string) {
  //   const newCommune = {
  //     commName: communeName,
  //   };
  //   this.http
  //     .post<{ message: string; feature: Feature }>(
  //       environment.API_URL + '/geoentities/swisstopo/adminunit',
  //       newCommune
  //     )
  //     .subscribe((responseJson) => {
  //       if (responseJson.feature) {
  //         this.features.push(responseJson.feature);
  //         this.featuresUpdated.next([...this.features]);
  //         this.router.navigate(['/display']);
  //       } else {
  //         this.router.navigate(['/display']);
  //       }
  //     });
  // }

  getReceiptUpdateListener() {
    return this.receiptsUpdated.asObservable();
  }

  // deleteReceipt(featureId: string) {
  //   this.http
  //     .delete(environment.API_URL + '/geoentities/' + featureId)
  //     .subscribe(() => {
  //       // to keep in the local array of features the posts that does not have featureId
  //       // and delete the one that has the featureId
  //       // -> filter checks every elements of an array against a condition. It will keep the element that does NOT match the condition
  //       const featuresWithoutTheDeleted = this.features.filter(
  //         (feature) => feature.id !== featureId
  //       );
  //       this.features = featuresWithoutTheDeleted;
  //       this.featuresUpdated.next([...this.features]);
  //     });
  // }

  //   updateReceipt(itemType: string) {
  //     const typeValue = {
  //       itemTypeValue: itemType,
  //     };
  //     this.http
  //       .patch(environment.API_URL + '/listitems', typeValue)
  //       .subscribe((responseJson) => {
  //         if (itemType == 'commune') {
  //           this.lstCommunes.length = 0;
  //           this.lstCommunesUpdated.next();
  //           this.router.navigate(['/create']);
  //         } else if (itemType == 'river') {
  //           this.lstRivers.length = 0;
  //           this.lstRiversUpdated.next();
  //           this.router.navigate(['/create']);
  //         }
  //       });
  //   }

  //   purgeReceipts(itemType: string) {
  //     this.http
  //       .delete(environment.API_URL + '/listitems/' + itemType)
  //       .subscribe((responseJson) => {
  //         if (itemType == 'commune') {
  //           this.lstCommunes.length = 0;
  //           this.lstCommunesUpdated.next();
  //           this.router.navigate(['/create']);
  //         } else if (itemType == 'river') {
  //           this.lstRivers.length = 0;
  //           this.lstRiversUpdated.next();
  //           this.router.navigate(['/create']);
  //         }
  //       });
  //   }
}

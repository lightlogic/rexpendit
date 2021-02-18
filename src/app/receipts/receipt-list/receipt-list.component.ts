import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Receipt } from '../receipt.model';
import { ReceiptService } from '../receipts.service';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css'],
})
export class ReceiptListComponent implements OnInit, OnDestroy {
  isLoading = false;
  receipts: Receipt[] = [];
  displayedColumns: string[] = ['date', 'totalAmount', 'descr', 'creditor'];
  private receiptsListSub: Subscription;

  constructor(public receiptsService: ReceiptService) {}
  dataSource = this.receipts;

  ngOnInit(): void {
    this.isLoading = true;
    this.receiptsService.getReceipts();
    this.receiptsListSub = this.receiptsService
      .getReceiptUpdateListener()
      .subscribe((receipts: Receipt[]) => {
        this.receipts = receipts;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.receiptsListSub.unsubscribe();
  }
}

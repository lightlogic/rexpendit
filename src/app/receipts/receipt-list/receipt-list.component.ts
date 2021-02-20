import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  private receiptsListSub: Subscription;

  // pagination
  totalReceipts = 0;
  currentPage = 0;
  receiptsPerPage = environment.RESOURCES_LIMIT_PER_PAGE;
  pageSizeOptions = environment.RESOURCES_LIMIT_PER_PAGE_OPTIONS;

  constructor(public receiptsService: ReceiptService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.receiptsService.getReceipts(this.currentPage, this.receiptsPerPage);
    this.receiptsListSub = this.receiptsService
      .getReceiptUpdateListener()
      .subscribe(
        (receiptsData: { receipts: Receipt[]; maxResources: number }) => {
          this.receipts = receiptsData.receipts;
          this.totalReceipts = receiptsData.maxResources;
          this.isLoading = false;
        }
      );
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex;
    this.receiptsPerPage = pageData.pageSize;
    this.receiptsService.getReceipts(this.currentPage, this.receiptsPerPage);
  }

  onDeleteReceipt(receiptId) {
    this.receiptsService.deleteReceipt(receiptId);
  }

  ngOnDestroy() {
    this.receiptsListSub.unsubscribe();
  }
}

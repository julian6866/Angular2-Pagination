import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Menu Component
@Component({
  moduleId: module.id,
  selector: "my-pagination",
  templateUrl: 'pagination.component.html',
  styleUrls: [ 'pagination.component.css' ]
})

export class PaginationComponent implements OnInit {

  @Input() total: number = 0;   // total pages
  @Input() page: number = 0;    // current/selected page
  @Input() size: number = 0;    // # of elements per page
  @Input() keyword: string = '';    // search data keyword

  @Output()
  pageChanged: EventEmitter<{keyword: string, page: number, size: number}> = new EventEmitter();

  pages: Array<any> = new Array();

  constructor() {
    //console.log("page: " + this.page + ", size: " + this.size + ", Total: " + this.total);
  }

  ngOnInit(): void {
    this.pages = new Array(this.total);
    for(let pg = 0; pg < this.total; pg ++) {
      this.pages.push({page: pg, current: (pg == this.page)});
    }
    console.log("Pages: 3 - " + this.pages.length);
  }

  selectPage(page: number, event?:MouseEvent) {
      if (event) {
          event.preventDefault();
          //event.defaultPrevented;
          this.page = page;
          //this.size = 4;
        }
    this.pageChanged.emit({keyword: this.keyword, page: this.page, size: this.size});
    //this.pageChanged.emit('this is a test emitter');
  }

  // the paging logic
  showPageLink(page: number):boolean {

    if(page ==0 || page == this.total -1) return true;
    
    if(Math.abs(page - this.page) > 5) {
      if(page%10 == 0) return true;
      else return false;
    } else {
      return true;
    }
  }

}

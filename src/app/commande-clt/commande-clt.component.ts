import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatFormFieldModule, MatInputModule } from '@angular/material';
import * as XLSX from 'xlsx';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {Chart} from 'chart.js';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-commande-clt',
  templateUrl: './commande-clt.component.html',
  styleUrls: ['./commande-clt.component.css']
})
export class CommandeCltComponent implements OnInit {
  filterform: FormGroup = new FormGroup({date1: new FormControl(), date2: new FormControl()});
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  options = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Details des Commandes Clients \n',
    useBom: true,
    noDownload: false,
    headers: ['nomPrenomTier', 'numordre', 'idDocument',
      'libelleArticle', 'qte', 'puht', 'puttc', 'mntttc', 'mntTv', 'dateligne']

  };

  displayedColumns: string[] = ['nomPrenomTier', 'numordre', 'idDocument',
    'libelleArticle', 'qte', 'puht', 'puttc', 'mntttc', 'mntTv', 'dateligne']
  dataSource = new MatTableDataSource<any>();

  urlCmdClt = 'http://127.0.0.1:8000/api/CmdClt';
  CmdClt: any;
  urlDateCmdClte = 'http://127.0.0.1:8000/api/DateCmdClte';
  DateCmdClte: any;

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getDateCmdClte() {
    // console.log('Get Reglement');
    this.http.get(this.urlDateCmdClte).subscribe(DateCmdClte => {
      this.DateCmdClte = DateCmdClte;
      const dated = [];
      for (const dp of this.DateCmdClte) {
        dated.push(dp.dated);
      }
    });
  }
  getCmdClt() {

    this.dataSource = new MatTableDataSource();
    console.log(this.filterform.value);
    return this.http.get(this.urlCmdClt, {
      params: {
        date1: this.filterform.controls.date1.value,
        date2: this.filterform.controls.date2.value
      }
    }).subscribe(CmdClt => {
      this.CmdClt = CmdClt;
      this.dataSource = new MatTableDataSource<any>(this.CmdClt);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(CmdClt );
      console.log('succeess CmdClt');
    });
  }



  GenerateCSV() {
    const csv = new Angular5Csv(this.CmdClt, 'CmdClt', this.options);
  }
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.filterform.controls.date1.setValue('2015');
    this.filterform.controls.date2.setValue('2019');
    this.getDateCmdClte();
    this.getCmdClt();
  }

}

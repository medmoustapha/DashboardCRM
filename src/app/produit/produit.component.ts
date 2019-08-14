import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatFormFieldModule, MatInputModule } from '@angular/material';
import * as XLSX from 'xlsx';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  myChart: Chart;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  options = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Liste Des Produits en Stock\n',
    useBom: true,
    noDownload: false,
    headers: ['LibelleArticle', 'prixuVenteHt', 'qte']

  };

  displayedColumns: string[] = ['Libellearticle', 'Quantite', 'PrixventeHt'];
  dataSource = new MatTableDataSource<any>();

  urlStockArticle = 'http://127.0.0.1:8000/api/StockArticle';
  StockArticle: any;

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  getStockArticle() {
    console.log('Get StockArticle');
    return this.http.get(this.urlStockArticle).subscribe(StockArticle => {
      this.StockArticle = StockArticle;
      this.dataSource = new MatTableDataSource<any>(this.StockArticle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(StockArticle );
      console.log('succeess StockArticle');
    });
  }

/*
  getTypeProd() {
      this.myChart = new Chart( 'typeProd', {
        type: 'bar',
        data: {
          labels: [ 'Carte de Fidélité Best Price', 'Carte Visite', 'Etiquette Papier Autocollant NOIR'
            , 'Tiroir Caisse ', 'Imprimante Ticket Thermique '
            , 'BALANCE SUPREMA LIBRA 12/30 KG ', 'Scanner Lazer Honeywell'
          , 'PC DELL ALL IN ONE', 'Ecran Dell 19.5" E2016H', 'Terminal Point de Vente APEXA'
            , 'Pointeuse Biométrique Proximité', 'PLATINET Cable Reseau 3M UTP CAT6'],
          datasets: [
             {
        label: 'Quantite',
        data: [ 1000, 500, 120, 105
          , 61, 33, 21 , 20,  13, , 13, 5, 3, ],
        backgroundColor: ['rgba(255, 153, 153)', 'rgba(153, 255, 153)', 'rgba(204, 153, 255)',
          'rgba(255, 153, 153)', 'rgba(0, 26, 0)', 'rgba(153, 153, 255)', 'rgba(02, 82, 02)'
          , 'rgba(255, 204, 153)', 'rgba(153, 255, 204)', 'rgba(255, 255, 153)', 'rgba(127, 82, 93)'],
        borderColor: 'rgb(46,139,87)',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'rgb(46,139,87)',
        pointBackgroundColor: 'rgb(46,139,87)',
      }  ]
        },
        options: {
          responsive: true,

          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Montserrat',
            bodyFontFamily: 'Montserrat',
            cornerRadius: 3,
            intersect: false,
          },
          legend: {
            display: false,
            labels: {
              usePointStyle: true,
              fontFamily: 'Montserrat',
            },
          },
          title: {
            display: false,
            text: 'Normal Legend'
          }
        }
      } );
    };
*/

  GenerateCSV() {
    const csv = new Angular5Csv(this.StockArticle, 'produit en Stock',this.options);
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getStockArticle();
    // this.getTypeProd();
  }

}

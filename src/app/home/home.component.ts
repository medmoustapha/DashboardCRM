import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatFormFieldModule, MatInputModule } from '@angular/material';
import * as XLSX from 'xlsx';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {FormControl, FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';


// import * as Chart from 'chart.js';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterform: FormGroup = new FormGroup({date1: new FormControl(), date2: new FormControl()});

  displayedColumns: string[] = ['idbanque', 'debiter', 'crediter', 'type-reg', 'date', 'devise'];
  dataSource = new MatTableDataSource<any>();
  displayedColumnsS: string[] = ['client', 'montant'];
  dataSource1 = new MatTableDataSource<any>();

  options1 = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Statistique des Produits Vendus\n',
    useBom: true,
    noDownload: false,
    headers: ['Libelle article', 'Quantite']

  };

  options2 = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Statistique des Produits Vendus\n',
    useBom: true,
    noDownload: false,
    headers: ['Banque', 'Debite', 'Credit', 'Type reglement', 'Date', 'Devise']

  };

  /* urlDepenseParAnnee = 'http://127.0.0.1:8000/api/DepenseParAnnee';
  DepenseParAnnee: any; ----------> chart js */

  urlCA = 'http://127.0.0.1:8000/api/CA';
  ca: number;
  urlNbVente = 'http://127.0.0.1:8000/api/nbVente';
  nbVente: any;
  urlNbClient = 'http://127.0.0.1:8000/api/NbClient';
  nbClient: any;
  myChart: Chart;
  myChart1: any;
  urlDepenses = 'http://127.0.0.1:8000/api/depenses';
  depenses: any;
  urlDebitCredit = 'http://127.0.0.1:8000/api/DebitCredit';
  DebitCredit: any;
  urltopProduit = 'http://127.0.0.1:8000/api/topProduit';
  topProduit: any;
  urlgetProduitVenduParNombre = 'http://127.0.0.1:8000/api/ProduitVenduParNombre';
  ProduitVenduParNombre: any;
  urlgetTopClient = 'http://127.0.0.1:8000/api/TopClient';
  TopClient: any;
  urlPvd = 'http://127.0.0.1:8000/api/DatePvd';
  DatePvd: any;
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  /*getInit() {const myChart = new Chart( 'sales-chart', {
    type: 'line',
    data: {
      labels: [ '2012', '2013', '2014', '2015', '2016', '2017', '2018' ],
      datasets: [ {
        label: 'Foods',
        data: [ 0, 30, 15, 110, 50, 63, 120 ],
        backgroundColor: 'transparent',
        borderColor: 'rgb(255,218,185)',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'rgb(255,218,185)',
        pointBackgroundColor: 'rgb(255,218,185)',
      }, {
        label: 'Electronics',
        data: [ 0, 50, 40, 80, 35, 99, 80 ],
        backgroundColor: 'transparent',
        borderColor: 'rgb(46,139,87)',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'rgb(46,139,87)',
        pointBackgroundColor: 'rgb(46,139,87)',
      } , {
        label: 'mbourou',
        data: [ 10, 50, 15, 30, 35, 60, 90 ],
        backgroundColor: 'transparent',
        borderColor: 'rgb(165,42,42)',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'rgb(165,42,42)',
        pointBackgroundColor: 'rgb(165,42,42)',
      } ]
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
        display: true,
        labels: {
          usePointStyle: true,
          fontFamily: 'Montserrat',
        },
      },
      scales: {
        xAxes: [ {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Month'
          }
        } ],
        yAxes: [ {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        } ]
      },
      title: {
        display: false,
        text: 'Normal Legend'
      }
    }
  } );}*/


  getNbVente() {
   // console.log('Get totat nbvente');
    return this.http.get(this.urlNbVente).subscribe(nbVente => {
      this.nbVente = nbVente[0].total;
     /* console.log(nbVente[0].total);
      console.log('succeess totatNbVente');*/
    });
  }
  getNbClient() {
    console.log('Get nbClient');
    return this.http.get(this.urlNbClient).subscribe(nbClient => {
      this.nbClient = nbClient[0].totatlClt;
      console.log(nbClient[0].totatlClt);
      console.log('succeess nbClient');
    });
  }
  /*getNbEmploye() {
    console.log('Get totat nombreEmploye');
    return this.http.get(this.urlNbEmploye).subscribe(nbEmploye => {
      this.nbEmploye = nbEmploye[0].nombreEmploye;
      console.log(nbEmploye[0].nombreEmploye);
      console.log('succeess totat nombreEmploye');
    });
  }*/
  getCA() {
    // console.log('Get CA');
    return this.http.get(this.urlCA).subscribe(ca => {
      this.ca = ca[0].CA;
      /*console.log(ca[0].CA);
      console.log('succeess');*/
    });
  }
  getDepenses() {
   // console.log('Get depenses');
    return this.http.get(this.urlDepenses).subscribe(depenses => {
      this.depenses = depenses[0].Depense;
     /* console.log(depenses[0].Depense);
      console.log('succeess depenses');*/
    });
  }

  getDebitCredit() {
    this.dataSource = new MatTableDataSource();
   // console.log('Get DebitCredit');
    console.log(this.filterform.value);
    return this.http.get(this.urlDebitCredit, {
      params: {
        date1: this.filterform.controls.date1.value,
        date2: this.filterform.controls.date2.value
      }
    }).subscribe(DebitCredit => {
      this.DebitCredit = DebitCredit;
      this.dataSource = new MatTableDataSource<any>(this.DebitCredit);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     /* console.log(DebitCredit);
      console.log('succeess DebitCredit');*/
    });
  }
  getTopProduit() {
   // console.log('Get topProduit');
    return this.http.get(this.urltopProduit).subscribe(topProduit => {
      this.topProduit = topProduit;
      /*console.log(topProduit );
      console.log('succeess topProduit');*/
    });
  }

  getDatePvd() {
    // console.log('Get Reglement');
    this.http.get(this.urlPvd).subscribe(DatePvd => {
      this.DatePvd = DatePvd;
      const dated = [];
      for (const dp of this.DatePvd) {
        dated.push(dp.dated);
      }
    });
  }
  getProduitVenduParDate() {
    if (this.myChart) {
      this.myChart.destroy(); }
    console.log(this.filterform.value);
    this.http.get(this.urlgetProduitVenduParNombre, {
      params: {
        date1: this.filterform.controls.date1.value,
        date2: this.filterform.controls.date2.value
      }
    }).subscribe(ProduitVenduParNombre => {
      this.ProduitVenduParNombre = ProduitVenduParNombre;
     // console.log(this.ProduitVenduParNombre);
     // console.log('succeess DepenseParAnnee');
      const libelleFamille = [];
      const nombre = [];
      for (const pvp of this.ProduitVenduParNombre) {
        libelleFamille.push(pvp.libelleFamille);
        nombre.push(pvp.nombre);
      }
     // console.log( libelleFamille + '----' + nombre + '----'),
      this.myChart = new Chart( 'ProduitVenduParDate', {
            type: 'bar',
            data: {
              labels: libelleFamille,
              datasets: [ {
                label: '',
                data: nombre,
                fill: true,
                lineTension: 0.1,
                  backgroundColor:  ['rgba(255, 153, 153)' , 'rgba((223, 32, 32)', 'rgba(128, 128, 128)', 'rgba(128, 255, 0)',
                    'rgba(0, 26, 102)', 'rgba(92, 10, 92)', 'rgba(255, 204, 255)',
                    'rgba((223, 32, 32)', 'rgba(0, 26, 0)', 'rgba(153, 153, 255)', 'rgba(153, 255, 153)', 'rgba(204, 153, 255)',
                    'rgba(255, 153, 153)', 'rgba(0, 26, 0)', 'rgba(153, 153, 255)', 'rgba(02, 82, 02)'
                    , 'rgba(255, 204, 153)', 'rgba(153, 255, 204)', 'rgba(255, 255, 153)', 'rgba(127, 82, 93)'
                    , 'rgba((223, 32, 32)', 'rgba(128, 128, 128)', 'rgba(128, 255, 0)',
                    'rgba(0, 26, 102)', 'rgba(92, 10, 92)', 'rgba(255, 204, 255)',
                    'rgba((223, 32, 32)', 'rgba(0, 26, 0)', 'rgba(153, 153, 255)', 'rgba(02, 82, 02)'
                    , 'rgba(255, 204, 153)', 'rgba(153, 255, 204)', 'rgba(255, 255, 153)', 'rgba(127, 82, 93)'
                    , 'rgba(153, 255, 153)', 'rgba(204, 153, 255)',
                     'rgba(153, 255, 153)', 'rgba(204, 153, 255)',
                    'rgba(255, 153, 153)', 'rgba(0, 26, 0)',
                     'rgba(255, 204, 153)', 'rgba(153, 255, 204)', 'rgba(255, 255, 153)', 'rgba(127, 82, 93)'
                    , 'rgba((223, 32, 32)', 'rgba(128, 128, 128)', 'rgba(128, 255, 0)',
                    'rgba(0, 26, 102)', 'rgba(92, 10, 92)', 'rgba(255, 204, 255)',
                    'rgba((223, 32, 32)', 'rgba(0, 26, 0)', 'rgba(153, 153, 255)', 'rgba(02, 82, 02)'
                    , 'rgba(255, 204, 153)', 'rgba(153, 255, 204)', 'rgba(255, 255, 153)', 'rgba(127, 82, 93)'
                    , 'rgba(153, 255, 153)', 'rgba(204, 153, 255)',
                     'rgba(153, 255, 153)', 'rgba(204, 153, 255)', 'rgba(255, 153, 153)' ,
                    'rgba((223, 32, 32)', 'rgba(128, 128, 128)', 'rgba(128, 255, 0)',
                      'rgba(0, 26, 102)', 'rgba(92, 10, 92)', 'rgba(255, 204, 255)',
                      'rgba((223, 32, 32)', 'rgba(0, 26, 0)'
                  ],
                borderColor: 'rgb(167, 105, 0)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'white',
                pointBackgroundColor: 'black',
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'bbrown',
                pointHoverBorderColor: 'yellow',
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
              }
                /*, {
            label: 'Electronics',
            data: [ 0, 50, 40, 80, 35, 99, 80 ],
            backgroundColor: 'transparent',
            borderColor: 'rgb(46,139,87)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'rgb(46,139,87)',
            pointBackgroundColor: 'rgb(46,139,87)',
          } , {
            label: 'mbourou',
            data: [ 10, 50, 15, 30, 35, 60, 90 ],
            backgroundColor: 'transparent',
            borderColor: 'rgb(165,42,42)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'rgb(165,42,42)',
            pointBackgroundColor: 'rgb(165,42,42)',
          }*/ ]
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
              scales: {
                xAxes: [ {
                  ticks: {
                    beginAtZero: true
                  },
                  display: true,
                  gridLines: {
                    display: false,
                    drawBorder: true
                  },
                  scaleLabel: {
                    display: true,
                    labelString: '',
                    fontSize: 15
                  }
                } ],
                yAxes: [ {
                  ticks: {
                    beginAtZero: true
                  },
                  display: true,
                  gridLines: {
                    display: false,
                    drawBorder: true
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Quantité',
                    fontSize: 15
                  }
                } ]
              },
              title: {
                display: false,
                text: 'Normal Legend'
              }
            }
          } );
    });
  }

  GenerateCSV1() {
   const csv = new Angular5Csv(this.ProduitVenduParNombre, 'Rapport-produit-V', this.options1);
  }

  GenerateCSV2() {
    const csv = new Angular5Csv(this.DebitCredit, 'Rapport-Banque', this.options2);
  }

  getTopClient() {
    // console.log('Get TopClient');
    return this.http.get(this.urlgetTopClient).subscribe(TopClient => {
      this.TopClient = TopClient;
      this.dataSource1 = new MatTableDataSource<any>(this.TopClient);
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
     /* console.log(TopClient);
      console.log('succeess TopClient');*/
    });
  }
  constructor(private http: HttpClient) { }

  ngOnInit() {
   // this.getInit();
    this.filterform.controls.date1.setValue('2014');
    this.filterform.controls.date2.setValue('2019');
    this.getDatePvd();
    this.getCA();
    this.getNbVente();
    this.getDepenses();
    this.getNbClient();
    this.getDebitCredit();
    this.getTopProduit();
    this.getProduitVenduParDate();
    this.getTopClient();

  }

}

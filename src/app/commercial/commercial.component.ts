import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatFormFieldModule, MatInputModule } from '@angular/material';
import * as XLSX from 'xlsx';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {Chart} from 'chart.js';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterform: FormGroup = new FormGroup({
    date1: new FormControl(), date2: new FormControl(),
    commercial: new FormControl()
  });

  options = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Detail des regelements\n',
    useBom: true,
    noDownload: false,
    headers: ['commercial', 'mntRegler', 'dateDocument', 'codeArticle', 'libelleArticle', 'mntttc', 'versement', 'client', 'tauxTva']

  };
  optionsCom = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Detail CA du Commercial \n',
    useBom: true,
    noDownload: false,
    headers: ['commercial', 'dateDocument', 'codeClasseDocument', 'libelleClasseDocument', 'codeArticle',
      'libelleArticle', 'mntNetht', 'mntttc', 'libelleTypeArticle', 'numero', 'montant', 'dateMouvement', 'versement'
      , 'total_ancien_reglement', 'total_ttc_document', 'reste', 'code_clt', 'client', 'code_commercial', 'versement']

  };

  displayedColumns: string[] = ['commercial', 'mntRegler', 'dateDocument', 'codeArticle', 'libelleArticle'];
  dataSource = new MatTableDataSource<any>();

  urltabReglement = 'http://127.0.0.1:8000/api/tabReglement';
  tabReglement: any;
  urlDetailReglement = 'http://127.0.0.1:8000/api/DetailReglement';
  DetailReglement: any;
  urlChartComercial = 'http://127.0.0.1:8000/api/ChartComercial';
  ChartComercial: any;
  myChart1: Chart;
  urlChartComercialDate = 'http://127.0.0.1:8000/api/ChartComercialDate';
  ChartComercialDate: any;
  urlChartComercialDetail = 'http://127.0.0.1:8000/api/ChartComercialDetail';
  ChartComercialDetail: any;
  urlChartDistinctComercial = 'http://127.0.0.1:8000/api/ChartDistinctComercial';
  ChartDistinctComercial: any;

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getReglement() {
    console.log('Get Reglement');
    return this.http.get(this.urltabReglement).subscribe(tabReglement => {
      this.tabReglement = tabReglement;
      this.dataSource = new MatTableDataSource<any>(this.tabReglement);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(tabReglement);
      console.log('succeess tabReglement');
    });
  }


  getChartDistinctComercial() {
    console.log('Get Chart Distinct Comercial');
    this.http.get(this.urlChartDistinctComercial).subscribe(ChartDistinctComercial => {
      this.ChartDistinctComercial = ChartDistinctComercial;
    });
  }

  getChartComercialDate() {
    // console.log('Get Reglement');
    this.http.get(this.urlChartComercialDate).subscribe(ChartComercialDate => {
      this.ChartComercialDate = ChartComercialDate;
      const dateDocument = [];
      for (const dp of this.ChartComercialDate) {
        dateDocument.push(dp.dateDocument);
      }
    });
  }

  getDetailReglement() {
    console.log('Get DetailReglement');
    return this.http.get(this.urlDetailReglement).subscribe(DetailReglement => {
      this.DetailReglement = DetailReglement;
      this.dataSource = new MatTableDataSource<any>(this.DetailReglement);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(DetailReglement);
      console.log('succeess DetailReglement');
    });
  }

  GenerateCSV() {
    const csv = new Angular5Csv(this.DetailReglement, 'Detail_Reglement', this.options);
  }

  GenerateCSVdetailComm() {
    const csv = new Angular5Csv(this.ChartComercialDetail, 'Detail_Commercial', this.optionsCom);
  }
  getChartComercialDetail() {
    this.http.get(this.urlChartComercialDetail,
        {
          params: {
            date1: this.filterform.controls.date1.value,
            date2: this.filterform.controls.date2.value,
            commercial: this.filterform.controls.commercial.value
          }
        }).subscribe(ChartComercialDetail => {
      this.ChartComercialDetail = ChartComercialDetail;
      this.GenerateCSVdetailComm();
    });
  }

  getChartComercial() {
    if (this.myChart1) {
      this.myChart1.destroy();
    }
    this.http.get(this.urlChartComercial, {
      params: {
        date1: this.filterform.controls.date1.value,
        date2: this.filterform.controls.date2.value,
        commercial: this.filterform.controls.commercial.value
      }
    }).subscribe(ChartComercial => {
      this.ChartComercial = ChartComercial;
      console.log(this.ChartComercial);
      console.log('succeess ChartComercial');
      const commercial = [];
      const montantTotal = [];
      for (const com of this.ChartComercial) {
        commercial.push(com.commercial);
        montantTotal.push(com.montantTotal);
      }
      console.log(commercial + '----' + montantTotal + '----'),
          this.myChart1 = new Chart('ChartComercial', {
            type: 'bar',
            data: {
              labels: commercial,
              datasets: [{
                label: '',
                data: montantTotal,
                fill: true,
                lineTension: 0.1,
                backgroundColor: ['rgba(255, 153, 153)', 'rgba(153, 255, 153)', 'rgba(204, 153, 255)',
                  'rgba(255, 153, 153)', 'rgba(0, 26, 0)', 'rgba(153, 153, 255)', 'rgba(02, 82, 02)'
                  , 'rgba(255, 204, 153)', 'rgba(153, 255, 204)', 'rgba(255, 255, 153)', 'rgba(127, 82, 93)'],
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
              ]
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
                xAxes: [{
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
                }],
                yAxes: [{
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
                    labelString: 'Montant en Dt',
                    fontSize: 15
                  }
                }]
              },
              title: {
                display: true,
                text: 'CA par Commercial'
              }
            }
          });
    });
  }

  /*getChartComercialPie() {
    console.log('Get ChartComercialPie');
    this.http.get(this.urlChartComercial).subscribe(ChartComercial => {
      this.ChartComercial = ChartComercial;
      console.log(this.ChartComercial);
      console.log('succeess ChartComercial');
      const commercial = [];
      const montantTotal = [];
      for (const com of this.ChartComercial) {
        commercial.push(com.commercial);
        montantTotal.push(com.montantTotal);
      }
      console.log( commercial + '----' + montantTotal + '----'),
          this.myChart1 = new Chart( 'ChartComercialPie', {
            type: 'pie',
            data: {
              labels: commercial,
              datasets: [ {
                label: '',
                data: montantTotal,
                fill: true,
                lineTension: 0.1,
                backgroundColor: ['rgba(255, 153, 153)', 'rgba(153, 255, 153)', 'rgba(204, 153, 255)',
                  'rgba(255, 153, 153)', 'rgba(0, 26, 0)', 'rgba(153, 153, 255)', 'rgba(02, 82, 02)'
                  , 'rgba(255, 204, 153)', 'rgba(153, 255, 204)', 'rgba(255, 255, 153)', 'rgba(127, 82, 93)'],
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
              ]
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
    });
  }
*/

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.filterform.controls.date1.setValue('2014');
    this.filterform.controls.date2.setValue('2014');
    this.getChartComercialDate();
    this.getChartDistinctComercial();
    this.getReglement();
    this.getDetailReglement();
    this.getChartComercial();
  }
}

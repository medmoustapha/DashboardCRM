import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Chart from 'chart.js';
import {FormControl, FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';



@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
    currentDate = new Date();
    filterform: FormGroup = new FormGroup({date1: new FormControl(), date2: new FormControl()});
    options = {
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Statistique des Depenses \n',
        useBom: true,
        noDownload: false,
        headers: ['typee', 'montant', 'description', 'station', 'dated'],

    };
    urlNbEmploye = 'http://127.0.0.1:8000/api/nbEmploye';
    nbEmp: any;
    public myChart: Chart;

    urlDepenseParAnnee = 'http://127.0.0.1:8000/api/DepenseParAnnee';
    DepenseParAnnee: any;
    urlCAparAnnee = 'http://127.0.0.1:8000/api/CAparAnnee';
    CAparAnnee: any;
    urlEvoClient = 'http://127.0.0.1:8000/api/EvoClient';
    EvoClient: any;
    urldepenseParStationEtDate = 'http://127.0.0.1:8000/api/depenseParStationEtDate';
    depenseParStationEtDate: any;
    urlDateDep = 'http://127.0.0.1:8000/api/DateDep';
    DateDep: any;
    lettre: any;
    color: any;
    i: any;
    urlDebitCreditDetail = 'http://127.0.0.1:8000/api/DebitCreditDetail';
    DebitCreditDetail: any;

    getRandomColor() {
        this.lettre = '0123456789ABCDEF'.split('');
        this.color = '#';
        for (this.i = 0; this.i < 6; this.i++) {
            this.color += this.lettre[Math.floor(Math.random() * 16)];
        }
        return this.color;
    }

    getDepenseParAnnee() {
        const CA = [];
        // const dep = [];
        this.http.get(this.urlCAparAnnee).subscribe(CAparAnnee => {
            this.CAparAnnee = CAparAnnee;
            // console.log(this.CAparAnnee);
            console.log('succeess CAparAnnee');
            for (const ca1 of this.CAparAnnee) {
                // annee.push(ca1.annee);
                CA.push(ca1.CA);
            }
        });
        // console.log('Get DepenseParAnnee');
        this.http.get(this.urlDepenseParAnnee).subscribe(DepenseParAnnee => {
            this.DepenseParAnnee = DepenseParAnnee;
            //  console.log(this.DepenseParAnnee);
            // console.log('succeess DepenseParAnnee');
            const annee = [];
            const depense = [];
            for (const dep of this.DepenseParAnnee) {
                annee.push(dep.annee);
                depense.push(dep.Depense);
            }
            // console.log( annee + '----' + depense + '----'),
            this.myChart = new Chart('DepenseParAnnee', {
                type: 'line',
                data: {
                    labels: annee,
                    datasets: [{
                        label: 'Depense ',
                        data: [ 6000, 7500, 7810, 7600, 7900, 7500, 8000 ],
                        borderColor: 'rgba(255, 102, 102)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    }
                        , {
                            label: 'Revenu',
                            data: [ 7600, 9000, 10500, 11030, 11505, 12010, 12360],
                            borderColor: 'rgba(0, 230, 77)',
                            backgroundColor: 'rgba(192, 192, 192, 0.2)',
                        }]
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
                                labelString: 'Annee',
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
                                labelString: 'Montant en DT',
                                fontSize: 15
                            }
                        }]
                    },
                    title: {
                        display: false,
                        text: 'Normal Legend'
                    }
                }
            });
        });
    }

    /* getCAparAnnee() {
     console.log('Get CAparAnnee');
     const annee = [];
     const CA = [];
     const dep = [];
     this.http.get(this.urlCAparAnnee).subscribe(CAparAnnee => {
       this.CAparAnnee = CAparAnnee;
       console.log(this.CAparAnnee);
       console.log('succeess CAparAnnee');
       for (const ca1 of this.CAparAnnee) {
         annee.push(ca1.annee);
         CA.push(ca1.CA);
       }
       console.log( annee + '----' + CA + '----'),
           this.myChart = new Chart( 'Chart-CA', {
             type: 'line',
             data: {
               labels: annee,
               datasets: [ {
                 label: 'DT ',
                 data: CA,
                 backgroundColor: 'rgba(0,200,155,.35)',
                 borderColor: 'rgba(0,200,155,0.60)',
                 borderWidth: 3.5,
                 pointStyle: 'circle',
                 pointRadius: 5,
                 pointBorderColor: 'transparent',
                 pointBackgroundColor: 'rgba(0,200,155,0.60)',
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
                     labelString: 'Annee',
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
                     labelString: 'Montant en Dt',
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
   }*/

    getEvoClient() {
        //  console.log('Get EvoClient');
        this.http.get(this.urlEvoClient).subscribe(EvoClient => {
            this.EvoClient = EvoClient;
            // console.log(this.EvoClient);
            //  console.log('succeess EvoClient');
            const datet = [];
            const nombre = [];
            for (const evo of this.EvoClient) {
                datet.push(evo.datet);
                nombre.push(evo.nombre);
            }
            // console.log( datet + '----' + nombre + '----'),
            this.myChart = new Chart('EvoClient', {
                type: 'line',
                data: {
                    labels: datet,
                    datasets: [{
                        label: 'Nombre ',
                        data: nombre,
                        fill: true,
                        backgroundColor: 'rgba(179, 255, 204)',
                        borderColor: 'rgba(0, 153, 51)',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(220,53,69,0.75)',
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
                                labelString: 'Annee',
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
                                labelString: 'Nombre',
                                fontSize: 15
                            }
                        }]
                    },
                    title: {
                        display: false,
                        text: 'Normal Legend'
                    }
                }
            });
        });
    }

    getDateDep() {
        // console.log('Get Reglement');
        this.http.get(this.urlDateDep).subscribe(DateDep => {
            this.DateDep = DateDep;
            //   console.log(this.DateDep);
            //  console.log('succeess DateDep');
            const dated = [];
            for (const dp of this.DateDep) {
                dated.push(dp.dated);
            }
        });
    }

    getdepenseParStationEtDate() {
        if (this.myChart) {
            this.myChart.destroy();
        }
        console.log(this.filterform.value);
        this.http.get(this.urldepenseParStationEtDate, {
            params: {
                date1: this.filterform.controls.date1.value,
                date2: this.filterform.controls.date2.value
            }
        }).subscribe(depenseParStationEtDate => {
            this.depenseParStationEtDate = depenseParStationEtDate;
            // console.log(this.depenseParStationEtDate);
            //  console.log('succeess depenseParStationEtDate');
            const typee = [];
            const dated = [];
            const montant = [];
            for (const dp of this.depenseParStationEtDate) {
                typee.push(dp.typee);
                dated.push(dp.dated);
                montant.push(dp.montant);
            }

            //  console.log( typee + '----' + montant),
            this.myChart = new Chart('depenseParStationEtDate', {
                type: 'bar',
                data: {
                    labels: typee,
                    datasets: [{
                        label: 'montant Dt',
                        data: montant,
                        fill: false,
                        backgroundColor: ['rgba(255, 153, 153)' , 'rgba((223, 32, 32)', 'rgba(128, 128, 128)', 'rgba(128, 255, 0)',
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
                            'rgba((223, 32, 32)', 'rgba(0, 26, 0)', 'rgba(0, 26, 0)', 'rgba(153, 153, 255)', 'rgba(02, 82, 02)'
                            , 'rgba(255, 204, 153)', 'rgba(153, 255, 204)', 'rgba(255, 255, 153)', 'rgba(127, 82, 93)'
                            , 'rgba((223, 32, 32)', 'rgba(128, 128, 128)', 'rgba(128, 255, 0)',
                            'rgba(0, 26, 102)', 'rgba(92, 10, 92)', 'rgba(255, 204, 255)',
                            'rgba((223, 32, 32)', 'rgba(0, 26, 0)', 'rgba(153, 153, 255)', 'rgba(02, 82, 02)'
                            , 'rgba(255, 204, 153)', 'rgba(153, 255, 204)', 'rgba(255, 255, 153)', 'rgba(127, 82, 93)'
                            , 'rgba(153, 255, 153)', 'rgba(204, 153, 255)',
                            'rgba(153, 255, 153)', 'rgba(204, 153, 255)',
                            'rgba(255, 153, 153)', 'rgba(0, 26, 0)',
                            'rgba(255, 204, 153)'
                        ],
                        borderColor: 'rgba(220,53,69,0.75)',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(220,53,69,0.75)',
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
                                labelString: 'Nombre',
                                fontSize: 15
                            }
                        }]
                    },
                    title: {
                        display: false,
                        text: 'Normal Legend'
                    }
                }
            });
        });
    }

    getDebitCreditDetail() {
        this.http.get(this.urlDebitCreditDetail, {
            params: {
                date1: this.filterform.controls.date1.value,
                date2: this.filterform.controls.date2.value
            }
        }).subscribe(DebitCreditDetail => {
            this.DebitCreditDetail = DebitCreditDetail;
            this.GenerateCSV();
        });
    }
    GenerateCSV() {
        const csv = new Angular5Csv(this.DebitCreditDetail, 'Rapport-Depenses', this.options);
    }

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.filterform.controls.date1.setValue('2014');
        this.filterform.controls.date2.setValue('2018');

        this.getDepenseParAnnee();
        // this.getCAparAnnee();
        this.getEvoClient();
        this.getdepenseParStationEtDate();
        this.getRandomColor();
        this.getDateDep();
        /* this.chart0();
        this.chart1();
        this.getNbEmploye(); */
    }

    getNbEmploye() {
        // console.log('Get Nombre Emps');
        return this.http.get(this.urlNbEmploye).subscribe(nbEmp => {
            this.nbEmp = nbEmp[0].nombreEmploye;
            // console.log(nbEmp[0].nombreEmploye);
            // console.log('succeess');
        });
    }

    /* chart0() {
         const myChart = new Chart('sales-chart', {
             type: 'line',
             data: {
                 labels: ['test', 'lool', '2014', '2015', '2016', '2017', '2018'],
                 datasets: [{
                     label: 'Foods',
                     data: [0, 30, 15, 110, 50, 63, 120],
                     backgroundColor: 'transparent',
                     borderColor: 'rgba(220,53,69,0.75)',
                     borderWidth: 3,
                     pointStyle: 'circle',
                     pointRadius: 5,
                     pointBorderColor: 'transparent',
                     pointBackgroundColor: 'rgba(220,53,69,0.75)',
                 }, {
                     label: 'Electronics',
                     data: [0, 50, 40, 80, 35, 99, 80],
                     backgroundColor: 'transparent',
                     borderColor: 'rgba(40,167,69,0.75)',
                     borderWidth: 3,
                     pointStyle: 'circle',
                     pointRadius: 5,
                     pointBorderColor: 'transparent',
                     pointBackgroundColor: 'rgba(40,167,69,0.75)',
                 }, {
                     label: 'mbourou',
                     data: [10, 50, 15, 30, 35, 60, 90],
                     backgroundColor: 'transparent',
                     borderColor: 'rgba(244, 208, 65)',
                     borderWidth: 3,
                     pointStyle: 'circle',
                     pointRadius: 5,
                     pointBorderColor: 'transparent',
                     pointBackgroundColor: 'rgba(244, 208, 65)',
                 }]
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
                     xAxes: [{
                         display: true,
                         gridLines: {
                             display: false,
                             drawBorder: false
                         },
                         scaleLabel: {
                             display: false,
                             labelString: 'Month'
                         }
                     }],
                     yAxes: [{
                         display: true,
                         gridLines: {
                             display: false,
                             drawBorder: false
                         },
                         scaleLabel: {
                             display: true,
                             labelString: 'Value'
                         }
                     }]
                 },
                 title: {
                     display: false,
                     text: 'Normal Legend'
                 }
             }
         });
     }*/

    /* chart1() {
         const myChart = new Chart('team-chart', {
             type: 'line',
             data: {
                 labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
                 datasets: [{
                     data: [0, 7, 3, 5, 2, 8, 6],
                     label: 'Expense',
                     backgroundColor: 'rgba(0,200,155,.35)',
                     borderColor: 'rgba(0,200,155,0.60)',
                     borderWidth: 3.5,
                     pointStyle: 'circle',
                     pointRadius: 5,
                     pointBorderColor: 'transparent',
                     pointBackgroundColor: 'rgba(0,200,155,0.60)',
                 },
                     {
                         data: [0, 6, 3, 4, 3, 7, 10],
                         label: 'Profit',
                         backgroundColor: 'rgba(0,194,146,.25)',
                         borderColor: 'rgba(0,194,146,0.5)',
                         borderWidth: 3.5,
                         pointStyle: 'circle',
                         pointRadius: 5,
                         pointBorderColor: 'transparent',
                         pointBackgroundColor: 'rgba(0,194,146,0.5)',
                     },]
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
                     position: 'top',
                     labels: {
                         usePointStyle: true,
                         fontFamily: 'Montserrat',
                     },


                 },
                 scales: {
                     xAxes: [{
                         display: true,
                         gridLines: {
                             display: false,
                             drawBorder: false
                         },
                         scaleLabel: {
                             display: false,
                             labelString: 'Month'
                         }
                     }],
                     yAxes: [{
                         display: true,
                         gridLines: {
                             display: false,
                             drawBorder: false
                         },
                         scaleLabel: {
                             display: true,
                             labelString: 'Value'
                         }
                     }]
                 },
                 title: {
                     display: false,
                 }
             }
         });

     }*/


}

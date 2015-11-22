/**
 * Created by shmn on 20/11/2015.
 */
(function(blm){

    'use strict';

    blm.mainViewer = {

        viewModel: kendo.observable({


            trxDS : blm.trxModel,
            userDS : blm.userModel,
            newuserdata : new blm.userSchema,
            newtrxdata : new blm.trxSchema,
            operHeader : null,
            btnOperation : null,
            formstate : null,
            trxDate : null,
            trxDateTime : null,
            formState : null,
            viewid : null,

            actionBelanja : function(e) {
                $("#actionBelanja").data("kendoMobileActionSheet").open();
            },

            actionHasil : function(e) {
                $("#actionHasil").data("kendoMobileActionSheet").open();
            },

            actionHutang : function(e) {
                $("#actionHutang").data("kendoMobileActionSheet").open();
            },


            padamRekod : function(e) {

                var trxid = this.get('newtrxdata.TRXID');


                $.ajax({

                    type: 'DELETE',
                    url: blm.apiserver + '/api/v1/trxs/' + trxid,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('x-access-token', blm.token);
                    },
                    complete: function (xhr) {

                        var obj = JSON.parse(xhr.responseText);

                        if (!obj.error) {

                            console.log(obj.message);



                        } else {
                            console.log(obj.message);
                        }


                    }


                });


              blm.app.navigate(this.get('viewid'));
            },




            simpanData : function(e) {

                this.set('newtrxdata.TRXDATE', moment($('#trxdateBelanja').val()+ ' ' + $('#trxdatetimeBelanja').val()).format("YYYYDDMMHHmm"));
                // insert date in oracle as follow : to_date(TRXDATE,'YYYYDDMMHHmm')



                console.log(this.get('newtrxdata'));

               // blm.app.navigate("tabBelanja");
                return false;
            }
            ,

            gps : function(e) {
              alert('Maaf, Fungsi GPS Belum Berfungsi');
              return false;
            },

            kamera : function(e) {
              alert('Maaf, Fungsi Kamera Belum Berfungsi');
                return false;
            },

            initProfail : function(e) {
                this.set('operHeader','Profail Anda');
                this.set('newuserdata',this.userDS.view()[0]);
                this.set('operHeader','Profail');
                this.set('btnOperation','Kemaskini');
            },

            initHasil : function(e) {
                moment.locale('ms-my');

                this.set('formState','add');
                this.trxDS.read();
                this.userDS.read();

                this.trxDS.filter({"field": "TRXTYPE", "operator": "eq", "value": 'h'});
                this.set('operHeader','Senarai Pendapatan');


                //this.userData.read();
                //this.trxData.read();


            },



            initBelanja : function(e) {
                moment.locale('ms-my');
                this.set('formState','add');
                this.trxDS.read();
                this.userDS.read();

                this.trxDS.filter({"field": "TRXTYPE", "operator": "eq", "value": 'b'});
                this.set('operHeader','Senarai Perbelanjaan');



                //this.userData.read();
                //this.trxData.read();


            },
            initHutang : function(e) {
                moment.locale('ms-my');
                this.set('formState','add');
                this.trxDS.read();
                this.userDS.read();

                this.trxDS.filter({"field": "TRXTYPE", "operator": "eq", "value": 'd'});

                this.set('operHeader','Senarai Hutang');



                //this.userData.read();
                //this.trxData.read();


            },

            initStatistik : function(e) {

                moment.locale('ms-my');
                // kendo-dataviz require license, so i use open source CHARTJS here
                // an assignment to my student, use data from db to generate line plotting
                // the example shows dummy data

                Chart.defaults.global.responsive = true;

                var lineChartData = {
                    "datasets": [{
                        "data": [
                            "85",
                            "87",
                            "70",
                            "80",
                            "78",
                            "69",
                            "150",
                            "93",
                            "59",
                            "88"],
                        "pointStrokeColor": "#fff",
                        "fillColor": "rgba(220,220,220,0.5)",
                        "pointColor": "rgba(220,220,220,1)",
                        "strokeColor": "rgba(220,220,220,1)"
                    }],
                    "labels": [
                        "2013-01-01",
                        "2013-01-04",
                        "2013-01-15",
                        "2013-02-03",
                        "2013-03-25",
                        "2013-04-03",
                        "2013-04-14",
                        "2013-05-27",
                        "2013-05-27",
                        "2013-08-03"]
                };

                var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
                this.set('operHeader','Statistik Kewangan Anda');



            },


            tabHasil : function(e) {

                this.trxDS.read();
                this.trxDS.filter({"field": "TRXTYPE", "operator": "eq", "value": 'h'});

                $('#tabhasil').show();
                $('#tabbelanja').hide();
                $('#tabhutang').hide();
                $('#tabstatistik').hide();
            },

            // solution for oracle autoincrement conflict with localstoragedb

            getuuids : function() {

                var currid = localStorage.getItem('blsysid');

                if (!currid) {
                    localStorage.setItem('blsysid',1);
                }   else {

                    currid = parseInt(currid) + 1;
                    localStorage.setItem('blsysid',currid);


                }
                return currid;

            },


            tabBelanja : function(e) {

                //this.trxDS.read();
                this.trxDS.filter({"field": "TRXTYPE", "operator": "eq", "value": 'b'});

                $('#tabhasil').hide();
                $('#tabbelanja').show();
                $('#tabstatistik').hide();
                $('#tabhutang').hide();
            }
            ,
            tabStatistik : function(e) {



            },

            tabHutang : function(e) {

                //this.trxDS.read();
                this.trxDS.filter({"field": "TRXTYPE", "operator": "eq", "value": 'd'});

                $('#tabhutang').show();
                $('#tabbelanja').hide();
                $('#tabhasil').hide();
                $('#tabstatistik').hide();
            },


            viewDetHasil : function(e) {
                moment.locale('en');
                this.set('viewid','tabHasil');
                this.set('formState','update');
                this.set('newtrxdata', e.dataItem);
                this.set('trxDate',moment(e.dataItem.TRXDATE).format('YYYY-MM-DD')); // html5 spec fix date format YYYY-MM-DD
                this.set('trxDateTime',moment(e.dataItem.TRXDATE).format('hh:mm')); // html5 spec fix date format hh:mm (24h)
                this.set('operHeader','Kemaskini Pendapatan');
                this.set('btnOperation','Kemaskini');
                this.set('formstate','update');


            },

            viewDetBelanja : function(e) {
                moment.locale('en');
                this.set('formState','update');
                this.set('viewid','tabBelanja');
                console.log("viewDetBelanja");
                this.set('newtrxdata', e.dataItem);
                this.set('trxDate',moment(e.dataItem.TRXDATE).format('YYYY-MM-DD')); // html5 spec fix date format YYYY-MM-DD
                this.set('trxDateTime',moment(e.dataItem.TRXDATE).format('hh:mm')); // html5 spec fix date format hh:mm (24h)
                this.set('operHeader','Kemaskini Perbelanjaan');
                this.set('btnOperation','Kemaskini');
                this.set('formstate','update');



            },

            viewDetHutang : function(e) {
                moment.locale('en');
                this.set('formState','update');
                this.set('viewid','tabHutang');
                this.set('newtrxdata', e.dataItem);
                this.set('trxDate',moment(e.dataItem.TRXDATE).format('YYYY-MM-DD')); // html5 spec fix date format YYYY-MM-DD
                this.set('trxDateTime',moment(e.dataItem.TRXDATE).format('hh:mm')); // html5 spec fix date format hh:mm (24h)
                this.set('operHeader','Kemaskini Hutang');
                this.set('btnOperation','Kemaskini');
                this.set('formstate','update');

            },

            afterShow: function(e) {

                console.log('afterShow');


            },

            hide : function(e) {

                console.log('hide');


            },

            viewAddBelanja:function() {

                // clear trxData and display modal form

                    this.set('newtrxdata', {});
                    this.set('operHeader', 'Masukkan Perbelanjaan Baru');
                    this.set('newtrxdata.TRXTYPE','b');
                    this.set('btnOperation', 'Simpan');
                    this.set('formstate', 'add');
                    console.log(this.get('newtrxdata'));


                //blm.app.navigate("frmBelanja");

                //$("#trxsBelanjaModal").modal('show');

            },

            viewAddHasil:function(e) {


                this.set('newtrxdata', {});
                this.set('operHeader','Masukkan Pendapatan Baru');
                this.set('btnOperation','Simpan');
                this.set('formstate','add');
                this.newtrxdata.TRXTYPE='h';

                //blm.app.navigate("frmHasil");

            },

            viewAddHutang:function(e) {


                this.set('newtrxdata', {});
                this.set('operHeader','Masukkan Hutang Baru');
                this.set('btnOperation','Simpan');
                this.set('formstate','add');
                this.newtrxdata.TRXTYPE='d';

                //blm.app.navigate("frmHutang");

            },


            viewProfail : function (e) {

                this.set('newuserdata',this.userDS.view()[0]);
                this.set('operHeader','Profail');
                this.set('btnOperation','Kemaskini');

                //$("#userProfailModal").modal('show');
                blm.app.navigate("frmProfail");

            },

            simpanBelanja : function(e) {



                // oracle tak kenal format pagi/petang, jadi kena reset locale kepada english balik
                // untuk paparan sahaja  moment.locale('ms-my');
                moment.locale('en');

                // test using jquery selector, take note ..

                var oper = this.get('formState');



                if (oper === 'add') {


                    var amount =  this.get('newtrxdata.AMOUNT');
                    var item = this.get('newtrxdata.ITEM');
                    var trxdate = moment($('#trxdateBelanja').val()+ ' ' + $('#trxdatetimeBelanja').val()).format("YYYY/DD/MM h:mm A");


                    $.ajax({

                        type: 'POST',
                        url: blm.apiserver + '/api/v1/trxs',
                        data: JSON.stringify({"amount": amount, "item": item, trxtype: 'b',"trxdate" : trxdate}),
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('x-access-token', blm.token);
                        },
                        complete: function (xhr) {

                            var obj = JSON.parse(xhr.responseText);

                            if (!obj.error) {

                                console.log(obj.message);



                            } else {
                                console.log(obj.message);
                            }


                        }


                    });

                } else if  (oper === 'update') {

                    var amount =  this.get('newtrxdata.AMOUNT');
                    var trxid = this.get('newtrxdata.TRXID');
                    var item = this.get('newtrxdata.ITEM');
                    var trxdate = moment($('#etrxdateBelanja').val()+ ' ' + $('#etrxdatetimeBelanja').val()).format("YYYY/DD/MM h:mm A");



                    $.ajax({

                        type: 'PUT',
                        url: blm.apiserver + '/api/v1/trxs/' + trxid,
                        data: JSON.stringify({"amount": amount, "item": item, "trxtype": 'b', "trxdate" : trxdate}),
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('x-access-token', blm.token);
                        },
                        complete: function (xhr) {

                            var obj = JSON.parse(xhr.responseText);

                            if (!obj.error) {

                                console.log(obj.message);


                            } else {
                                console.log(obj.message);
                            }


                        }


                    });



                } else {
                    //do nothing
                }

                this.trxDS.read();
                this.trxDS.filter({"field": "TRXTYPE", "operator": "eq", "value": 'b'});

                blm.app.navigate("tabBelanja");





            },

            simpanHutang : function (e) {


                // oracle tak kenal format pagi/petang, jadi kena reset locale kepada english balik
                // untuk paparan sahaja  moment.locale('ms-my');
                moment.locale('en');

                var oper = this.get('formState');

                if (oper === 'add') {

                    var amount =  this.get('newtrxdata.AMOUNT');
                    var item = this.get('newtrxdata.ITEM');
                    var trxdate = moment($('#trxdateHutang').val()+ ' ' + $('#trxdatetimeHutang').val()).format("YYYY/DD/MM h:mm A");



                    $.ajax({

                        type: 'POST',
                        url: blm.apiserver + '/api/v1/trxs',
                        data: JSON.stringify({"amount": amount, "item": item, trxtype: 'd', "trxdate" : trxdate}),
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('x-access-token', blm.token);
                        },
                        complete: function (xhr) {

                            var obj = JSON.parse(xhr.responseText);

                            if (!obj.error) {

                                console.log(obj.message);


                            } else {

                                console.log(obj.message);
                            }


                        }


                    });

                } else if  (oper === 'update') {

                    var amount =  this.get('newtrxdata.AMOUNT');
                    var item = this.get('newtrxdata.ITEM');
                    var trxid = this.get('newtrxdata.TRXID');
                    var trxdate = moment($('#etrxdateHutang').val()+ ' ' + $('#etrxdatetimeHutang').val()).format("YYYY/DD/MM h:mm A");


                    $.ajax({

                        type: 'PUT',
                        url: blm.apiserver + '/api/v1/trxs/'+trxid,
                        data: JSON.stringify({"amount": amount, "item": item, "trxtype": 'd', "trxdate" : trxdate}),
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('x-access-token', blm.token);
                        },
                        complete: function (xhr) {

                            var obj = JSON.parse(xhr.responseText);

                            if (!obj.error) {

                                console.log(obj.message);


                            } else {
                                console.log(obj.message);
                            }


                        }


                    });



                } else {
                    //do nothing
                }

                this.trxDS.read();
                this.trxDS.filter({"field": "TRXTYPE", "operator": "eq", "value": 'd'});

                blm.app.navigate("tabHutang");

            },

            simpanHasil : function (e) {

                // oracle tak kenal format pagi/petang, jadi kena reset locale kepada english balik
                // untuk paparan sahaja  moment.locale('ms-my');
                moment.locale('en');

                var oper = this.get('formState');



                if (oper === 'add') {

                    var amount =  this.get('newtrxdata.AMOUNT');
                    //var trxid =   this.get('newtrxdata.TRXID');
                    var item = this.get('newtrxdata.ITEM');
                    var trxdate = moment($('#trxdateHasil').val()+ ' ' + $('#trxdatetimeHasil').val()).format("YYYY/DD/MM h:mm A");

                    $.ajax({

                        type: 'POST',
                        url: blm.apiserver + '/api/v1/trxs',
                        data: JSON.stringify({"amount": amount, "item": item, "trxtype": 'h',"trxdate": trxdate}),
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('x-access-token', blm.token);
                        },
                        complete: function (xhr) {

                            var obj = JSON.parse(xhr.responseText);

                            if (!obj.error) {

                                console.log(obj.message);


                            } else {
                                console.log(obj.message);

                            }


                        }


                    });

                } else if  (oper === 'update') {

                    var amount =  this.get('newtrxdata.AMOUNT');
                    var trxid =   this.get('newtrxdata.TRXID');
                    var item = this.get('newtrxdata.ITEM');
                    var trxdate = moment($('#etrxdateHasil').val()+ ' ' + $('#etrxdatetimeHasil').val()).format("YYYY/DD/MM h:mm A");

                    $.ajax({

                        type: 'PUT',
                        url: blm.apiserver + '/api/v1/trxs/' + trxid,
                        data: JSON.stringify({"amount": amount, "item": item, "trxtype": 'h', "trxdate" : trxdate }),
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('x-access-token', blm.token);
                        },
                        complete: function (xhr) {

                            var obj = JSON.parse(xhr.responseText);

                            if (!obj.error) {

                                console.log(obj.message);



                            } else {
                                console.log(obj.message);

                            }


                        }


                    });



                } else {
                    //do nothing
                }

                this.trxDS.read();
                this.trxDS.filter({"field": "TRXTYPE", "operator": "eq", "value": 'h'});

                blm.app.navigate("tabHasil");
            }



        })




    };


})(blm); //pass in global namespace


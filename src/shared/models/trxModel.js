/**
 * Created by shmn on 10/11/2015.
 */


(function(blm){

    'use strict';

    blm.trxSchema = kendo.data.Model.define({
        id : 'TRXID',
        fields : {
            TRXID : {editable: false, nullable: true},
            USERID : {editable: false, nullable: true},
            AMOUNT: { editable: true, nullable: true },
            TRXDATE : {editable: true, nullable: true},
            ITEM : {editable: true, nullable: true},
            ACTIVE : {editable: true, nullable: true},
            TRXTYPE : {editable: true, nullable: true}
        }
    });



    blm.trxModel = new kendo.data.DataSource({
        offlineStorage: 'trxModel',
        traditional: true,
        //autoSync: true, //sync changes with restful API automatically

        transport: {

            read: {
                url: blm.apiserver + "/api/v1/trxs",
                dataType: 'json', //not needed jQuery figures it out, shown to be verbose
                type: 'GET', //defined but, this is the default
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('x-access-token', blm.token);
                },
                complete: function(xhr, textStatus) {

                    var obj = JSON.parse(xhr.responseText);
                    //console.log(obj)
                }

            },

            create : function(options) {

                // use jquery ajax



            },



            update: {
              // use jquery ajax

            },
            destroy: {
              // use jquery ajax
            }





        },

        requestStart: function(e) {
            if (e.type != "read") {
                console.log(kendo.format("Request start ({0})", e.type));
            }
        },
        requestEnd: function(e) {
            if (e.type != "read") {
                console.log(kendo.format("Request end ({0})", e.type));
            }
        },
        batch: true,
        schema: {
            model: blm.trxSchema
        },


        error: function (xhr, error) {

            console.log(xhr);

        }
    });


    //blm.trxModel.read();

    /*
    blm.pollTrx = setInterval(function() {

        $.ajax({
                // use an URL from the same domain to adhere to the same origin policy
                url: blm.apiserver
            })
            .done(function() {
                // the ajax request succeeded - we are probably online.
                blm.trxModel.online(true);
            })
            .fail(function() {
                // the ajax request failed - we are probably offline.
                blm.trxModel.online(false);
                blm.trxModel.read();
            });
    }, 5000);
    */


})(blm); //pass in global namespace

// TODO : masukkan fungsi $.ajax dalam kendo transport untuk menyelesaikan masalah JSON Payload
// tidak dibaca (empty) dalam req.body API


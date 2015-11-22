/**
 * Created by shmn on 10/11/2015.
 */


(function(blm){

    'use strict';

     blm.userSchema = kendo.data.Model.define({
        id : 'USERID',
        fields : {
            USERID : {editable: false},
            PASSWORD: { editable: true },
            NAME : {editable : true},
            EMEL : {editable : true},
            ACTIVE : {editable : false}

        }
    });



    blm.userModel = new kendo.data.DataSource({
        offlineStorage: 'userModel',
        //autoSync: true, //sync changes with restful API automatically

        transport: {
            read: {
                url: blm.apiserver + "/api/v1/users",
                dataType: 'json', //not needed jQuery figures it out, shown to be verbose
                type: 'GET', //defined but, this is the default
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('x-access-token', blm.token);
                },
                complete: function(xhr, textStatus) {

                    var obj = JSON.parse(xhr.responseText);
                    //console.log(obj.message, "<-read message")
                }

            },

            create: {
                url: blm.apiserver + '/register',
                dataType: 'json',
                type: 'POST',



                complete: function(xhr, textStatus) {

                    var obj = JSON.parse(xhr.responseText);

                    if (!obj.error) { // if error=false (no errors)

                        localStorage.setItem("userProfile", obj.data); // save token to localstorage

                    } else {

                        console.log('/register ' + obj.message); // display if any error
                    }


                }



            },
            update: {
                url: blm.apiserver + '/api/v1/users',
                type: 'PUT',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('x-access-token', blm.token);
                },
                complete: function(xhr, textStatus) {

                    var obj = JSON.parse(xhr.responseText);

                    if (!obj.token) { // if error=false (no errors)

                        localStorage.setItem("userProfile", obj.data); // save token to localstorage

                    } else {

                        console.log('/api/v1/users ' + obj.message); // display if any error
                    }


                }
            },
            destroy: {
                url: function(data) {
                    return blm.apiserver + '/users/' + data.USERID;
                },
                type: 'DELETE',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('x-access-token', blm.token);
                }
            }
        },

        schema: {
            model: blm.userSchema
        },


        error: function (xhr, error) {

            console.log(xhr);

        }
    });



    //blm.userModel.read();


    /*
    blm.pollUser = setInterval(function() {

       $.ajax({
                // use an URL from the same domain to adhere to the same origin policy
                url: blm.apiserver
            })
            .done(function() {
                // the ajax request succeeded - we are probably online.
                blm.userModel.online(true);
            })
            .fail(function() {
                // the ajax request failed - we are probably offline.
                blm.userModel.online(false);
                blm.trxModel.read();

            });
        }, 5000);

     */

})(blm); //pass in global namespace
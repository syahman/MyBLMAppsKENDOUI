/**
 * Created by shmn on 19/11/2015.
 */
/**
 * Created by shmn on 11/11/2015.
 */
(function(blm){

    'use strict';
    blm.setipViewer = {

        viewModel: kendo.observable({

            afterShow : function(e) {
            console.log('afterShow');

            },

            setipnow : function(e) {

            var ip = $('#setiptest').val();


                if (ip) {

                    $.ajax({url: blm.apiserver + '/',
                        type: "HEAD",
                        timeout:1000,
                        statusCode: {
                            200: function (response) {


                                    blm.app.navigate('tabHasil');

                            },
                            400: function (response) {
                                //set alert here
                                blm.app.navigate("setip");
                                console.log("HEAD 400")
                                return false;
                            },
                            0: function (response) {
                                //set alert here
                                console.log("HEAD 0");
                                blm.app.navigate("setip");
                                return false;
                            }
                        }
                    });



                    $.ajax({
                        url: ip + '/',

                        success: function (result) {
                            console.log('Berjaya ping ke server');
                            //save to localstorage URL
                            localStorage.setItem("serverIP",ip);


                                blm.app.navigate("login");


                        },
                        error: function (result) {
                            console.log('Timeout/error');
                        }
                    });

                } else {

                  console.log('Sila masukkan IP/Hostname dalam format http(s)://<ip/hostname>:<port>')
                }


            }





        })




    };





})(blm); //pass in global namespace
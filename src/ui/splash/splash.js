/**
 * Created by shmn on 11/11/2015.
 */
(function(blm){

   "use strict";

    blm.splashViewer = {

        viewModel: kendo.observable({


            init : function(e) {




            },

            afterShow : function(e) {

                //blm.showLoading();


                if (!blm.apiserver ) {



                        blm.app.navigate('setip');



                //return false;
                } else {


                    if (!blm.token) {

                        console.log('route ke page daftar');


                            blm.app.navigate('login');



                    } else {


                        $.ajax({url: blm.apiserver + '/',
                            type: "HEAD",
                            timeout:1000,
                            statusCode: {
                                200: function (response) {


                                        blm.app.navigate('tabHasil');

                                },
                                400: function (response) {
                                    //set alert here

                                    alert('Sila Setkan IP Server');
                                    console.log("HEAD 400")
                                    blm.app.navigate("setip");
                                    return false;
                                },
                                0: function (response) {
                                    //set alert here
                                    alert('Sila Setkan IP Server');
                                    console.log("HEAD 0")
                                    blm.app.navigate("setip");
                                    return false;
                                }
                            }
                        });







                    }

                } // end of checking server connectivity testing logic

            }





        })




    };





})(blm); //pass in global namespace
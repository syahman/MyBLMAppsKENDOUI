
(function(blm){

    'use strict';
    blm.loginViewer = {

        viewModel: kendo.observable({

            login : function(e) {

            // use standard jquery ajax



            var lemel = $('#lemel').val();
            var lpassword = $('#lpassword').val();

                $.ajax({

                    type : 'POST',
                    url : blm.apiserver + '/login',
                    data : JSON.stringify({"emel" : lemel, "password" : lpassword}),
                    dataType : 'json',
                    contentType : "application/json; charset=utf-8",

                    complete : function(xhr) {

                        var obj = JSON.parse(xhr.responseText);

                        if (!obj.error) {

                            //save token and navigate to main page

                            console.log(obj.message);
                            console.log(obj);
                            localStorage.setItem("userProfile", obj.data.token); // save token to localstorage

                            // re read db for latest changes and sync to apps

                            blm.trxModel.read();
                            blm.userModel.read();



                                blm.app.navigate('tabHasil')


                        } else {
                            //alert(obj.message);
                            console.log(obj.message);
                            $('#lemel').val('');
                            $('#lpassword').val('');
                            //blm.app.navigate('login');


                        }


                    }








                });


            },

            init : function(e) {

                if (!blm.apiserver) {
                blm.app.navigate("setip");
                } else {

                    if (!blm.token) {

                        console.log('route ke page daftar');


                            //app.hideLoading();
                            blm.app.navigate('login');



                    } else {

                        console.log('route ke main page');


                            blm.app.navigate('tabHasil');


                    }



                }

            }





        })




    };





})(blm); //pass in global namespace
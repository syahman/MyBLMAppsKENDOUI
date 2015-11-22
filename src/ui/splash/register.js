
(function(blm){

    'use strict';
    blm.registerViewer = {

        viewModel: kendo.observable({

            trxDS : blm.trxModel,
            userDS : blm.userModel,


            register : function(e) {

                // use standard jquery ajax



                var rname = $('#rname').val();
                var remel = $('#remel').val();
                var rpwd1 = $('#rpwd1').val();
                var rpwd2 = $('#rpwd2').val();

                //console.log(rname+remel+rpwd1+rpwd2);

                if (rpwd1 !== rpwd2) {
                    alert('Password Tak Sama!');
                return false;
                }



                $.ajax({

                    type : 'POST',
                    url : blm.apiserver + '/register',
                    data : JSON.stringify({"name" : rname,"emel" : remel, "password" : rpwd1}),
                    dataType : 'json',
                    contentType : "application/json; charset=utf-8",

                    complete : function(xhr) {

                        var obj = JSON.parse(xhr.responseText);

                        if (!obj.error) {

                            //save token and navigate to main page
                            console.log('success!');
                            console.log(obj.message);
                            console.log(obj);
                            localStorage.setItem("userProfile", obj.data.token); // save token to localstorage

                            //re-read db

                            //this.trxDS.read();
                            //this.userDS.read();

                            //blm.trxModel.read();
                            //blm.userModel.read();

                            // don't make it too fast, add delay
                            alert('Pengguna Telah Didaftarkan');

                            setTimeout(function()
                            {
                                blm.app.navigate('tabHasil')

                            },3000);


                        } else {
                            //alert(obj.message);
                            console.log(obj.message);
                            $('#rname').val('');
                            $('#remel').val('');
                            $('#rpwd1').val('');
                            $('#rpwd2').val('');
                            //blm.app.navigate('login');


                        }


                    }








                });


            },

            init : function(e) {
                console.log("init");
            }





        })




    };





})(blm); //pass in global namespace
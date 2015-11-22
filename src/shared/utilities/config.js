/**
 * Created by shmn on 10/11/2015.
 */

(function(blm){

    'use strict';

    //blm.apiserver = 'http://192.168.41.167:3000';

    //get from localstorage ..

    blm.apiserver = localStorage.getItem('serverIP');
    blm.ipstatus = false;



})(blm); //pass in global namespace
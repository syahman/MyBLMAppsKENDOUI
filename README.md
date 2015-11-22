**Frontend Mobile Aplikasi Buku555 Versi KENDOUI Mobile**

Ini adalah versi "working" untuk simulasi CRUD bagi RESTful API Server Projek Buku555. Maklumat lanjut setup API
boleh didapati disini : [https://github.com/syahman/Buku555NodeAPI](https://github.com/syahman/Buku555NodeAPI). Nota lengkap boleh merujuk blog saya [http://www.shmn.my](http://www.shmn.my).
Sebarang "bugs" boleh diajukan dengan membuka github issues. 

**Sila ikut arahan di bawah untuk pemasangan pustaka NodeJS dan Bower. **
 

1. git clone https://github.com/syahman/MyBLMAppsKENDOUI.git 
   
2. cd MyBLMAppsKENDOUI

3. sudo npm install 
  
4. sudo npm install -g bower

5. npm config set prefix /usr/local ( selesaikan masalah gulp jika command not found-osx )

        npm config set prefix /usr/local
    

6. sudo npm install -g gulp
 
7. bower install  

8. sekiranya ada masalah nak install bower, taip arahan di bawah :

        git config --global url.https://github.com/.insteadOf git://github.com/
    
    Kemudian, run semula step no. 7
    
9. gulp dev          

10. rujuk nota Load Dalam Phonegap Build/Cordova di sini [todo](todo)

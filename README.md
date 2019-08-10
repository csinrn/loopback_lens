# loopback_lens
<br>
## 安裝

### 安裝loopback4  

 ![loopback4](readme_pic/loopback4.png)

###	安裝 mariaDB
https://mariadb.org/download/  
loopback專案中目前設置的db 資訊是:  
username : root   
password: 1234567  
at  localhost : 3306  
建議先設定成一樣的，然後載入lens.SQL，共一個db兩張表  

 ![db](readme_pic/db.png)
 

###	靜態網頁資料放入  /public  
將前端的資料放入/public並將主檔案命名為imdex.html


### 執行 
進入根目錄下，執行npm install & npm start，應該會看到下圖代表成功   

 ![npm](readme_pic/npm.png)





<br>
<br>
## API


### Userlens Model(使用者的隱眼紀錄) :

* 新增：[post] /user
<pre>
requestBody = {  
  "userid": 0,
  "lensid": 0,
  "lenscount": 0,   使用者選擇該隱眼的次數
  "lenstime": 0,    更新使用者使用該隱眼的時長 
  "createat": 0,   (optional)
  "updateat": 0    (optional)
}
</pre> 

* 取得：[get] /user/{user_id}  取得使用者的所有隱眼紀錄  
  or [get] /user  取得所有user的所有資料
* 更新：[patch] /{user_id}/{lens_id}/time  
  更新使用者使用該隱眼的時長   
requestBody = { "lenstime": 0 }
* 更新：[patch] /{user_id}/{lens_id}/count   
更新使用者選擇該隱眼的次數，count 直接 + 1

    
    
### Lens(隱形眼鏡模型) :
* 新增：[post] /lens
<pre>
requestBody = {
  	"lenspic": [0],     // array ,存放照片用，如果存不進去我們再來研究他
 	"lensname": "string",
  	"createat": 0,  (optional)
  	"updateat": 0   (optional)
}
</pre>

* 刪除：[delete] /lens/{id}
* 排序：[patch]  /lens/sort/{id1}/{id2}  
  還沒做，這個的功能是?
* 命名：[patch]  /lens/{id}/name  
requestBody = {  "lensname": "lens_name" }
* 更新：[patch]  /lens/{id}  
requestBody = {  看你想更新甚麼屬性就放進來吧  }

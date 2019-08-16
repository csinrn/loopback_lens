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
將前端的資料放入/public並將主檔案命名為index.html


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
  "lenscount": 0,         // 使用者選擇該隱眼的次數
  "lenstime": 0,          //更新使用者使用該隱眼的時長
  "createat": "string",   // optional
  "updateat": "string"    // optional
}
</pre>
  物件 id 會在新增物件的時候被後端自動指定(auto increase)，無法在request body指定
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
  "lenspic": "string",   // 存放照片用，存不進去我們再來研究要用甚麼型別
  "name": "string",
  "diameter": 0,
  "bc": 0,     //弧度
  "power": 0,   //度數
  "water": 0,    //含水量
  "wearingtime": "string",  // should be one of {"daily", "weekly", "monthly", "annually"}
  "placeofprod": "string",   // 產地
  "price": 0,
  "specialprice": 0,      // optional
  "eventdisp": "string",   // 活動敘述 optional
  "license": "string",   // 許可證字號
  "newtag": 0,
  "hotsaletag": 0,
  "onsaletag": 0,
  "launchat": "string",    // 上架時間
  "closeat": "string",      // 下架時間 optional
  "url": "string"        // optional
}
</pre>
  id 會在新增物件的時候被後端自動指定(auto increase)

* 刪除：[delete] /lens/{id}
* 排序：[patch]  /lens/sort/{id1}/{id2}
  還沒做，這個的功能是?
* 命名：[patch]  /lens/{id}/name
<pre>
  requestBody = {  "name": "string" }
</pre>
* 更新：[patch]  /lens/{id}
<pre>
requestBody = {  看你想更新甚麼屬性就放進來吧  }
</pre>


### Admin(管理者模型) :
* 新增：[post] /admins
<pre>
requestBody = {
  "account": "string",    // unique & id field
  "password": "string",   // len(password) >= 8
  "creatat": "string",
  "name": "string"
}
</pre>
* 登入：[post] /admins/login
<pre>
requestBody = {
  "account": "string",
  "password": "string"
}
</pre>
會回傳jwt token，在其他需要權限的API中，需在header中加入{"Authorization: "Bearer {token}" }
token 會在expire time 之後失效

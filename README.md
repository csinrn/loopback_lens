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


### 執行

假如要使用vpn，先連上vpn後，將當前ip填入三個地方(如果跑在本地端就填localhost)：
./public/index.html  變數userip
./src/datasources/lens.datasource.json  host&port
./index.js  host
<br>
進入根目錄下，執行npm install & npm start，應該會看到下圖代表成功


 ![npm](readme_pic/npm.png)





<br>
<br>

## API
可在執行npm start，成功開啟loopback後端後進入 http://localhost:3000/explorer，有API的示範，點擊API→try it out 可有範例的requestBody，只不過此頁面中的execute無法攜帶jwt驗證，因此測試API需要經過cmd的curl，或者註解掉後端的認證部分 (希望註解的話來問我吧)

### Lens(隱形眼鏡模型) :
* 新增：[post] /lens
  id 會在新增物件的時候被後端自動指定(auto increase)
<pre>
requestBody = {
  "name": "string",
  "diameter": 0,
  "bc": 0,     //弧度
  "powerH": 0,   //度數上限
  "powerL" 0,  //度數下限
  "water": 0,    //含水量
  "daily": 0 or 1,  // should be one of {"daily", "weekly", "monthly", "annually"}
  "biweekly": 0 or 1,
  "monthly": 0 or 1,
  "placeOfProd": "string",   // 產地
  "price": 0,
  "specialPrice": 0,      // optional
  "eventDisp": "string",   // 活動敘述 optional
  "license": "string",   // 許可證字號
  "newTag": 0,      // 0 或 1
  "hotsaleTag": 0,  // 0 或 1
  "onsaleTag": 0,   // 0 或 1
  "createAt": "string",    // 上架時間  需為 "190303" 格式的日期字串
  "updateAt": "string",      // 下架時間 optional, 格式同上
  "url": "string"
}
</pre>

* 刪除：[delete] /lens/{id}
* 排序：[patch]  /lens/sort/{id1}/{id2}
  把id1 和 id2 的 no 屬性 (排序順序) 對調
* 命名：[patch]  /lens/{id}/name
<pre>
  requestBody = {  "name": "string" }
</pre>
* 更新：[patch]  /lens/{id}
<pre>
requestBody = {  看你想更新甚麼屬性就放進來吧  }
</pre>


### Admin(管理者模型) :
* 新增：[post] /admin/register
<pre>
requestBody = {
  "account": "string",    // unique & id field
  "password": "string",   // len(password) >= 8
  "creatat": "string",
  "name": "string"
}
</pre>
* 登入：[post] /admin/login
會回傳jwt token，在其他的API中，需在header中加入{"Authorization: "Bearer {token}" } 可成功認證
token 會在expire time 之後失效
<pre>
requestBody = {
  "account": "string",
  "password": "string"
}
</pre>
* 登出：[post] /admin/logout
目前還沒有特別的動作或黑名單，這是個空的函式

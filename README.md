# คู่มือการติดตั้งเพื่อใช้งาน

1. Clone หรือ Download Source code

2. Run command `npm i` บน Terminal เพื่อ install package ที่เกี่ยวข้อง (จำเป็นต้อง install node js ก่อน)

3. สร้าง file **salt.ts** ใน path **src** เพื่อใช้ในการเพื่ม salt ในการ hash รหัส โดยรูปแบบของ file มี Template ดังนี้:
	```
	export const salt = {
      value: 'YOUR_SECRET_VALUE',
	};
	```
	โดยที่ค่า value ที่อยู่ใน salt object เป็นค่าที่กำหนดขึ้นเอง และต้องเป็นความลับ
4. Run command `npm start` เพื่อ run React app ใน Development mode
เปิด [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์บน Browser

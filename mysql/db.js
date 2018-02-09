var mysql=require('mysql');
var conn=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'login'
});
conn.connect((err)=>{
	if(err){
		throw err;
	}else{
//		let sql = `SELECT * FROM login`;
		console.log('连接成功')
//		console.log(sql)
	}
})
module.exports=conn;
var express = require('express');
var router = express.Router();

var conn=require('../mysql/db');
/* GET home page. */
router.get('/',(req,res)=>{
//	console.log(req.body);
	let sql = `SELECT * FROM uname`;
	conn.query(sql,(err,resu)=>{
		if (err) {
			return res.send({
				success:false,
				data:err.message
			})
		}
		
		let r=JSON.parse(JSON.stringify(resu));
//		console.log(r);
		res.send({
			data:r
		})
	})
})
router.post('/lo',(req,res)=>{
	console.log(req.body);
	let sql=`SELECT * FROM uname`;

	conn.query(sql,(err,resu)=>{
		if (err) {
			return res.json({
				success:false,
				data:err.message
			})
		}
		
		let r=JSON.parse(JSON.stringify(resu));
		console.log(r);
		for(var user of r){
			
			if(user.u_name==req.body.username){
				if(user.u_password==req.body.password){
					return res.json({
						data:1
					})
				}else{
					return res.json({
						data:0
					})
				}
				
			}	
		}
		return res.json({
			data:1000
		})
	})
})
router.post('/reg',(req,res)=>{
	console.log(req.body);
	let sql="INSERT INTO uname(`u_name`,`u_password`) VALUE (?,?)";
	let dl=[req.body.username,req.body.password];
	conn.query(sql,dl,(err,result)=>{
		if (err) {
			return res.json({
				success:false,
				data:err.message
			})
		}
		if(result.affectedRows>0){
			return res.json({
				data:1
			})
		}else{
			res.json({success:false,data:'插入失败'})
		}
	})		
});
router.post('/change',(req,res)=>{
	console.log(req.body);
	let sql="update uname set u_password=? where u_name=?";
	let dl=[req.body.password,req.body.username];
	conn.query(sql,dl,(err,result)=>{
		if (err) {
			return res.json({
				success:false,
				data:err.message
			})
		}
		if(result.affectedRows>0){
			return res.json({
				data:1
			})
		}else{
			res.json({success:false,data:'修改失败'})
		}
	})		
});
module.exports = router;
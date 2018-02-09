var express = require('express');
var router = express.Router();

var conn=require('../mysql/db');
/* GET home page. */
router.get('/',(req,res)=>{
//	console.log(req.body);
	let sql = `SELECT * FROM sj_list_name`;
	conn.query(sql,(err,resu)=>{
		if (err) {
			return res.send({
				success:false,
				data:err.message
			})
		}
		
		let r=JSON.parse(JSON.stringify(resu));
//		console.log(r);
		res.json({
			result:r
		})
	})
})

module.exports = router;

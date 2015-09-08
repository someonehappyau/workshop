'use stric';

var express=require('express');
var router=express.Router();
var saveImageFromUrl=require('../util/saveImageFromUrl');
var ctrlMCPic=require('../mc/controller/ctrlMCPic');
var ctrlMCModel=require('../mc/controller/ctrlMCModel');
var async=require('async');
var multer=require('multer');
var path=require('path');

var storage=multer.diskStorage({
	destination:function(req,file,cb){
					cb(null,path.join(__dirname,'../../../myq'));
				},
	filename:function(req,file,cb){
				 cb(null,saveImageFromUrl.getFileName()+path.extname(file.originalname));
			 }
});

//var upload=multer({dest:path.join(__dirname,'../mc/pics')}).single('file');
var upload=multer({storage:storage}).array('file');

router.get('/mcpic/:imgName',function(req,res){
	ctrlMCPic.getPic(req.params.imgName,res);
});

router.post('/mcpic/:id',function(req,res){
	if (req.params.id==='savePics'){
		var mcid,urls;
		var countSuc=0,countFail=0;
		if (!!req.body.mcid)
			mcid=req.body.mcid;
		else
			mcid='';
		if (!!req.body.urls)
			urls=req.body.urls;
		else
			urls=[];

		if (mcid!==''){
			async.series([
				function(callback){
					async.each(urls,function(url,cb){
						var bFail=false;
						var fileName;
						var picid;
						async.series([
							function(cb1){
								saveImageFromUrl.save(url,'../mc/pics/',function(err,fn){
									if (err){
										bFail=true;
									}
									else
										fileName=fn;
									cb1();
								});
							},
							function(cb2){
								if (bFail===false){
									ctrlMCPic.addOne(fileName,function(err,data){
										if (!err && !!data.insertId){
											picid=data.insertId;
										}
										else
											bFail=true;
										cb2();
									});
								}
								else
									cb2();
							},
							function(cb3){
								if (bFail===false){
									if (!!picid){
										ctrlMCModel.addGalleryLink(mcid,picid,function(err,data){
											if (!err && !!data.insertId){
												console.log('suc ++');
												countSuc++;
											}
											else
												countFail++;
											cb3();
										});
									}
									else{
										countFail++;
										cb3();
									}
								}
								else{
									countFail++;
									cb3();
								}
							},
							function(cb4){
								cb();
								cb4();
							}]);
						},
						function(err){
							if (err)
								countFail++;
							callback();
						});
				},
				function(callback){
					console.log(countSuc);
					res.status(200).end(JSON.stringify({success:countSuc,fail:countFail}));
					callback();
				}]);
		}
		else{
			res.status(500).end('Invalid MCID!');
		}
	}
	else if (req.params.id==='deletePics'){
		ctrlMCPic.deletePics(req.body.pics,function(err,data){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.status(200).end(JSON.stringify(data));
		});	
	}
	else if (req.params.id==='uploadPics'){
		upload(req,res,function(err){
			if (err){
				console.log(err);
			}

			var bFail=false;
			var picid;
			var myerr;
			var mcid;

			if (!!req.body.mcid)
				mcid=req.body.mcid;
			else
				mcid='';
			
			if (mcid!==''){
				async.series([
					function(cb1){
						ctrlMCPic.addOne(req.files[0].filename,function(err,data){
							if (!err && !!data.insertId){
								picid=data.insertId;
							}
							else{
								myerr=err;
								bFail=true;
							}
							cb1();
						});
					},
					function(cb2){
						if (bFail===false){
							if (!!picid){
								ctrlMCModel.addGalleryLink(mcid,picid,function(err,data){
									if (!err && !!data.insertId){
										console.log('suc ++');
									}
									else{
										myerr=err;
										bFail=true;
									}
									cb2();
								});
							}
							else{
								myerr=new Error('Add image failed.');
								bFail=true;
								cb2();
							}
						}
						else{
							cb2();
						}
					},
					function(cb3){
						cb3();
					}]);

				if (bFail===true){
					res.status(500).end(JSON.stringify(myerr));
				}
				else
					res.status(200).end();
			}
			else{
				res.status(500).end('No mcid.');
			}
		});
	}
	else if (req.params.id==='updatePositions'){
		ctrlMCPic.updatePositions(req.body.positions,function(err,data){
			if (err) res.status(500).end(JSON.stringify(err));
			else res.status(200).end(JSON.stringify(data));
		});
	}
	else{
		res.status(404).end();
	}
});

module.exports=router;

const handleRegister =(req, res, db, bcrypt)=>{
	const email= req.body.email;
	const password = req.body.password;
	const name = req.body.name;
	const hash = bcrypt.hashSync(password);
	if(!email || !password || !name){
		return res.status(400).json('Incorrect fields');
	}
	db.transaction(trx=>{
		trx.insert({
		hash: hash,
		email: email	
		})	
		.into('login')
		.returning('email')
		.then(loginEmail=>{
		return trx('users')
		.returning('*')
		.insert({
			email:loginEmail[0].email,
			name: name,
			joined: new Date()
		})
		.then(user=>{
			res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=> res.status(400).json('Unnable to join'));
	
}

module.exports={
	handleRegister : handleRegister
}
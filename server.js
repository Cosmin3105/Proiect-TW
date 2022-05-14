const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();

const initializePassport = require('./passport-cofig');
initializePassport(
	passport, 
	name =>  users.find(user => user.name === name),
	id => users.find(user => user.id === id)
);

const port = 3000;

const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
	secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', /*checkAuthenticated,*/ (req, res) => {
	res.render('index.ejs');
});

app.get('/login', checkNotAutenticated, (req, res) => {
	res.render('login.ejs');
});

app.post('/login', checkNotAutenticated, passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

app.get('/register', checkNotAutenticated, (req, res) => {
	res.render('register.ejs');
});

app.post('/register', checkNotAutenticated, async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		});
		res.redirect('/login');
	} catch {
		res.redirect('/register');
	}
	// console.log(users);
});

app.delete('/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
})

// function checkAuthenticated(req, res, next) {
// 	if (req. isAuthenticated()) {
// 		return next();
// 	}
// 	res.redirect('/login');
// }

function checkNotAutenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	next();
}

app.listen(port);
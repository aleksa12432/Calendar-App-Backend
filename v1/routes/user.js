const express = require("express");
const router = express.Router();
const db = require("../../db");
const bcrypt = require("bcrypt");
const User = db.models.User;

const saltRounds = 10;

module.exports = router;

router.put("/", (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res.json({
			success: false,
			message: "Invalid request!",
		});
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findAll({
		where: {
			email: email,
		},
	})
		.then((users) => {
			if (users.length === 0) {
				const hashedPassword = bcrypt.hashSync(password, saltRounds);

				User.create({ email: email, password: hashedPassword });
				return res.json({
					success: true,
					message: "Successful user account creation",
				});
			} else {
				return res.json({
					success: false,
					message: "An user with that email already exists!",
				});
			}
		})
		.catch((err) => {
			console.log(err);
			return res.json({
				success: false,
				message: "Error! " + err,
			});
		});
});

router.post("/", (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res.json({
			success: false,
			message: "Invalid request!",
		});
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findAll({
		where: {
			email: email,
		},
	})
		.then((users) => {
			if (users.length === 0) {
				return res.json({
					success: false,
					message: "No users with that email exist!",
				});
			} else {
				const user = users[0];

				const realPassword = user.get("password");

				console.log(realPassword);

				if (!bcrypt.compareSync(password, realPassword)) {
					return res.json({
						success: false,
						message: "Incorrect password!",
					});
				}

				return res.json({
					success: true,
					message: "Successful login!",
				});
			}
		})
		.catch((err) => {
			console.log(err);
			return res.json({
				success: false,
				message: "Error! " + err,
			});
		});
});

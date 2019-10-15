var friendList = require("../data/friends");


module.exports = function (app)
{

	app.get("/api/friends", function (req, res)
	{
		res.json(friendList);
	});

	app.post("/api/friends", function (req, res)
	{
		friendList.push(req.body);
		var soulmate;
		var initialValue = new Uint8Array(10);
		var differences = [];

		function compatibility()
		{

			function Comaparison(user, friend, photo, difference)
			{
				this.user = user;
				this.friend = friend;
				this.photo = photo;
				this.difference = difference;
			};

			for (i in friendList)
			{
				var you = parseInt(friendList.length) - 1;
				var friend1 = friendList[you];
				var friend2 = friendList[i];
				var totalDifference = 0;

				for (j in initialValue)
				{
					var dif = Math.abs(friend1.scores[j] - friend2.scores[j]);
					totalDifference += dif;
				}

				if (friend1.name !== friend2.name)
				{
					var comp = new Comaparison(friend1.name, friend2.name, friend2.photo, totalDifference);
					differences.push(comp);
				}
			};

			differences.sort(function (a, b)
			{
				var keyA = a.difference,
					keyB = b.difference;
				if (keyA < keyB) return -1;
				if (keyA > keyB) return 1;
				return 0;
			});

			soulmate = differences[0];
			return soulmate;
		};
		compatibility();
		var lifelongCompanion = soulmate;
		console.log(lifelongCompanion)
		res.json(lifelongCompanion);
	});

};
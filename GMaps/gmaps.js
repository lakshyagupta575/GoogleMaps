function pump(){
	$('#result').html('');
	$('#distance').html('');
	$('#restaurant').html('');
	$('#rest').html('');
	if ($('select[name="mode"').val() == 'Car') {
		$('#petrol').append('<p></p>');
		$('#petrol p').append("<span class = ''>Do you want to travel on a route comprised of Petrol Pumps?  </span>");
		$('#petrol p').append("<label><input class='ml-2' type='radio' name='pumps' value='yes'> Yes </label>");
		$('#petrol p').append("<label><input class='ml-2' type='radio' name='pumps', value='no'> No</label>");
	}
	else {
		$('#petrol').html('');
	}
}

function clears(){
	$('#result').html('');
	$('#distance').html('');
	$('#restaurant').html('');
	$('#rest').html('');
}

$('#find').click(function(){
	$('#result').html('');
	$('#distance').html('');
	$('#restaurant').html('');
	$('#rest').html('');
	var from = $('select[name="from"').val().toUpperCase();
	var to = $('select[name="to"').val().toUpperCase();
	if ($('select[name="mode"').val() == 'Car') {
		if ($("input[name='pumps']:checked").val() === 'yes') {
			find(petrol, from, to);
		}
		else {
			find(car, from, to);
		}
	}
	else {
		find(train, from, to);
	}

	$('input:radio[name="restro"]').change(function(){
		console.log('changed');
		if ($("input[name='restro']:checked").val() == 'yes') {
			rest = getKeyByValue(keys, to);
			console.log(restaurants[rest]);
			$('#rest').append('<p></p>');
			$('#rest p').append('<strong>Restaurants: &nbsp;</strong>' + keys[restaurants[rest][0]] + ', &nbsp;');
			$('#rest p').append(keys[restaurants[rest][1]] + '.');
		}
		else {
			$('#rest').html('');
		}
	});
});

function solve(graph, city){
	s = getKeyByValue(keys, city);
	var solutions = {};
	solutions[s] = [];
	solutions[s].dist = 0;
	//console.log(solutions)

	while (true) {
		var parent = null;
		var nearest = null;
		var dist = Infinity;

		//for each existing solution
		for (var n in solutions) {
			//console.log(n,solutions[n],"main")
			if (!solutions[n]) continue;
			var ndist = solutions[n].dist;
			var adj = graph[n];
			//console.log(adj);
			//for each of its adjacent nodes...
			for (var a in adj) {
				//without a solution already...
				//console.log(a,solutions[a]," solution");
				if (solutions[a]) continue;
				//choose nearest node with lowest *total* cost
				var d = adj[a] + ndist;
				if (d < dist) {
					//reference parent
					parent = solutions[n];
					//console.log(parent,"parent");
					nearest = a;
					dist = d;
				}
			}
		}

		//no more solutions
		if (dist === Infinity) {
			break;
		}

		//extend parent's solution path
		solutions[nearest] = parent.concat(nearest);
		//extend parent's cost
		solutions[nearest].dist = dist;
		//console.log(parent,solutions[nearest]);
	}

	return solutions;
}

function getKeyByValue(object, value){
	return Object.keys(object).find((key) => object[key] === value);
}

var keys = {
	a   : 'DELHI',
	b   : 'JAIPUR',
	c   : 'PUNJAB',
	d   : 'AGRA',
	e   : 'INDORE',
	f   : 'KANPUR',
	g   : 'UTTARAKHAND',
	x   : 'CHANDIGARH',
	y   : 'BIKANER',
	z   : 'UDAIPUR',
	h   : 'Hindustan Petroleum',
	i   : 'Indian Oil',
	j   : 'Bharat Petroleum',
	k   : 'Reliance Petroleum',
	hh  : 'Hindustan Petroleum',
	ii  : 'Indian Oil',
	jj  : 'Bharat Petroleum',
	kk  : 'Reliance Petroleum',
	s1  : 'Jun 1',
	s2  : 'Jun 2',
	s3  : 'Jun 3',
	s4  : 'Jun 4',
	s5  : 'Jun 5',
	s6  : 'Jun 6',
	s7  : 'Jun 7',
	s8  : 'Jun 8',
	s9  : 'Jun 9',
	s10 : 'Jun 10',
	s11 : 'Jun 11',
	s12 : 'Jun 12',
	s13 : 'Jun 13',
	s14 : 'Jun 14',
	s15 : 'Jun 15',
	s16 : 'Jun 16',
	h1  : 'Crowne Plaza',
	h2  : 'Taj Palace',
	h3  : 'The Verandah',
	h4  : 'The Royal Root',
	h5  : 'Park Plaza',
	h6  : 'Hotel Stella',
	h7  : 'Taj Terrace',
	h8  : 'Trident Agra',
	h9  : 'Kebabsville',
	h10 : 'The Square - Sayaji Hotel',
	h11 : "Little Chef's Restaurant",
	h12 : 'Antarang',
	h13 : 'Moti Mahal',
	h14 : 'Orchard',
	h15 : 'Pal Dhaba',
	h16 : 'Saffron',
	h17 : 'Gallops Restaurant',
	h18 : 'Crown Restaurant',
	h19 : 'Fresh Food Cafe',
	h20 : 'Savage Garden'
};

var restaurants = {
	a : [
		'h1',
		'h2'
	],
	b : [
		'h3',
		'h4'
	],
	c : [
		'h5',
		'h6'
	],
	d : [
		'h7',
		'h8'
	],
	e : [
		'h9',
		'h10'
	],
	f : [
		'h11',
		'h12'
	],
	g : [
		'h13',
		'h14'
	],
	x : [
		'h15',
		'h16'
	],
	y : [
		'h17',
		'h18'
	],
	z : [
		'h19',
		'h20'
	]
};

var car = {
	a : { b: 50, c: 80, d: 20, g: 70 },
	b : { a: 50, c: 100, d: 90, e: 40, y: 70, z: 70 },
	c : { a: 80, b: 100, g: 110, x: 50, y: 70 },
	d : { a: 20, b: 90, e: 200, f: 100, g: 85 },
	e : { b: 40, d: 200, f: 300, z: 60 },
	f : { d: 100, e: 300, g: 250 },
	g : { a: 70, c: 110, d: 85, f: 250, x: 40 },
	x : { c: 50, g: 40 },
	y : { b: 70, c: 70, z: 40 },
	z : { b: 70, e: 60, y: 40 }
};

var petrol = {
	a  : { b: 50, c: 80, d: 40, g: 70, h: 30, jj: 10 },
	b  : { a: 50, c: 100, d: 90, e: 50, y: 70, z: 70, i: 60, jj: 35, k: 40 },
	c  : { a: 80, b: 100, g: 110, x: 50, y: 70, h: 40, i: 30, j: 30 },
	d  : { a: 40, b: 90, e: 200, f: 100, g: 85, ii: 40, jj: 25, kk: 20 },
	e  : { b: 50, d: 200, f: 300, z: 60, hh: 15 },
	f  : { d: 100, e: 300, g: 250, ii: 50 },
	g  : { a: 70, c: 110, d: 85, f: 250, x: 40, h: 35, j: 35, kk: 50 },
	x  : { c: 50, g: 40, j: 10 },
	y  : { b: 70, c: 70, z: 40, i: 30, k: 20 },
	z  : { b: 70, e: 60, y: 40, hh: 30, k: 10 },
	h  : { a: 30, c: 40, g: 35 },
	i  : { b: 60, c: 30, y: 30 },
	j  : { x: 10, c: 30, g: 35 },
	k  : { b: 40, y: 20, z: 10 },
	hh : { b: 30, e: 15, z: 30 },
	ii : { d: 40, f: 50 },
	jj : { a: 10, b: 35, d: 25 },
	kk : { g: 50, d: 20 }
};

var train = {
	a   : { s2: 40, s3: 30, s4: 15, s6: 30, s8: 35 },
	b   : { s2: 80, s6: 20, s7: 30, s15: 30 },
	c   : { s1: 60, s2: 40, s3: 50, s12: 40, s13: 30 },
	d   : { s4: 50, s5: 50, s8: 50, s9: 15, s11: 60 },
	e   : { s7: 40, s10: 30, s16: 30 },
	f   : { s9: 35, s11: 50 },
	g   : { s1: 40, s4: 35, s5: 25, s14: 15 },
	x   : { s1: 15, s13: 20, s14: 35 },
	y   : { s2: 50, s12: 30, s15: 25 },
	z   : { s15: 40, s16: 40 },
	s1  : { a: 60, g: 40, x: 15, s3: 20 },
	s2  : { a: 40, c: 40, b: 80, y: 50, s3: 45 },
	s3  : { a: 30, c: 50, s1: 20, s2: 45 },
	s4  : { a: 15, d: 50, g: 35 },
	s5  : { d: 50, g: 25 },
	s6  : { a: 30, b: 20 },
	s7  : { b: 30, e: 40, s16: 40, s8: 70 },
	s8  : { a: 35, d: 50, s7: 70, s10: 50 },
	s9  : { d: 15, f: 35 },
	s10 : { e: 30, s8: 50, s11: 50 },
	s11 : { d: 60, f: 50, s10: 50 },
	s12 : { c: 40, y: 30 },
	s13 : { c: 30, x: 20 },
	s14 : { x: 35, g: 15 },
	s15 : { b: 30, y: 25, z: 40 },
	s16 : { e: 30, z: 40, s7: 50 }
};

function find(mode, from, to){
	var solutions = solve(mode, from);
	var dist = solutions[getKeyByValue(keys, to)];
	console.log(dist.length);
	var route = [];
	route.push(from);
	for (let i = 0; i < dist.length; i++) {
		route.push(keys[dist[i]]);
	}
	console.log(solutions);
	console.log(route);

	$('#result').append('<p></p>');
	for (let i = 0; i < route.length - 1; i++) {
		$('#result p').append(route[i] + "<span class = 'mx-2'> >>> </span>");
	}
	$('#result p').append(route[route.length - 1]);

	$('#distance').append('<p></p>');
	$('#distance p').append('<strong>Distance: &nbsp;</strong>' + dist.dist + ' km');

	$('#restaurant').append('<p></p>');
	$('#restaurant p').append("<span class = ''>Do you want to check out famous Restaurants of this city?  </span>");
	$('#restaurant p').append("<label><input class='ml-2' type='radio' name='restro' value='yes'> Yes </label>");
	$('#restaurant p').append("<label><input class='ml-2' type='radio' name='restro' value='no'> No</label>");
}

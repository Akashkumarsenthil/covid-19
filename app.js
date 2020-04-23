window.onload = function() {
	getCovidStats();
}

function getCovidStats() {
	fetch('https://api.covid19india.org/state_district_wise.json')
	.then(function(resp) { return resp.json() })
	.then(function(obj) {
		var sc = 0
		var dst = 0
		for(const state in obj) {
			sc += 1;
			document.getElementById('card').innerHTML += 
			`
					<div class="container">
						<div id = "accordian">
							<div class="card">
								<div class="card-header">
									<h3>
										<a href="#state${sc}" data-parent="#accordion" data-toggle="collapse">
											${state}
										</a>
									</h3>
								</div>
							</div>
						</div>
					</div>
			`
			for (const item in obj[state]) {
				if(item == 'districtData') {
					for (const dist in obj[state][item]) {
						document.getElementById('card').innerHTML += 
						`	
								<div id = "#state${sc}" class="card-header">
									<h5>
										<a class="text-info" href="#district${dst}" data-parent="#accordion" data-toggle="collapse">
											${dist}
										</a>
									</h5>
								</div>
						`
						document.getElementById('card').innerHTML += 
						`	
									<div id="district${dst}" class="collapse">
										<div class="card card-body">
											<p class="display-5">
												Total Cases: ${obj[state][item][dist].confirmed}<br>
												Active: ${obj[state][item][dist].active}<br> 
												Died: ${obj[state][item][dist].deceased}<br>
											</p>
										</div>
									</div>
									
						`
						dst += 1
					}
				}
			}
		}
	})
	.catch(function() {
		console.log("error");
	})
	setTimeout(getCovidStats, 43200000) // update every 12 hours
}
		

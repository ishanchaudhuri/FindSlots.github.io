		function fetch() {
			$.get("https://cdn-api.co-vin.in/api/v2/admin/location/states",
				function(data)
				{
					//console.log(data['states']);

					

					for(i=0;i<8;i++)
					{
						var date=new Date();
						var last=new Date(date.getTime()+(i*24*60*60*1000));
						var day=last.getDate();
						var mon=last.getMonth()+1;
						if(mon<10)
							mon="0"+mon;
						var year=last.getFullYear();
						var tot=day+"/"+mon+"/"+year;
						//console.log(tot);
						var options = "<option value='"+tot+"'>"+tot+"</option>";
						//var out=data['states'][i]['Country']
						//console.log()
						$(".date").append(options);
					}


					//var states = JSON.parse(response.trim());
					for(i=0;i<data['states'].length;i++)
					{
						var options = "<option value='"+data['states'][i]['state_id']+"'>"+data['states'][i]['state_name']+"</option>";
						//var out=data['states'][i]['Country']
						//console.log()
						$(".state").append(options);
					}

					$(".state").on("change",function(){
						$(".city").html('');
						var state_id=$(".state").val();
						$.get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+state_id,
							function(data){
								for(i=0;i<data['districts'].length;i++)
								{
									var options = "<option value='"+data['districts'][i]['district_id']+"'>"+data['districts'][i]['district_name']+"</option>";
									$(".city").append(options);
								}
								$(".submit-btn").removeClass("d-none");

								$(".submit-btn").click(function(){
									var dat=$(".date").val();
									//alert(dat);
									if(dat=="")
									{
										alert("Please Choose Date");
									}
									
									else
									{
										var d_id=$(".city").val();
										if(d_id=="")
										{
											alert("Please Choose District");
										}
										else
										{
											
											$.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+d_id+"&date="+dat,
												function(data){
													$(".result-table").html("");

													var table=document.createElement("TABLE");
													//$(table).attr("class","table table-dark table-striped result-table");
													table.className = "table table-dark table-striped result-table";

													var cg=document.createElement("COLGROUP");
													var c1=document.createElement("COL");
													$(c1).attr("width","250");
													var c2=document.createElement("COL");
													$(c2).attr("width","150");
													var c3=document.createElement("COL");
													$(c3).attr("width","500");
													var c4=document.createElement("COL");
													$(c4).attr("width","100");
													var c5=document.createElement("COL");
													$(c5).attr("width","100");
													var c6=document.createElement("COL");
													$(c6).attr("width","100");
													var c7=document.createElement("COL");
													$(c7).attr("width","100");
													var c8=document.createElement("COL");
													$(c8).attr("width","100");
													$(cg).append(c1);
													$(cg).append(c2);
													$(cg).append(c3);
													$(cg).append(c4);
													$(cg).append(c5);
													$(cg).append(c6);
													$(cg).append(c7);
													$(cg).append(c8);

													$(table).append(cg);


													var table_row1 = document.createElement("tr");
													var table_h1 = document.createElement("th");
													var table_h2 = document.createElement("th");
													var table_h3 = document.createElement("th");
													var table_h4 = document.createElement("th");
													var table_h5 = document.createElement("th");
													var table_h6 = document.createElement("th");
													var table_h7 = document.createElement("th");
													var table_h8 = document.createElement("th");
														
													table_h1.innerHTML = "<h6>CENTER NAME</h6>";
													table_h2.innerHTML = "<h6>DATE</h6>";
													table_h3.innerHTML = "<h6>ADDRESS</h6>";
													table_h4.innerHTML = "<h6>VACCINE</h6>";
													table_h5.innerHTML = "<h6>AGE</h6>";
													table_h6.innerHTML = "<h6>DOSE1</h6>";
													table_h7.innerHTML = "<h6>DOSE2</h6>";
													table_h8.innerHTML = "<h6>FEES</h6>";

													$(table_row1).append(table_h1);
													$(table_row1).append(table_h2);
													$(table_row1).append(table_h3);
													$(table_row1).append(table_h4);
													$(table_row1).append(table_h5);
													$(table_row1).append(table_h6);
													$(table_row1).append(table_h7);
													$(table_row1).append(table_h8);
													//$(table_row1).attr("class","bg-dark");
													table_row1.style.backgroundColor = "black";
													$(table).append(table_row1);


													for(i=0;i<data['sessions'].length;i++)
													{


														console.log(data['sessions'][i]['center_id']);
														console.log(data['sessions'][i]['name']);
														var address=data['sessions'][i]['address']+","+data['sessions'][i]['block_name']+","+data['sessions'][i]['pincode'];
														var c_name=data['sessions'][i]['name'];
														var v_name=data['sessions'][i]['vaccine'];
														var age=data['sessions'][i]['min_age_limit']+"+";
														var d1=data['sessions'][i]['available_capacity_dose1'];
														var d2=data['sessions'][i]['available_capacity_dose2'];
														var fees=data['sessions'][i]['fee'];

														var table_row = document.createElement("tr");
														var table_data1 = document.createElement("td");
														var table_data2 = document.createElement("td");
														var table_data3 = document.createElement("td");
														var table_data4 = document.createElement("td");
														var table_data5 = document.createElement("td");
														var table_data6 = document.createElement("td");
														var table_data7 = document.createElement("td");
														var table_data8 = document.createElement("td");
														
														table_data1.innerHTML = "<h6>"+c_name+"</h6>";
														table_data2.innerHTML = "<h6>"+dat+"</h6>";
														table_data3.innerHTML = "<h6>"+address+"</h6>";
														table_data4.innerHTML = "<h6>"+v_name+"</h6>";
														table_data5.innerHTML = "<h6>"+age+"</h6>";
														table_data6.innerHTML = "<h6>"+d1+"</h6>";
														table_data7.innerHTML = "<h6>"+d2+"</h6>";
														table_data8.innerHTML = "<h6>"+fees+"</h6>";



														$(table_row).append(table_data1);
														$(table_row).append(table_data2);
														$(table_row).append(table_data3);
														$(table_row).append(table_data4);
														$(table_row).append(table_data5);
														$(table_row).append(table_data6);
														$(table_row).append(table_data7);
														$(table_row).append(table_data8);
														//$(".result").removeClass("d-none");
														$(table).append(table_row);
														
													}
													$(".result").append(table);

												}
											)//end of get
										}

										
									}
								})

								

							}
						)//end of get
					})
					
				}

			);
		}

dataset=datastr.split(";");
arrDataOver=[];
is_avg=false;


function whyMoney(sYear,sMonth){
	time=new Date(sYear+"/"+sMonth+"/1");
	nextMonthTime=dayNextMonth(sYear,sMonth);

	this.year=sYear;
	this.month=sMonth;
	this.dateFrom=time.getTime();
	this.dateTo=nextMonthTime.getTime();


	this.eat=0;
	this.wear=0;
	this.live=0;
	this.move=0;
	this.edu=0;
	this.happy=0;
	this.music=0;
	this.total=function(){
		iTotal=this.eat+this.wear+this.live+this.move+this.edu+this.happy+this.music;
		return iTotal;
	};
	this.getPeriod=function(){
		return this.year+"-"+this.month;
	};
	this.days=function(){
		switch(this.month){
			case "1":
			case "3":
			case "5":
			case "7":
			case "8":
			case "10":
			case "12":
				return 31;
			break;

			case "4":
			case "6":
			case "9":
			case "11":
				return 30;
			break;

			case "2":
				if(this.year=="2012")return 29
				else return 28
			break;
		}
	}


};


//用whyMoney的元件去創一個表格丟進去
function showWhyMoney(whyMon){
	if(is_avg)days=whyMon.days()
		else days=1;

	$wmDiv=$('<div>').attr('id','div'+whyMon.getPeriod()).css('float','left');
	$wmTab=$('<table>').attr('id','d'+whyMon.getPeriod());
	$wmDiv.append($wmTab);
	$('#month_total').append($wmDiv);
	$td1=$("<td></td>").html("期間:");
	$td2=$("<td></td>").html(whyMon.getPeriod());
	$tr=$("<tr></tr>").append($td1).append($td2);
	$wmTab.append($tr);
	$td1=$("<td></td>").html("食:");
	$td2=$("<td></td>").html(" "+Math.floor(whyMon.eat/days));
	$tr=$("<tr></tr>").append($td1).append($td2);
	$wmTab.append($tr);
	$td1=$("<td></td>").html("衣:");
	$td2=$("<td></td>").html(" "+Math.floor(whyMon.wear/days));
	$tr=$("<tr></tr>").append($td1).append($td2);
	$wmTab.append($tr);
	$td1=$("<td></td>").html("住:");
	$td2=$("<td></td>").html(" "+Math.floor(whyMon.live/days));
	$tr=$("<tr></tr>").append($td1).append($td2);
	$wmTab.append($tr);
	$td1=$("<td></td>").html("行:");
	$td2=$("<td></td>").html(" "+Math.floor(whyMon.move/days));
	$tr=$("<tr></tr>").append($td1).append($td2);
	$wmTab.append($tr);
	$td1=$("<td></td>").html("育:");
	$td2=$("<td></td>").html(" "+Math.floor(whyMon.edu/days));
	$tr=$("<tr></tr>").append($td1).append($td2);
	$wmTab.append($tr);
	$td1=$("<td></td>").html("樂:");
	$td2=$("<td></td>").html(" "+Math.floor(whyMon.happy/days));
	$tr=$("<tr></tr>").append($td1).append($td2);
	$wmTab.append($tr);
	$td1=$("<td></td>").html("音樂:");
	$td2=$("<td></td>").html(" "+Math.floor(whyMon.music/days));
	$tr=$("<tr></tr>").append($td1).append($td2);
	$wmTab.append($tr);
	$td1=$("<td></td>").html("總計:");
	$td2=$("<td></td>").html(" "+whyMon.total());
	$tr=$("<tr></tr>").append($td1).append($td2);
	$wmTab.append($tr);
}


//執行主指令
var main=function(){
	$('document').ready(function(){

		//初始
		//初始 要執行的放這裡
		showWhytb();
		//初始結束
		
		//按下按鈕
		$('#time-enter').click(function(){
			if($('#is_avg').val()=="2")is_avg=true
				else is_avg=false;


			//按下按鈕執行的動作放這裡
			month=$('#time-month').val();
			if(month==''){
				showWhytb();
			}else{
				if(month>0||month<12){

					tfrom='2013/'+month+'/1';
					tto='2013/'+(parseInt(month)+1)+'/1';
				}
				showWhytb([
						['month',[tfrom,tto]],
						['TWD']
						  ]);
			}
		});//按下按鈕結束


	});
}

//給定數個判斷,決定是否處理這筆數字
var isShow=function(arrTabRow,arrFils){
	//arrTabRow代入一筆財務數字
	//arrFil代入數組 Filter : [ [filtype,filue] , .... ]
	//return true or false;
	for (var i = 0; i < arrFils.length; i++) {
		if(!judge(arrTabRow,arrFils[i]))return false;
	};
	return true;

};

//給定一個判斷 決定是否處理這筆數字
var judge=function(arrTabRow,arrFil){
	//判斷這筆數字
	switch(arrFil[0]){
		case "month":
			tfrom=(new Date(arrFil[1][0])).getTime();
			tto=(new Date(arrFil[1][1])).getTime();
			tnow=(new Date(arrTabRow[0])).getTime();
			if(tnow>=tfrom&&tnow<tto)return true;
			//console.log(tfrom+' '+tnow+' '+tto);
		break;
		case "TWD":
			if(arrTabRow[4]=='TWD')return true;
		break;
	}

};

//統計表格的動作
var count=function(arrTabRow,arrDataOver){
	myWhyMoney=null;
	for (var i =  0; i <arrDataOver.length ; i++) {

		date=new Date(arrTabRow[0]);
		if(date.getTime()>=arrDataOver[i].dateFrom&&date.getTime()<arrDataOver[i].dateTo){
			myWhyMoney=arrDataOver[i];
			break;
		};
	};
	if(myWhyMoney==null){
		console.log("myWhyMoney is Null");
		month=(date.getMonth()+1).toString();
		year="20"+(date.getYear()).toString().substring(1,3);
		console.log("year:"+year+";month:"+month);
		myWhyMoney=new whyMoney(year,month);
		arrDataOver.push(myWhyMoney);
	}


	//var myWhyMoney=arrDataOver[0];
	if(arrTabRow[8].charAt(0)=="食"){
		myWhyMoney.eat+=parseInt(arrTabRow[3]);
	}
	else if(arrTabRow[8].charAt(0)=="衣"){
		myWhyMoney.wear+=parseInt(arrTabRow[3]);
	}
	else if(arrTabRow[8].charAt(0)=="住"){
		myWhyMoney.live+=parseInt(arrTabRow[3]);
	}
	else if(arrTabRow[8].charAt(0)=="行"){
		myWhyMoney.move+=parseInt(arrTabRow[3]);
	}
	else if(arrTabRow[8].charAt(0)=="育"){
		myWhyMoney.edu+=parseInt(arrTabRow[3]);
	}
	else if(arrTabRow[8].charAt(0)=="樂"){
		myWhyMoney.happy+=parseInt(arrTabRow[3]);
	}
	else if(arrTabRow[8].charAt(0)=="音"){
		myWhyMoney.music+=parseInt(arrTabRow[3]);
	};



};

var dayNextMonth=function(sYear,sMonth){
	if(sMonth=="12"){
		nextMonth="1";
		nextYear=parseInt(sYear)+1;
	}else{
		nextMonth=parseInt(sMonth)+1;
		nextYear=sYear;
	}
	console.log("next month:", nextYear+"/"+nextMonth+"/1")
	return new Date(nextYear+"/"+nextMonth+"/1");
}

//秀表格的函式  
var showWhytb=function(arrFils){
	date=new Date();
	month=(date.getMonth()+1).toString();
	year="20"+(date.getYear()).toString().substring(1,3);
	total_july=new whyMoney(year,month);
	arrDataOver=[total_july];

	//清空的動作
	$table=$('#whytable');
	$table.html('');
	$('#month_total').html('');
	
	total=0;

	for (var i = 0; i < dataset.length; i++) {
		$tr=$('<tr>').attr('id','whytb_'+i);
		
		datarow=dataset[i].split(',');


		//trigger是否的話就不輸出
		trigger=false;
		if(i==0)trigger=true;
		else if(typeof(arrFils)=='undefined')trigger=true;
		else if(isShow(datarow,arrFils))trigger=true;

		for (var j = 0; j < datarow.length; j++) {

			
			switch(j){
				case 0://日期
				case 1://時間
				case 2://帳戶
				case 3://金額
				case 4://幣種
				case 5://沒用到
				case 6://沒用到
				case 7://大分類
				case 8://小分類
				case 9://沒用到
				case 10://位置，會放Transfer Out或Transfer In
				case 11://專案
				case 12://備註
				break;
			}

			if(j!=1&&j!=5&&j!=6&&j!=9&&trigger==true)
			$tr.append('<td>'+datarow[j]+'</td>');
		};
		if(i>=1&&trigger==true){
			total+=parseInt(datarow[3]);
			count(datarow,arrDataOver);

		};

		if($tr.html()!="")$table.append($tr);
	};




	$table2=$('<table></table>');

	for (var i = arrDataOver.length - 1; i >= 0; i--) {
		showWhyMoney(arrDataOver[i]);
	};

	//showWhyMoney(total_july);

	//表格秀完
	
	$allTotal=$('<div>').html('總金額：'+total).css('clear','both');
	$('#table_div').prepend($allTotal);


	$arrTr=$('#whytable tr');
	//修飾
	for (var i = 0; i < $arrTr.length; i++) {
		$tr=$($arrTr[i]);
		if(i%2==0){
			$tr.css('background-color','#99ffee');
		}else{
			$tr.css('background-color','#eeffaa')
		}
	};


}



//用google chart秀表格的函式
var ggtable=function(){
	google.load('visualization', '1', {packages:['table']});
	google.setOnLoadCallback(drawTable);
	function drawTable() {
		var data = new google.visualization.DataTable();
			
		for (var i = 0; i < dataset[0].split(',').length; i++) {
			data.addColumn('string',dataset[0].split(',')[i]);

			};

		//data.addRows([dataset[1].split(',')]);
		
		for (var i = 1; i < dataset.length; i++) {
			data.addRows([dataset[i].split(',')]);
			//console.log('the '+i+'item finish importing.')
		};
		

	var table = new google.visualization.Table(document.getElementById('table_div'));
	table.draw(data, {showRowNumber: true});

	}


}

main();

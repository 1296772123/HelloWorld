
function getValue(n){
	var num1 = 1;
	var num2 = 2;
	for(var i = 3; i <= n ; i ++){
		var temp = num2;
		num2 = num1 +num2;
		num1 = temp;
	}
	return num2;
}
getValue(3);

function getDays(year,month,day) {
	var arr = [31,28,31,30];
	for(var i = 0 ; i < month-1; i ++){
		day += arr[i];
	}
	if(month>2 && isRN(year)){
		day += 1;
	}
	return day;
}
function isRN(year){
	if(year%4 === 0 && year%100 !==0 || year%400 ===0 ){
		return true;
	}
	return false;
}
getDays(2012,1,1);

(function(){})();

document.onclick = function(){
	console.log(1);
};
// setIntervel(function(){},1000);

function fn(num1,num2,demo){
	return demo(num1,num2);
}
function test1(a,b){
	return a+b;
}
function test2(a,b){
	return a-b;
}
var c = fn(3,2,test1);
console.log(fn(4,3,test2));

//函数创建对象
function createStudent(name){
	var student = new Object();
	student.name = name;
	student.attactPeople = function(){
		console.log("attack");
	}
	return student;
}

const currentInput=document.querySelector('.currentInput');
const previousCalculation=document.querySelector('.previousCalculation');

//Lets you press the number buttons to add a number to the screen
const numbers=document.querySelectorAll(".numberButton"); 
numbers.forEach(number => {
    number.addEventListener('click',() =>{
        if(currentInput.innerHTML==="0" || currentInput.innerHTML==="Error!"){
            currentInput.innerHTML=number.innerHTML;
        }
        else{
            //Allows only upto 12 numbers in the user input 
            if(currentInput.innerHTML.length<=11){
                currentInput.innerHTML=currentInput.innerHTML + number.innerHTML;
            }
        }
    });
});


//Function to perform calculations
let operation=""; //Keeps track of what mathematical operation is currently used
function calculate(operation,num1,num2){
    num1=Number(num1);
    num2=Number(num2);
    switch(operation){
        case "+" : return num1+num2;
        case "-" : return num1-num2;
        case "x" : return num1*num2;
        case "÷" :  if(num2==0){
                        //Divide by 0 error 
                        currentInput.innerHTML="Error!"
                    }   
                    else{   
                        return num1/num2;
                    }                
    }               
}


//Functionality of all operation buttons
const operators=document.querySelectorAll(".operationButton");
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        //Checks if there is an input 
        if(currentInput.innerHTML.length!=0){
            //Checks if no calculation is ongoing and a number has been inputted
            if(previousCalculation.innerHTML.length==0 && currentInput.innerHTML.length!=0){
                previousCalculation.innerHTML=currentInput.innerHTML + " " + operator.innerHTML;
                operation=operator.innerHTML;
                currentInput.innerHTML="";
            }
            //Performs calculation if there is an ongoing calculation
            else{
                let arr=previousCalculation.innerHTML.split(" ");
                //Checks for the presence of a equal to sign

                //If an equal to sign exists
                if(arr.length==2){
                    let num1=arr[0];
                    let op=arr[1];
                    let num2=currentInput.innerHTML;
                    let result=calculate(op,num1,num2);
                    result=result.toString();   
                    previousCalculation.innerHTML=result + " " + operator.innerHTML;
                    currentInput.innerHTML="";
                }
                //If there is no equal to sign  
                else{
                    if(currentInput.innerHTML!="Error!"){ //Checks for error 
                        previousCalculation.innerHTML=currentInput.innerHTML+" "+operator.innerHTML;
                        currentInput.innerHTML="";
                    }
                }
            }
        }
        //Allows the user to change the current operator being used
        else{
            arr=previousCalculation.innerHTML.split(" ");
            if(arr.length==2 && currentInput.innerHTML.length==0){
                previousCalculation.innerHTML=arr[0]+" "+operator.innerHTML;
            }
        }
    });
});



//Equal button functionality
const equal=document.querySelector(".equalButton");
equal.addEventListener('click',()=>{
    //Checks for an ongoing calculation (Text in previousCalculation)
    if(previousCalculation.len!=0){
        let arr=previousCalculation.innerHTML.split(" ");
        if(arr.length==2){
            let num1=arr[0];
            let op=arr[1];
            //Checks if there is a current input 
            if(currentInput.innerHTML.length!=0){
                let num2=currentInput.innerHTML;
                let result=calculate(op,num1,num2);
                previousCalculation.innerHTML=previousCalculation.innerHTML + " " + num2 + " " + "="; 
                currentInput.innerHTML=result.toString();
            }
            //If there is no current input display the number from previousCalculation  
            else{
                currentInput.innerHTML=num1;
                previousCalculation.innerHTML=""
            }
        }
    }
});


//Clear button functionality 
const clear=document.querySelector(".clearButton");
clear.addEventListener('click', () => {
    currentInput.innerHTML=0;
    previousCalculation.innerHTML="";
});


//Delete button functionality
const deleteButton=document.querySelector(".deleteButton");
deleteButton.addEventListener('click', () => {
    let str=currentInput.innerHTML;
    if(str.length!=0){
        str=str.slice(0,-1);
        currentInput.innerHTML=str;
    }
});


//Decimal button functionality
const decimal=document.querySelector(".decimalButton");
decimal.addEventListener('click', () => {
    let numArray=[...currentInput.innerHTML];
    //Checks if a decimal exists in the number
    let decimalExists=numArray.some(num => num===".");  
    if(!decimalExists){
        currentInput.innerHTML=currentInput.innerHTML+".";
    }
});
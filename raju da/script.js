const calender=document.querySelector('.calender');
const count=document.getElementById("count");
const bill=document.getElementById("bill");
const totalIcon=document.querySelectorAll('.row .icon');
const monthSelected=document.getElementById('monthselect');
const save=document.getElementById('save');

let monthIndex;
let CheckIndex=[];
populateUI()

//populateUI
function populateUI()
{
 let checked=JSON.parse(localStorage.getItem(monthIndex));
 
 
 if(checked==null)
 {
    totalIcon.forEach((eachcheck)=>{
        eachcheck.classList.remove('check');

    })
 }

 else{
    let checkedlist=checked["value2"];
    totalIcon.forEach((eachcheck,index)=>{
        if(checkedlist.indexOf(index)>-1 )
        {
            eachcheck.classList.add('check');
        }

    })
 }
 updateSelectedCount();

}


function storeData(monthIndex,CheckIndex)
{
    
     let values = { value1: monthIndex, value2: CheckIndex };
     let jsonString = JSON.stringify(values);
     localStorage.setItem(monthIndex, jsonString);

}

function vanishdays(element)
{
    
    const day31=document.getElementById("31");
    const day30=document.getElementById("30");

    // console.log(element.target.value);
    if(element.target.value==30)
    {
        
        day31.classList.add('vanish');
    }
    else if(element.target.value<30)
    {
        day30.classList.add('vanish');
        day31.classList.add('vanish');
    }

    else 
    {
        day31.classList.remove('vanish');
        day30.classList.remove('vanish');
    }

}


function  updateSelectedCount()
{
    const checkMealsList=document.querySelectorAll('.row .icon.check');

    const checkMealsCount=checkMealsList.length;

     CheckIndex=[...checkMealsList].map(function(selected)
    {
        return [...totalIcon].indexOf(selected)
    });
  
    count.innerText=checkMealsCount;
    bill.innerText="₹"+(checkMealsCount*66);

    // console.log(constCheckIndex);
}


calender.addEventListener('click',(e)=>{
   if(e.target.classList.contains('icon'))
   {
    e.target.classList.toggle('check');
   }

   updateSelectedCount();
//    storeData(monthIndex,NoOfChecks)

})




monthSelected.addEventListener('change',e=>{
    vanishdays(e);
    monthIndex=e.target.selectedIndex;
    totalIcon.forEach((eachcheck)=>{
        eachcheck.classList.remove('check');});
    
    // storeData(monthIndex,NoOfChecks);
    populateUI();
})

save.addEventListener('click',e=>{
   
    storeData(monthIndex,CheckIndex);
})
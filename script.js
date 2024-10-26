const content =document.querySelector('.content');


let page=0;
const pageSize=8;

const prev = document.getElementById("prev");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const next = document.getElementById("next");

const pages = [one , two , three ,four];

async function fetchData() {
    try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        showData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
function showData(data){
    const recepies = data.recipes;
    const newData=recepies.slice(page*pageSize,pageSize*(page+1));

    console.log(recepies)
    pushCards(newData);
    
}



function pushCards(data){
    data.forEach((element) => {
        const card = document.createElement("div");
        const image = document.createElement("img");
        const heading = document.createElement("h2");
        const inst = document.createElement("p");

        image.src =element.image;
        heading.innerText=element.name;
        inst.innerText = element.instructions

        card.classList.add('card');
        card.append(image,heading,inst);

        content.append(card);
    });
}
fetchData();
setActive();

function setActive(){

    if(page===0){
        prev.style.visibility = "hidden";
    }
    else{
        prev.style.visibility='visible';
    }
    if(page===3){
        next.style.visibility='hidden';
    }
    else{
        next.style.visibility='visible';
    }
    pages.forEach((item)=>{
        item.classList.remove('active');
    })
    pages[page].classList.add('active');

}
prev.addEventListener('click',(e)=>{
    console.log("hii")
    if(page>0){
        page--;
     
    }
    content.innerHTML="";
    fetchData();
    setActive();
})
next.addEventListener('click',()=>{
    if(page<pages.length){
        page++;
       
    }
    content.innerHTML='';
    fetchData();
    setActive();
})

function runApp() {
    setActive();
    fetchData();
}

one.addEventListener('click' , ()=>{
    page=0;

    content.innerHTML='';
   setActive();
    fetchData();
})
two.addEventListener('click',()=>{
    page=1;
    setActive();
    content.innerHTML='';
    fetchData();
})
three.addEventListener('click',()=>{
    page=2;
    
    setActive();
    content.innerHTML='';
    fetchData();
})
four.addEventListener('click',()=>{
    page=3;
    setActive();
    content.innerHTML='';
    fetchData();
})
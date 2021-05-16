const imgs = document.getElementById("imgs");

const img = document.querySelectorAll("#imgs img");


let ind=0;

function run (){
    ind++;

    if (ind > img.length){
        ind=0;
    }

    imgs.style.transform=`translateX(${-ind * 500}px)`;

    setTimeout(run,2000);
}

run();
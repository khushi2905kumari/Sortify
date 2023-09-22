const n = 40;
const array=[];

GenerateArray();

function GenerateArray(){
    for(let i=0 ; i<n ; i++){
        array[i] = Math.random();
    }

    ShowBars();
}

// ___________Sorting____________________
function Sort(){
    const copy =[...array];
    const moves = InsertionSort(copy);
    Animate(moves);
}
// ________________________________________

// ___________Animation in swapping____________________
function Animate(moves){
    if(moves.length==0){
        ShowBars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indices;

    if(move.type =="swap"){
        [array[i],array[j]] = [array[j],array[i]];
    }

    ShowBars(move);

    setTimeout(function(){
        Animate(moves);
    }, 100);
}
// ________________________________________

// ___________insrtion Sort____________________
function InsertionSort(array){
    const moves = []; //making a swap array that keeps track of swapping done while soting

    var len = array.length;
  
    var isSwapped = false;
  
    for (let i = 0; i < len; i++) {
  
        isSwapped = false;
  
        for (let j = 0; j < len; j++) {
            moves.push({indices:[i,j], type:"comp"});

            if (array[j] > array[j + 1]) {
                isSwapped = true;
                moves.push({indices:[i,j],type:"swap"}); //pushing bar i and bar j
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
  
        // IF no two elements were swapped by inner loop, then break 
        if (!isSwapped) {
            break;
        }
    }

    return moves;
}

// ________________________________________


// ___________Creating bars & styling it____________________
function ShowBars(move){
    container.innerHTML="";
    for(let i = 0; i < array.length; i++)
    {
        const bar = document.createElement("div"); //bars will be displayed in container class
        bar.style.height = array[i] * 100 + "%"; //bar height will be 100 times the array value
        bar.classList.add("bar"); //styling will be done in bar class

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor = move.type == "swap"?"red":"blue";
        }

        container.appendChild(bar);
    }
}
// ________________________________________
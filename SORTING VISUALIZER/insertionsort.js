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

// ___________Insertion Sort____________________
function InsertionSort(array) {
    const moves = []; // Array to track the swapping and comparisons done during sorting

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            moves.push({ indices: [i, j], type: "comp" });
            array[j + 1] = array[j];
            moves.push({ indices: [j + 1, j], type: "swap" });
            j--;
        }

        array[j + 1] = key;
        
    }

    return moves;
}
// ________________________________________


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
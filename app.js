// ------------------- CLASSES
class Game{
    constructor(gameName){
        this.name = gameName;
        this.nav = [];
    }
    addSubheading(subheading, subcategories=[]){
        const newObj = {};
        newObj.subhead = subheading;
        newObj.subcat = subcategories;
        this.nav.push(newObj);
    }
}

const dragon = new Game("Dragon's Dogma");
dragon.addSubheading('armor',['sequel','shoes','helmet',]);
dragon.addSubheading('weapon', ['sword','dagger'])
// add 1 subcategory to 1 heading
// be able to control order


// --------------- data for testing
// const dragon = {
//     name: "dragon's quest",
//     nav:[   { subhead: 'weapons',
//               subcat: [ 'dagger', 'long sword', 'bare hands', 'axe' ] },
//             { subhead: 'people',
//               subcat: [ 'Kevin', "KV's minion", 'Qiuyun', 'Qiu', 'QQ' ] } 
//         ] 
// }
// --------------------------------


// ------------------ FUNCTIONS
const subcatToHTML = (name,c,h,g) =>{
    return `
    <li>
    <a class='subcateg js-g${g}sh${h}sc${c}' href='#'>${name}</a>
    </li>`
}
const subcatsToHTML = (arr,h,g) =>{
    const lis = arr.reduce( (acc, cat, i)=>{
        return acc + subcatToHTML(cat,i,h,g);
    },'');

    return `
    <div class='subcategBox js-g${g}subh${h} hide'>
        <ul>
            ${lis}
        </ul>
    </div>
    `;
}

const gameToNavHTML = (game, g) =>{
    
    const gameLis = game.nav.reduce( (acc, o, h) =>{
        const innerLis = subcatsToHTML(o.subcat,h,g);
        const outerLis =
        `<li>
            <h3><a class='subhead' js-id='g${g}subh${h}' href='#'>${o.subhead}</a></h3>
            ${innerLis}
        </li>`;
        return acc + outerLis;
    },'');

    return `
    <div class='gameBox'>
        <h2 style='min-width:150px'><a class='gameTitle' js-id='g${g}' href='#'>${game.name}</a></h2>
        <div class='subheadBox js-g${g} hide'>
            <ul>
                ${gameLis}
            </ul>
        </div>
    </div> <!--Game #${g}-->
    `;
}




// ----------------- GLOBAL VARIABLES
const sideNav = document.querySelector('.nav');

// ----------------- STATE
const state = {
    gamesNav: [dragon],
}

const render = (state) =>{

    const navHTML = state.gamesNav.reduce( (acc, game, g) =>{
        return acc + gameToNavHTML(game, g);
    }, '');

    sideNav.innerHTML = navHTML;
}

render(state);

const saveAndRender = () =>{
    render(state);
}

// ----------------- EVENT LISTENERS
sideNav.addEventListener('click', e =>{
    const target = e.target;
    const id = e.target.getAttribute('js-id');
    const box = document.querySelector(`.js-${id}`);

    const toggleAccordion = () =>{
        if (box.classList.value.includes("hide")){
            box.classList.remove('hide');
        } else {
            box.classList.add('hide');
        }
    }

    // ------------- CLICK ON GAME-TITLE
    if (target.matches('.gameTitle')){
        toggleAccordion();
    }

    // ------------- CLICK ON SUB-HEADING
    if (target.matches('.subhead')){
        toggleAccordion();
    }

    // ------------- CLICK ON SUB-CATEGORY
    if (target.matches('.subcateg')){
        //when I click on sub-category, display content to the right;
    }

});

/*
{name: 'Dragon's Fire', subhead: [weapons, armors] }
*/
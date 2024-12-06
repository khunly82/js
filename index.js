(async () => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
    // const response = await fetch(baseUrl);
    // const pokemons = await response.json();

    const loadPokemons = async () => {
        const response = await fetch(baseUrl).then(r => r.json());    
        const promises = response.results.map(({url}) => fetch(url).then(r => r.json()));
        return Promise.all(promises);
    }

    const createList = async () => {
        const details = await loadPokemons();
        const ul = document.createElement('ul');
        ul.classList.add('listPokemon');
        ul.append(...details.map(createLine));
        // for(let p of pokemons.results) {
        //     ul.append(createLine(p));
        // }
        return ul;
    }

    const createLine = (pokemon) => {
        const li = document.createElement('li');
        li.classList.add('pokemon');
        li.textContent = pokemon.name;
        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        li.prepend(img);
        return li;
    }

    document.getElementById('app')
        .append(await createList());
    // createList().then(
    //     items => document.getElementById('app').append(items)
    // );
})()
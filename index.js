const searchContainer = document.querySelector(".search");
const searchInput = document.querySelector("#search__input");
const searchResult = document.querySelector(".searchResult");
const detailsContainer = document.querySelector(".details");
const pokemonContainer = document.querySelector(".pokemon");
const loadContainer = document.querySelector(".load");
const loadBtn = document.querySelector(".load__btn");
const footerContainer = document.querySelector(".footer");

let displayedPokemon = 0;
let pokemonBoost = 12;

function removeErrorMessage() {
    const errorMessage = document.querySelector(".search__error");
    if (errorMessage) {
        errorMessage.remove();
    }
}

async function openPokemonDetails() {

    let pokemonTag = this.getAttribute("data-id");//recover Pokemon name to use as tag for the new URL fetch

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonTag}`;
    let requisition = await fetch(url);
    let pokemon = await requisition.json();

    //Cleaning the page before generate a new Pokemon details
    pokemonContainer.innerHTML = "";
    loadContainer.style.display = "none";
    searchResult.innerHTML = "";

    //Removing a possible previous error message
    removeErrorMessage()

    //Creating a pokemon details
    const pokemonDetailsDiv = document.createElement("div");
    pokemonDetailsDiv.classList.add('details__container');

    detailsContainer.appendChild(pokemonDetailsDiv);

    const pokemonDetailsImg = document.createElement("img");
    pokemonDetailsImg.classList.add("details__img");
    pokemonDetailsImg.src = `https://img.pokemondb.net/artwork/avif/${pokemon.name}.avif`;

    pokemonDetailsDiv.appendChild(pokemonDetailsImg);

    const pokemonDetailsTitle = document.createElement("h2");
    pokemonDetailsTitle.classList.add("details__title");
    pokemonDetailsTitle.textContent = `${pokemon.name.toUpperCase()}`;

    pokemonDetailsDiv.appendChild(pokemonDetailsTitle);

    const pokemonDetailsInfo = document.createElement("div");
    pokemonDetailsInfo.classList.add("details__info");

    pokemonDetailsDiv.appendChild(pokemonDetailsInfo);

    const pokemonDetailsMetrics = document.createElement("p");
    pokemonDetailsMetrics.classList.add("details__info-metrics");
    pokemonDetailsMetrics.innerHTML = `Altura: ${pokemon.height / 10} m | Peso: ${pokemon.weight / 10} kg`;

    pokemonDetailsInfo.appendChild(pokemonDetailsMetrics);

    const pokemonDetailsTypes = document.createElement("h3");
    pokemonDetailsTypes.classList.add("details__info-types");
    pokemonDetailsTypes.textContent = "Tipos";

    pokemonDetailsInfo.appendChild(pokemonDetailsTypes);

    //Loop to fill the Pokemon's types in the details
    const types = pokemon.types;

    let pokemonTypeContainer = document.createElement("div");
    pokemonTypeContainer.classList.add("details__info-type");

    pokemonDetailsInfo.appendChild(pokemonTypeContainer);

    for (position = 0; position < types.length; position++) {
        let type = types[position].type.name;

        const pokemonType = document.createElement("img");
        pokemonType.classList.add("pokemon__type");
        pokemonType.src = `/assets/${type.toLowerCase()}.svg`;

        pokemonTypeContainer.appendChild(pokemonType);
    }

    const pokemonDetailsAbilities = document.createElement("h3");
    pokemonDetailsAbilities.classList.add("details__info-abilities");
    pokemonDetailsAbilities.textContent = "Habilidades";

    pokemonDetailsInfo.appendChild(pokemonDetailsAbilities);

    //Loop to fill the Pokemon's abilities in the details
    const abilities = pokemon.abilities;

    for (incidence = 0; incidence < abilities.length; incidence++) {
        let ability = abilities[incidence].ability.name;

        const pokemonAbility = document.createElement("p");
        pokemonAbility.classList.add("pokemon__ability");
        pokemonAbility.innerHTML = ability.toLowerCase();

        pokemonDetailsInfo.appendChild(pokemonAbility);
    }
}


async function listPokemon() {
    for (i = displayedPokemon + 1; i <= displayedPokemon + pokemonBoost; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let requisition = await fetch(url);
        let pokemon = await requisition.json();

        //Creating a Pokemon Card
        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon__card");
        pokemonCard.setAttribute("data-id", pokemon.name.toLowerCase());

        pokemonContainer.appendChild(pokemonCard);

        const pokemonImg = document.createElement("img");
        pokemonImg.classList.add("pokemon__img");
        pokemonImg.src = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name.toLowerCase()}.png`;

        pokemonCard.appendChild(pokemonImg);

        const pokemonName = document.createElement("h2");
        pokemonName.classList.add("pokemon__name");
        pokemonName.innerHTML = pokemon.name.toUpperCase();

        pokemonCard.appendChild(pokemonName);

        const pokemonTypeContainer = document.createElement("div");
        pokemonTypeContainer.classList.add("pokemon__type-container");

        pokemonCard.appendChild(pokemonTypeContainer);

        //Loop to fill the Pokemon's types in the card
        const typesArray = pokemon.types;

        for (indice = 0; indice < typesArray.length; indice++) {
            let type = typesArray[indice].type.name;

            const pokemonType = document.createElement("img");
            pokemonType.classList.add("pokemon__type");
            pokemonType.src = `/assets/${type.toLowerCase()}.svg`;

            pokemonTypeContainer.appendChild(pokemonType);
        }

        pokemonCard.addEventListener("click", openPokemonDetails);//Calling openPokemonDetails in a click 
    }

    displayedPokemon += pokemonBoost //Displaing the cards side by side
}

async function searchPokemon(event) {
    if (event.key === "Enter") {
        let searchPokemon = searchInput.value.toLowerCase();
        const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}/`

        try {
            let requisition = await fetch(urlPokemon);
            let pokemon = await requisition.json();

            // Cleaning the page before generate a new Pokemon card
            loadBtn.style.display = "none";
            pokemonContainer.innerHTML = "";
            searchResult.innerHTML = "";
            detailsContainer.innerHTML = "";

            // Creating a pokemon card
            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("pokemon__card");
            pokemonCard.setAttribute("data-id", pokemon.name.toLowerCase());

            searchResult.appendChild(pokemonCard);

            const pokemonImg = document.createElement("img");
            pokemonImg.classList.add("pokemon__img");
            pokemonImg.src = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name.toLowerCase()}.png`;

            pokemonCard.appendChild(pokemonImg);

            const pokemonName = document.createElement("h2");
            pokemonName.classList.add("pokemon__name");
            pokemonName.innerHTML = pokemon.name.toUpperCase();

            pokemonCard.appendChild(pokemonName);

            const pokemonTypeContainer = document.createElement("div");
            pokemonTypeContainer.classList.add('pokemon__type-container');

            pokemonCard.appendChild(pokemonTypeContainer);

            const typesArray = pokemon.types;

            // Loop to fill the Pokemon's types in the card
            for (indice = 0; indice < typesArray.length; indice++) {
                let type = typesArray[indice].type.name;

                const pokemonType = document.createElement("img");
                pokemonType.classList.add("pokemon__type");
                pokemonType.src = `/assets/${type.toLowerCase()}.svg`;

                pokemonTypeContainer.appendChild(pokemonType);
            }

            pokemonCard.addEventListener("click", openPokemonDetails);//Calling openPokemonDetails in a click 

            //Removing a possible previous error message
            removeErrorMessage();

        } catch (error) {
            const errorContainer = document.createElement("p");
            errorContainer.classList.add("search__error");
            searchContainer.appendChild(errorContainer);

            errorContainer.innerHTML = "Erro ao buscar o Pokémon: Digite um pokemon válido.";
        }
    }
}

function loadMorePokemon() {
    listPokemon()
}


window.addEventListener("DOMContentLoaded", listPokemon);

searchInput.addEventListener("keydown", searchPokemon);

loadBtn.addEventListener("click", loadMorePokemon);

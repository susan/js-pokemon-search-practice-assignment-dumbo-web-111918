document.addEventListener('DOMContentLoaded', () => {
  //console.log(POKEMON)
  //YOUR CODE HER
//Variables on top
  const pokeDivTag = document.querySelector("#pokemon-container")
  //console.log(pokeDivTag)
  let POKEMON = []
//fetch actions
  const getPokemon = () => {
    return fetch(`http://localhost:3000/pokemon`).then(r => r.json())
  }

  POKEMON = getPokemon().then(pokemon => POKEMON = pokemon)
  console.log(POKEMON)
  //event listeners
 //get formTag
 //submit search term
 //if searchTerm, filter each pokeman for containing searchTerm and return it, else return all
  const searchFormInputTag = document.querySelector("form input")
  console.log(searchFormInputTag)

  searchFormInputTag.addEventListener("input", (event) => {
  	//console.log(event.target.value)
  	//debugger
     const filteredPoke =
     	  getPokemon().then(pokemon => {
     	  	return pokemon.filter((poke) => {
  	          return (poke.name).includes(event.target.value.toLowerCase())
  	      })
        })
      console.log(filteredPoke)
   //   debugger
       pokeDivTag.innerHTML = ""
     	   filteredPoke.then (pokemon => {
     	 	   return pokemon.forEach((poke) => {
  	//console.log(pokeDivTag.innerHTML)
  	          return pokeDivTag.innerHTML += (createPokeCardHTML(poke))
  	       })
  	  })
  })




  pokeDivTag.addEventListener("click", (event)=> {
    if (event.target.className === "toggle-sprite") {
      console.log(event.target.dataset.id)
      console.log(POKEMON)
      //debugger
      const selectedPoke = POKEMON.find((poke) => {
      	 return poke.id === parseInt(event.target.dataset.id)
      })
      console.log(selectedPoke)
      event.target.src =
      (event.target.src === selectedPoke.sprites.front
      ?
      selectedPoke.sprites.back
      :
      selectedPoke.sprites.front
      )
  }
  })

//helper functions
   const createPokeCardHTML = pokemon => {
	  return `<div class="pokemon-card">
	  	<div class="pokemon-frame">
	    	<h1 class="center-text">${pokemon.name}</h1>
	    		<div class="pokemon-image">
	      		<img data-id=${pokemon.id} data-action="flip" class="toggle-sprite" src=${pokemon.sprites.front}>
	    		</div>
	  	</div>
		</div>`
  }

 const renderAllPokemon = () => {
  return getPokemon().then
  ( POKEMON => {
  	POKEMON.forEach((poke) => {
  	//console.log(pokeDivTag.innerHTML)
  	  return pokeDivTag.innerHTML += (createPokeCardHTML(poke))
    })
  }
  )
}

renderAllPokemon()





})//end of doc

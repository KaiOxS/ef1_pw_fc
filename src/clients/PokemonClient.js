import axios from "axios";

const consumirAPI = async () => {
	const ids = [
		1,
		5,
		10,
		15,
		20
	];
	const pokemonRandom = ids[Math.floor(Math.random() * 4)];
	for (var i = 0; ids.length; i++) {
		const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonRandom}`).then(r => r.data);
		return {nombre: respuesta.name.toUpperCase(), url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonRandom}.svg`};
	}

}
export async function consumirAPIFacade() {
	return await consumirAPI();

}

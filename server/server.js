const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const products = [{
  "name": "Samsung Galaxy",
  "category": "electronics"
}, {
  "name": "Motorola V3",
  "category": "electronics"
}, {
  "name": "Iphone 12",
  "category": "electronics"
}, {
  "name": "Skippy",
  "category": "grocery store"
}];

app.get('/search', async(req, res) => {
    const filter1 = req.query.filter;
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${filter1}`);
        const data = await response.json();
    
        // Aquí podrías manipular los datos de la API para generar los resultados según tus necesidades
        // Por ejemplo, podrías mapear la respuesta para obtener los nombres y categorías de los productos
    
        const foundProducts = [{ name: data.name, category: 'pokemon', experience: data.base_experience }];
        const suggestedProducts = []; // Puedes llenar esto con más datos de la API si es necesario
        for (let i = 1; i <= 3; i++) {
            const nextPokemonNumber = data.id + i;
            const nextPokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextPokemonNumber}`);
            const nextPokemonData = await nextPokemonResponse.json();
            suggestedProducts.push({ name: nextPokemonData.name, category: 'pokemon', experience: data.base_experience});
          }
    
        res.json({ foundProducts, suggestedProducts });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data from API' });
      }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

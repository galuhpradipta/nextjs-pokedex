import Layout from '../components/Layout'
import Link from 'next/Link'

export default function pokemon({pokemon}) {
    return(
        <Layout title={pokemon.name}>
            <div className="m-4">
                <h1 className="text-4xl mb-2 text-center capitalize">{pokemon.name}</h1>
                
                <div className="bg-gray-200 rounded-lg shadow-xl">
                    <img className="mx-auto" src={pokemon.image} alt={pokemon.name}></img>    
                </div>


                <div className="mt-1 p-2 bg-gray-200 rounded-lg shadow-xl">
                    <p><span className="font-bold mr-2">Weight: </span>{pokemon.weight}</p>
                    <p><span className="font-bold mr-2">Height: </span>{pokemon.height}</p>
                    
                    <h2 className="text-2xl mt-6 mb-2">Types</h2>
                    {pokemon.types.map((type, index) => (
                        <p key={index}>{type.type.name}</p>
                    ))}
                </div>

                
            </div>
            

            
            

            <p className="mt-10 text-center">
                <Link href="/">
                    <a className="text-2xl underline">Back to Home</a>
                </Link>
            </p>
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = await res.json()
        const paddedIndex = ("00" + (id)).slice(-3)
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        pokemon.image = image

        return {
            props: {pokemon}
        }



      } catch (err) {
        console.error(err)
      }
}
import Link from 'next/link'
import Layout from '../components/Layout'

export default function pokemon({pokemon}) {
    return(
        <Layout title={pokemon.name}>
            <div className="m-4">
                <div className="text-center mx-auto mb-2 pb-2 rounded-md bg-gray-200">

                   
                    <h1 className="text-4xl capitalize">{pokemon.name}</h1>
                </div>
                
                
                <div className="bg-gray-200 p-2 rounded-lg shadow-xl">
                    <img className="mx-auto" src={pokemon.image} alt={pokemon.name}></img>    
                </div>


                <div className="my-1 p-2 px-10 bg-gray-200 rounded-lg shadow-xl">
                    <table className="">
                        <tbody>
                            <tr>
                                <td><p><span className="font-semibold">Weight</span></p></td>
                                <td><p><span className="font-semibold">:</span></p></td>
                                <td><p><span className="font-semibold">{pokemon.weight}</span></p></td>
                            </tr>

                            <tr>
                                <td><p><span className="font-semibold">Height</span></p></td>
                                <td><p><span className="font-semibold">:</span></p></td>
                                <td><p><span className="font-semibold">{pokemon.height}</span></p></td>
                            </tr>
                        </tbody>
                    </table>
                
                    
                    <h2 className="text-2xl mt-3 mb-2">Types</h2>
                    <div className="flex gap-2">
                    {pokemon.types.map((type, index) => (
                        
                            <p className="px-2 bg-blue-200 rounded-lg" key={index}>#{type.type.name}</p>     
                        
                        
                    ))}
                    </div>
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
import Card from "../Card/card";
import './cards.css'

const Cards = ({dogs, handlePage, page})=>{
    return (
            <div className="cards">
            {   
                dogs.map((dog)=> {

                    return <Card 
                            key={dog.id}
                            id={dog.id}
                            name={dog.name}
                            height={dog.height}
                            weight={dog.weight}
                            temperament={dog.temperament}
                            image={dog.image}
                            />
                })
            }
                <div>
                    <button onClick={()=>handlePage(-1)}>Prev</button>
                        {page}
                    <button onClick={()=>handlePage(1)} >Next</button>
                </div>
            </div>
        )   
}

export default Cards
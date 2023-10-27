const Form = ({temperaments})=>{
    return (
    <div>
        <h2>Esto es form</h2>
        <form>
            <select id="temperaments" multiple >
                {temperaments.map((temp)=>{
                    return <option key={temp.id} value={temp.id}>{temp.name}</option>
                })}
            </select>
        </form>
        

    </div>
    )
}

export default Form
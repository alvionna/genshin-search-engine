// THIS IS FOR THE CHARACTERS PAGE ONLY SO... WE ARE 

export default function CharacterCard() { 
    return ( 
        <div className="character-item"> 
                <h3 className = "character-name"> {NAME} </h3>
                <img src = {IMG_SRC} className="character-img"></img>
                <table> 
                    <tbody>
                        <tr>
                            <td> {BUILD_TYPE}</td>
                            <td> {BUILD_STATS} </td>
                        </tr>
                    </tbody>
                </table>
        </div>
    )
}
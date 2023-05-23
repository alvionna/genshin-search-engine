export default function ResultCard() { 
    return ( 
        <div className="each-result-item"> 
            <img src = {props.pic} className="profile-pic"></img>
            {/* the profile pic of the data */}
            <h2 className = "result-name"> {props.name} </h2>
            <i className = "result-type"> {props.type} </i> 
            {/* props.type => what is the data info type: artifacts, characteres, etc */}
            <p className="result-rarity"> Rarity: <img src = {props.rarity} className="rarity-pic"></img> </p>
        </div>
    )
}
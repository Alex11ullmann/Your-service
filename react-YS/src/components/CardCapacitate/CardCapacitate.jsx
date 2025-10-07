import "../CardQuienesSomos/styleQuienesSomos.css"

export default function CardCapacitate ({ titulo, texto, texto2, imagen, alt, invertido }) {
    return (
        
            <div className="subCont">
                {invertido ? 
                    (
                        <div className="contTexto" style={{background: "linear-gradient(90deg, rgb(243, 221, 230) 0%, rgb(210, 225, 239) 47%, rgb(203, 239, 243) 100%)", borderRadius: "40px"}}>
                            <h4>
                                {titulo}
                            </h4>
                            <div className="contTextoImg">
                                <div>
                                    <p>
                                        {texto}
                                    </p>
                                    <p>
                                        {texto2}
                                    </p>
                                </div>
                                <div>
                                    <img className="images" src={imagen} alt={alt} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="contTexto" style={{background: "linear-gradient(70deg, rgba(223, 243, 245, 1) 0%, rgb(210, 225, 239) 17%, rgb(243, 221, 230) 80%)", borderRadius: "40px"}}>
                            <h4>
                                {titulo}
                            </h4>
                            <div className="contTextoImg">
                                <div>
                                    <img className="images" src={imagen} alt={alt} />
                                </div>
                                <div>
                                    <p>
                                        {texto}
                                    </p>
                                    <p>
                                        {texto2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
    )
}
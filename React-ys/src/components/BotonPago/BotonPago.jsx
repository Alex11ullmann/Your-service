import { useState, useEffect } from "react";

export default function BotonPago({ onPagoRealizado, origen }) {

    const [pago, setPago] = useState(false);

    // Cargar estado si el pago ya fue hecho antes
    useEffect(() => {
        localStorage.clear();
        const pagoLS = localStorage.getItem("pagoRegistro");
        const origenLS = localStorage.getItem("pagoOrigen");

        if (pagoLS === "ok" && origenLS === origen) {
            setPago(true);
            onPagoRealizado(true);
        }
    }, []);

    const handlePago = () => {
        localStorage.setItem("pagoRegistro", "ok");
        localStorage.setItem("pagoOrigen", origen);

        setPago(true);
        onPagoRealizado(true);
    };

    return (
        <a
            href="https://www.mercadopago.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pago"
            onClick={handlePago}
        >
            {pago ? "✔ Pago aprobado" : "🔒 Activar registro (Pago) US$ 1.00"}
        </a>
    );
}

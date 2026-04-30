import "./LoadingModal.css";

export default function LoadingModal({ isOpen, text = "Cargando..." }) {
    if (!isOpen) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-box">
                <img
                    src="/LogoSTSF.png"
                    alt="Logo"
                    className="loading-logo"
                />

                {/* Loader circular */}
                <div className="spinner"></div>

                <p>{text}</p>
            </div>
        </div>
    );
}
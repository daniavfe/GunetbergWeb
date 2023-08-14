import "./modal.scss";

interface ModalComponentProps {
    children : JSX.Element,
    clickedOut: Function
}

const ModalComponent: React.FC<ModalComponentProps> = ({children, clickedOut})=>{
    return (
        <div id="modal" className="modal-container">
            <div className="modal-opacity"></div>
            <div className="modal-content" onClick={()=>clickedOut()}>
                <div className="modal-window">
                    {children}
                </div>
            </div>
        </div>      
    );
};

export default ModalComponent;
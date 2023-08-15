import "./modal.scss";

interface ModalComponentProps {
    children : JSX.Element,
    isVisible: boolean,
    setIsVisible: Function,
    allowCloseOnOutClick: boolean
}

const ModalComponent: React.FC<ModalComponentProps> = ({children, isVisible, setIsVisible, allowCloseOnOutClick})=>{

    const outClick = ()=>{
        if(allowCloseOnOutClick){
            setIsVisible(false);
        }
    }

    return (
        <div>
            { isVisible?
                <div hidden={!isVisible} id="modal" className="modal-container">
                    <div className="modal-opacity"></div>
                    <div className="modal-content" onClick={outClick}>
                        <div className="modal-window" onClick={(e)=> e.stopPropagation()}>
                            {children}
                        </div>
                    </div>
                </div> : <div></div>
            }   
        </div>   
    );
};

export default ModalComponent;
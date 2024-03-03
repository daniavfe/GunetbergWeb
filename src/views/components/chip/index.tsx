import "./style.css";

export interface ChipProps {
    children: string
}

const Chip = ({children}: ChipProps)=>{
    return (
        <span className="chip">{children}</span>
    );
}

export default Chip;
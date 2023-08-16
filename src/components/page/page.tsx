import "./page.scss";


interface PageComponentProp {
    children: JSX.Element
}

const PageComponent: React.FC<PageComponentProp> = ({children})=>{
    return (
        <section id="page" className="page">
            {children}
        </section>
    )
};

export default PageComponent;
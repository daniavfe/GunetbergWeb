import "./header.scss";

const HeaderComponent: React.FC = () => {
	return (
		<section id="header" className="header-section">
			<div className='header-content'>
				<div className='header-image'>
					<img src="https://cdn.pixabay.com/photo/2019/01/09/14/13/leaves-3923413_1280.jpg"/>
				</div>
				<div className='header-menu'>
					<h3>daniavfe</h3>
					<button className='basic-button-transparent'>log out</button>
				</div>
			</div>
		</section>
	);
};

export default HeaderComponent;

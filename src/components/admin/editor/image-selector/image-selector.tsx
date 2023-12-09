import { useEffect, useState } from "react";
import "./image-selector.scss";

interface ImageSelectorProp {
  value: string
  onChange: (value: string) => void
}

const ImageSelectorComponent: React.FC<ImageSelectorProp> = ({ value, onChange }) => {
	const [tempValue, setTempValue] = useState<string>(value);
	const [isSelectorVisible, setIsSelectorVisible] = useState<boolean>(false);

	useEffect(() => {
		setTempValue(value);
	}, [value]);

	const acceptAction = () => {
		onChange(tempValue);
		setIsSelectorVisible(false);
	};

	const cancelAction = () => {
		setTempValue(value);
		setIsSelectorVisible(false);
	};

	return (
		<div id="image-selector" className="image-selector">
			<div className="image-selector-image">
				<img src={value}/>
			</div>
			<div hidden={!isSelectorVisible} className="image-selector-opacity"></div>
			<div className="image-selector-content">
				{ isSelectorVisible
					? <div className="image-selector-url">
						<input className="simple-input" type="text" value={tempValue} placeholder="URL" onChange={(e) => { setTempValue(e.target.value); }} />
						<div className="image-selector-url-actions">
							<button className="simple-button" onClick={acceptAction}>Acept</button>
							<button className="simple-button" onClick={cancelAction}>Cancel</button>
						</div>
					</div>
					: <button hidden={isSelectorVisible} className="simple-button" onClick={() => { setIsSelectorVisible(true); }}>Select</button>
				}
			</div>
		</div>
	);
};

export default ImageSelectorComponent;

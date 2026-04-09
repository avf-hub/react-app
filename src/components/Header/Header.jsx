import { useCallback, useState } from 'react';
import SelectUser from '../SelectUser/SelectUser';
import Button from '../Button/Button';
import viteLogo from '../../assets/vite.svg';
import Logo from '../Logo/Logo';

const logos = ['/logo.svg', viteLogo];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);

	const toggleLogo = useCallback(() => {
		setLogoIndex(state => Number(!state));
	}, []);

	return (
		<>
			<Logo image={logos[logoIndex]} />
			<SelectUser />
			<Button onClick={toggleLogo} >Сменить логотип</Button>
		</>
	);
};

export default Header;
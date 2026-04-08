import { useState } from 'react';
import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css';
import Button from '../Button/Button';
import viteLogo from '../../assets/vite.svg';

const logos = ['/logo.svg', viteLogo];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);

	const toggleLogo = () => {
		setLogoIndex(state => Number(!state));
	};

	return (
		<>
			<img className={styles.logo} src={logos[logoIndex]} alt="Логотип журнала" />
			<SelectUser />
			<Button onClick={toggleLogo} >Сменить логотип</Button>
		</>
	);
};

export default Header;
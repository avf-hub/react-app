import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';

function App() {
	const data = [
		{
			title: 'Подготовка к обновлению курсов',
			date: new Date(),
			text: 'Сегодня провёл весь день за...'
		},
		{
			title: 'Поход в годы',
			date: new Date(),
			text: 'Думал, что очень много време...'
		},
		{
			title: 'Первая заметка',
			date: new Date(),
			text: 'Создал первую заметку, чтобы ...'
		}
	];

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList>
					{data.map((el, index) => (
						<CardButton key={index}>
							<JournalItem title={el.title} date={el.date} text={el.text} />
						</CardButton>
					))}
				</JournalList>
			</LeftPanel>
			<Body>
				Body
			</Body>
		</div>
	);
}

export default App;

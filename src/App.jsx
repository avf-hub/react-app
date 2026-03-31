import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

const INITIAL_DATA = [
	{
		id: 1,
		title: 'Подготовка к обновлению курсов',
		date: new Date(),
		text: 'Сегодня провёл весь день за книгами'
	},
	{
		id: 2,
		title: 'Поход в годы',
		date: new Date(),
		text: 'Думал, что очень много времени'
	}
];

const sortItems = (a, b) => a.date < b.date ? 1 : -1;

function App() {
	const [items, setItems] = useState(INITIAL_DATA);

	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			title: item.title,
			text: item.text,
			date: new Date(item.date),
			id: Math.max(...oldItems.map(it => it.id)) + 1
		}]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList>
					{items.sort(sortItems).map(el => (
						<CardButton key={el.id}>
							<JournalItem title={el.title} date={el.date} text={el.text} />
						</CardButton>
					))}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;

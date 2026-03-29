import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';

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
		<div>
			<h1>Заголовок 1</h1>
			<p>Какой-то текст</p>
			<Button />
			<CardButton>Новое воспоминание</CardButton>
			{data.map((el, index) => (
				<CardButton key={index}>
					<JournalItem title={el.title} date={el.date} text={el.text} />
				</CardButton>
			))}
		</div>
	);
}

export default App;

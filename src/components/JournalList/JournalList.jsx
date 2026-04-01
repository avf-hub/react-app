import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';

function JournalList({ items }) {
	if (items.length === 0) {
		return <p>Записей пока нет, добавте первую</p>;
	}
	const sortItems = (a, b) => a.date < b.date ? 1 : -1;
	return <>
		{items.sort(sortItems).map(el => (
			<CardButton key={el.id}>
				<JournalItem title={el.title} date={el.date} text={el.text} />
			</CardButton>
		))}
	</>;
}

export default JournalList;
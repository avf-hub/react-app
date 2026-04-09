import { useContext, useMemo } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';

function JournalList({ items, setItem }) {
	const {userId} = useContext(UserContext);

	const sortItems = (a, b) => a.date < b.date ? 1 : -1;
	const filtredItems = useMemo(() => items
		.filter(el => el.userId === userId)
		.sort(sortItems), [items, userId]);

	if (filtredItems.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	return <>
		{filtredItems
			.map(el => (
				<CardButton key={el.id} onClick={() => setItem(el)} >
					<JournalItem title={el.title} date={el.date} text={el.text} />
				</CardButton>
			))}
	</>;
}

export default JournalList;
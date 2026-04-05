import { useEffect, useReducer } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
	const [formSate, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formSate;

	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.date || !isValid.text) {
			timerId = setTimeout(() => dispatchForm({ type: 'RESET_VALIDITY' }), 2000);
		}
		return () => {
			if (timerId) clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	const addJournalItem = (event) => {
		event.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	const onChange = (event) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [event.target.name]: event.target.value } });
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input type="text" name="title" onChange={onChange} value={values.title} className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.title
				})} />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="Иконка календаря" />
					<span>Дата</span>
				</label>
				<input type="date" id="date" name="date" onChange={onChange} value={values.date} className={cn(styles['input'], {
					[styles['invalid']]: !isValid.date
				})} />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="Иконка папки" />
					<span>Метки</span>
				</label>
				<input type="text" name="tag" id="tag" onChange={onChange} value={values.tag} className={styles['input']} />
			</div>

			<textarea name="text" id="" cols="30" rows="10" onChange={onChange} value={values.text} className={cn(styles['input'], {
				[styles['invalid']]: !isValid.text
			})} ></textarea>
			<Button text="Сохранить" />
		</form>
	);
}

export default JournalForm;
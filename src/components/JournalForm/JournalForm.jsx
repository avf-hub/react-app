import { useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit }) {
	const [formSate, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formSate;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.date || !isValid.text) {
			focusError(isValid);
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
		<UserContext.Consumer>
			{(conext) => 
				<form className={styles['journal-form']} onSubmit={addJournalItem}>
					{conext.userId}
					<div>
						<Input type="text" name="title" ref={titleRef} isValid={isValid.title} onChange={onChange} value={values.title} appearence="title" />
					</div>
					<div className={styles['form-row']}>
						<label htmlFor="date" className={styles['form-label']}>
							<img src="/calendar.svg" alt="Иконка календаря" />
							<span>Дата</span>
						</label>
						<Input type="date" id="date" name="date" isValid={isValid.date} ref={dateRef} onChange={onChange} value={values.date} />
					</div>
					<div className={styles['form-row']}>
						<label htmlFor="tag" className={styles['form-label']}>
							<img src="/folder.svg" alt="Иконка папки" />
							<span>Метки</span>
						</label>
						<Input type="text" name="tag" id="tag" onChange={onChange} value={values.tag} />
					</div>

					<textarea name="text" id="" cols="30" rows="10" ref={textRef} onChange={onChange} value={values.text} className={cn(styles['input'], {
						[styles['invalid']]: !isValid.text
					})} ></textarea>
					<Button text="Сохранить" />
				</form>}
		</UserContext.Consumer>
	);
}

export default JournalForm;
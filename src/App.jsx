import React, { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueValid = value.length >= 3;

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение:');
		if (promptValue !== null) {
			if (promptValue.length < 3) {
				setError('Введенное значение должно содержать минимум 3 символа');
				setValue('');
			} else {
				setValue(promptValue);
				setError('');
			}
		}
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			const newItem = {
				id: Date.now(),
				value,
				createdAt: new Date().toLocaleString('ru-RU', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				}),
			};
			setList((prevList) => [...prevList, newItem]);
			setValue('');
			setError('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>

			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>

			{error && <div className={styles.error}>{error}</div>}

			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>

			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length === 0 ? (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				) : (
					<ul className={styles.list}>
						{list.map((item) => (
							<li key={item.id} className={styles['list-item']}>
								{item.value} — <small>{item.createdAt}</small>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

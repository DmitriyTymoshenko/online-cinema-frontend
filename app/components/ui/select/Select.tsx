import { FC } from 'react';
import ReactSelect, { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';

import formStyles from '@/ui/form-elements/Form.module.scss';
import { ISelect, ISelectOptions } from '@/ui/select/select.interface';

import styles from './Select.module.scss';

const animatedComponents = makeAnimated();

const Select: FC<ISelect> = ({
	isLoading,
	field,
	isMulti,
	options,
	placeholder,
	error,
}) => {
	const onChange = (
		newValue: unknown | OnChangeValue<ISelectOptions, boolean>
	) => {
		field.onChange(
			isMulti
				? (newValue as ISelectOptions[]).map((item) => item.value)
				: (newValue as ISelectOptions).value
		);
	};
	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.includes(option.value))
				: options.find((option) => option.value === field.value);
		} else {
			return isMulti ? [] : '';
		}
	};
	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix="custom-select"
					options={options}
					value={getValue()}
					isMulti={isMulti}
					onChange={onChange}
					components={animatedComponents}
					isLoading={isLoading}
				/>
			</label>
			{error && <div className={formStyles.error}>{error.message}</div>}
		</div>
	);
};

export default Select;

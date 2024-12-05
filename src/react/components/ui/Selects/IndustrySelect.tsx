import Select, { type Props as ReactSelectProps, type SingleValue } from 'react-select';
import { Icon } from '@iconify/react';
import type { Country } from '../../../types/country';
import type { Industry } from '../../../types/industry';

type IndustryOption = {
  value: string;
  label: string;
};

type Props = {
  industries: Industry[];
  onChange: (selectedOption: SingleValue<IndustryOption>) => void;
} & ReactSelectProps;

function IndustrySelector({ industries, onChange, ...rest }: Props) {
  // Opciones con banderas
  const options = industries.map((industry) => ({
    value: industry.name,
    label: (
      <div className="flex items-center">
        <span>{industry.name}</span>
      </div>
    ),
  }));
 
  return (
    <Select
      options={options}
      defaultValue={options[0]}
      onChange={onChange}
      {...rest}
    />
  );
}

export default IndustrySelector;

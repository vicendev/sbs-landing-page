import Select, { type Props as ReactSelectProps, type SingleValue } from 'react-select';
import { Icon } from '@iconify/react';
import type { Country } from '../../../types/country';

type CountryOption = {
  value: string;
  label: string;
};

type Props = {
  countries: Country[];
  onChange: (selectedOption: SingleValue<CountryOption>) => void;
} & ReactSelectProps;

function CountrySelector({ countries, onChange, ...rest }: Props) {
  // Opciones con banderas
  const options = countries.map((country) => ({
    value: country.dialing_code,
    label: (
      <div className="flex items-center">
        <Icon icon={`emojione:${country.flag}`} width="20" height="20" className="mr-2" />
        <span>{country.dialing_code}</span>
      </div>
    ),
  }));
 
  return (
    <Select
      options={options}
      defaultValue={options.filter((opt) => opt.value == "+56")}
      onChange={onChange}
      {...rest}
    />
  );
}

export default CountrySelector;

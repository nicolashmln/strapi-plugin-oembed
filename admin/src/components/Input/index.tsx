import { Field } from '@strapi/design-system';

import { type Oembed } from '@/shared/types/oembed';

import InputEmptyButton from '../InputEmptyButton';
import InputOembedCard from '../InputOembedCard';

export type InputCallback = (entry: Oembed | null) => void;

export type InputProps = {
  name: string;
  error: any;
  label: any;
  onChange: (event: {
    target: {
      name: string;
      value: Oembed | null;
    };
  }) => void;
  value: Oembed | null;
};

export default function Input({ error = undefined, name, label, onChange, value }: InputProps) {
  const hasValue = !!value?.url && !!value?.oembed;

  const handleImport: InputCallback = (data: Oembed | null) => {
    onChange({
      target: {
        name,
        value: data,
      },
    });
  };

  return (
    <Field.Root name="oembed" error={error}>
      <Field.Label>{label}</Field.Label>

      {!hasValue && <InputEmptyButton onImport={handleImport} />}
      {hasValue && <InputOembedCard entry={value} onImport={handleImport} />}

      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
}

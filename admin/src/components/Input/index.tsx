import { Field } from '@strapi/design-system';
import { InputProps as _InputProps, FieldValue } from '@strapi/strapi/admin';

import { type StrapiPluginOembed } from '../../../../types/strapi-plugin-oembed';
import OembedCard from '../OembedCard';
import OembedButton from '../OembedButton';

export type InputProps = FieldValue<StrapiPluginOembed> & _InputProps;
export type InputCallback = (entry: StrapiPluginOembed | null) => void;

export default function Input({ error = undefined, name, label, onChange, value }: InputProps) {
  const hasValue = !!value?.url && !!value?.oembed;

  const onImport: InputCallback = (data: StrapiPluginOembed | null) => {
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

      {!hasValue && <OembedButton onImport={onImport} />}
      {hasValue && <OembedCard entry={value} onImport={onImport} />}

      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
}

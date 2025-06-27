import { Button, Field, Modal } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import { FormEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Oembed } from '@/shared/types/oembed';

import pkgJson from '../../../../package.json';
import { getTranslation } from '../../utils/getTranslation';
import { InputCallback } from '../Input';

export type ImportModalProps = {
  onImport: InputCallback;
  entry: Oembed | null;
  children: ReactNode;
};

export default function ImportModal({ onImport, entry, children }: ImportModalProps) {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const [url, setUrl] = useState('');

  const { get } = useFetchClient();

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      (async () => {
        setIsLoading(true);

        try {
          setInputError('');

          const { data } = await get(
            `/${pkgJson.strapi.name}/fetch?url=${encodeURIComponent(url)}`
          );

          if (data.error) {
            setInputError(data.error);
          } else {
            onImport(data);
            setOpen(false);
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'An error occurred';
          setInputError(message);
        } finally {
          setIsLoading(false);
        }
      })();
    },
    [url, get, onImport]
  );

  useEffect(() => {
    setUrl(entry?.url ?? '');
  }, [entry?.url]);

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <FormattedMessage id={getTranslation('modal.import.title')} />
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Field.Root
              name="name"
              error={inputError}
              required
              hint={<FormattedMessage id={getTranslation('modal.import.input.description')} />}
            >
              <Field.Label>
                <FormattedMessage id={getTranslation('modal.import.input.label')} />
              </Field.Label>

              <Field.Input
                type="text"
                value={url}
                onChange={({ target: { value } }) => {
                  setUrl(value);
                }}
              />
              <Field.Hint />
              <Field.Error />
            </Field.Root>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close>
              <Button variant="tertiary">
                <FormattedMessage id="app.components.Button.cancel" />
              </Button>
            </Modal.Close>

            <Button type="submit" variant="default" loading={isLoading}>
              <FormattedMessage id={getTranslation('modal.import.button.import')} />
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}

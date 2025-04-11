import { FormEventHandler, ReactNode, useEffect, useState } from 'react';
import { Button, Field, Modal } from '@strapi/design-system';
import { FormattedMessage } from 'react-intl';
import { getTranslation } from '../../utils/getTranslation';
import { useAuth } from '@strapi/strapi/admin';
import { StrapiPluginOembed } from '../../../../types/strapi-plugin-oembed';
import { InputCallback } from '../Input';

export type ImportModalProps = {
  onImport: InputCallback;
  entry: StrapiPluginOembed | null;
  children: ReactNode;
};

export default function ImportModal({ onImport, entry, children }: ImportModalProps) {
  const token = useAuth('', (value) => value.token);
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const [url, setUrl] = useState('');
  const abortController = new AbortController();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    (async () => {
      setIsLoading(true);
      const { signal } = abortController;

      try {
        setInputError('');

        const response = await fetch(`/oembed/fetch?url=${encodeURIComponent(url)}`, {
          method: 'GET',
          signal,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        setIsLoading(false);

        if (data.error) {
          setInputError(data.error);
        } else {
          onImport(data);
          setOpen(false);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An error occurred';
        setInputError(message);
        setIsLoading(false);
      }
    })();
  };

  useEffect(() => {
    setUrl(entry?.url ?? '');

    return () => {
      // Abort the endpoint call if we close the modal
      abortController.abort();
    };
  }, []);

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

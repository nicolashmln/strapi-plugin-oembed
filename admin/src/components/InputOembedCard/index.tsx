import {
  Card,
  CardAction,
  CardAsset,
  CardBadge,
  CardBody,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTimer,
  CardTitle,
  IconButton,
} from '@strapi/design-system';
import { ExternalLink, Pencil, Trash } from '@strapi/icons';
import { useIntl } from 'react-intl';

import { type Oembed } from '@/shared/types/oembed';

import { getTranslation } from '../../utils/getTranslation';
import ImportModal from '../ImportModal';
import { type InputCallback } from '../Input';

export type InputOembedCardProps = {
  entry: Oembed;
  onImport: InputCallback;
};

export default function InputOembedCard({ entry, onImport }: InputOembedCardProps) {
  const { formatMessage } = useIntl();
  const { oembed, thumbnail, url } = entry;

  const onOpen = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const onClear = () => onImport(null);

  return (
    <Card>
      <CardHeader>
        {/* <CardCheckbox /> */}

        <CardAction position="end">
          <IconButton
            label={formatMessage({ id: getTranslation('form.button.open') })}
            onClick={onOpen}
          >
            <ExternalLink />
          </IconButton>

          <ImportModal entry={entry} onImport={onImport}>
            <IconButton label={formatMessage({ id: getTranslation('form.button.edit') })}>
              <Pencil />
            </IconButton>
          </ImportModal>

          <IconButton
            label={formatMessage({ id: getTranslation('form.button.delete') })}
            onClick={onClear}
            variant="danger"
          >
            <Trash />
          </IconButton>
        </CardAction>

        <CardAsset src={thumbnail ?? undefined} />
        {oembed.author_name && <CardTimer>{oembed.author_name}</CardTimer>}
      </CardHeader>

      <CardBody>
        <CardContent>
          <CardTitle>{oembed.title ?? url}</CardTitle>
          <CardSubtitle>{oembed.provider_name}</CardSubtitle>
        </CardContent>
        <CardBadge>{oembed.type}</CardBadge>
      </CardBody>
    </Card>
  );
}

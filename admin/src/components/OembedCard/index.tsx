import {
  Card,
  CardHeader,
  CardBody,
  CardAction,
  CardAsset,
  CardContent,
  CardBadge,
  CardTitle,
  CardTimer,
  CardSubtitle,
  IconButton,
} from '@strapi/design-system';
import { Pencil, Trash } from '@strapi/icons';

import ImportModal from '../ImportModal';

import { type StrapiPluginOembed } from '../../../../types/strapi-plugin-oembed';
import { type InputCallback } from '../Input';

export type OembedCardProps = {
  entry: StrapiPluginOembed;
  onImport: InputCallback;
};

export default function OembedCard({ entry, onImport }: OembedCardProps) {
  const { oembed, url } = entry;

  const onClear = () => onImport(null);

  return (
    <Card>
      <CardHeader>
        {/* <CardCheckbox /> */}
        <CardAction position="end">
          <ImportModal entry={entry} onImport={onImport}>
            <IconButton>
              <Pencil />
            </IconButton>
          </ImportModal>

          <IconButton variant="danger" onClick={onClear}>
            <Trash />
          </IconButton>
        </CardAction>

        <CardAsset
          src={oembed.thumbnail_url}
          width={oembed.thumbnail_width}
          height={oembed.thumbnail_height}
        />
        <CardTimer>{oembed.author_name}</CardTimer>
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

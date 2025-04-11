import { FormattedMessage } from 'react-intl';
import { CarouselInput, CarouselSlide, Flex, Typography } from '@strapi/design-system';
import { PlusCircle } from '@strapi/icons';
import ImportModal from '../ImportModal';
import { InputCallback } from '../Input';
import { getTranslation } from '../../utils/getTranslation';

export type OembedButtonProps = {
  onImport: InputCallback;
};

export default function OembedButton({ onImport }: OembedButtonProps) {
  return (
    <CarouselInput>
      <ImportModal entry={null} onImport={onImport}>
        <CarouselSlide style={{ cursor: 'pointer' }}>
          <Flex direction="column" gap="12px" alignItems="center">
            <PlusCircle aria-hidden width="3.2em" height="3.2em" fill="primary600" />
            <Typography variant="pi" fontWeight="bold" textColor="neutral600">
              <FormattedMessage id={getTranslation('form.button.import')} />
            </Typography>
          </Flex>
        </CarouselSlide>
      </ImportModal>
    </CarouselInput>
  );
}

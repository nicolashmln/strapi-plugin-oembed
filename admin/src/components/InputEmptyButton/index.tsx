import { CarouselInput, CarouselSlide, Flex, Typography } from '@strapi/design-system';
import { PlusCircle } from '@strapi/icons';
import { FormattedMessage } from 'react-intl';

import { getTranslation } from '../../utils/getTranslation';
import ImportModal from '../ImportModal';
import { InputCallback } from '../Input';

export type InputEmptyButtonProps = {
  onImport: InputCallback;
};

export default function InputEmptyButton({ onImport }: InputEmptyButtonProps) {
  return (
    <CarouselInput label="" nextLabel="" previousLabel="" selectedSlide={0}>
      <CarouselSlide label="" style={{ cursor: 'pointer' }}>
        <ImportModal entry={null} onImport={onImport}>
          <Flex direction="column" gap="12px" alignItems="center">
            <PlusCircle aria-hidden width="3.2em" height="3.2em" fill="primary600" />
            <Typography variant="pi" fontWeight="bold" textColor="neutral600">
              <FormattedMessage id={getTranslation('form.button.import')} />
            </Typography>
          </Flex>
        </ImportModal>
      </CarouselSlide>
    </CarouselInput>
  );
}
